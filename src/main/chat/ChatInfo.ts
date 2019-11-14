/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in the files
 * 'LICENSE' and 'COPYING.LESSER', which are part of this source code package.
 */

import {IdentityCache} from "../identity/IdentityCache";
import {ChatMembership} from "./MembershipChat";
import {getOrDefaultNumber, protoToDomainUserId, timestampToDate} from "../connection/ProtocolUtil";
import {ConvergenceSession} from "../ConvergenceSession";
import {DomainUser} from "../identity";

import {com} from "@convergence/convergence-proto";
import IChatInfoData = com.convergencelabs.convergence.proto.chat.IChatInfoData;

/**
 * The relevant metadata for a [[Chat]].
 *
 * @module Chat
 */
export interface ChatInfo {

  /**
   * The type of chat: [[ChatRoom]], [[ChatChannel]] or [[DirectChat]].
   */
  readonly chatType: ChatType;

  /**
   * The unique ID for this chat.
   */
  readonly chatId: string;

  /**
   * Whether this chat is public or private.  In a private chat, members must be
   * explicitly added by another member with the appropriate permissions
   * (see [[ChatPermission]]).
   */
  readonly membership: ChatMembership;

  /**
   * An optional name for this chat.
   */
  readonly name: string;

  /**
   * An optional topic for this chat.
   */
  readonly topic: string;

  /**
   * The timestamp when this chat was created.
   */
  readonly createdTime: Date;

  /**
   * The timestamp of the most recent event for this chat.
   */
  readonly lastEventTime: Date;

  /**
   * The sequential number of the most recent event for this chat.
   */
  readonly lastEventNumber: number;

  /**
   * The number of the most recent event which *any* member has received.
   */
  readonly maxSeenEventNumber: number;

  /**
   * An array of the current members of this chat.
   */
  readonly members: ChatMember[];
}

/**
 * A member, or participant, of a Chat.  Has slightly different semantics depending on the
 * type of [[Chat]].
 *
 * @module Chat
 */
export interface ChatMember {
  /**
   * The chat member's underlying user.
   */
  readonly user: DomainUser;

  /**
   * The number of the most recent event which this member has received.  This is useful
   * for e.g. querying ([[Chat.getHistory]]) for events that a member hasn't yet seen.
   */
  readonly maxSeenEventNumber: number;
}

/**
 * Use these rather than hardcoded strings to refer to a particular type of Chat.
 *
 * @module Chat
 */
export enum ChatTypes {
  DIRECT = "direct",
  CHANNEL = "channel",
  ROOM = "room"
}

/**
 * The valid strings for a [[ChatInfo.chatType]].
 *
 * @module Chat
 */
export type ChatType = ChatTypes.DIRECT | ChatTypes.CHANNEL | ChatTypes.ROOM;

/**
 * @hidden
 * @internal
 */
export function createChatInfo(session: ConvergenceSession,
                               identityCache: IdentityCache,
                               chatData: IChatInfoData): ChatInfo {
  let maxEvent = -1;
  const localUserId = session.user().userId;
  const members = chatData.members.map(member => {
    const userId = protoToDomainUserId(member.user);
    if (userId.equals(localUserId)) {
      maxEvent = getOrDefaultNumber(member.maxSeenEventNumber);
    }

    const user = identityCache.getUser(userId);

    return {user, maxSeenEventNumber: getOrDefaultNumber(member.maxSeenEventNumber)};
  });
  return {
    chatId: chatData.id,
    chatType: chatData.chatType as ChatType,
    membership: chatData.membership as ChatMembership,
    name: chatData.name,
    topic: chatData.topic,
    createdTime: timestampToDate(chatData.createdTime),
    lastEventTime: timestampToDate(chatData.lastEventTime),
    lastEventNumber: getOrDefaultNumber(chatData.lastEventNumber),
    maxSeenEventNumber: maxEvent,
    members
  };
}