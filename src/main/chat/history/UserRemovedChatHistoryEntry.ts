/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in the files
 * 'LICENSE' and 'COPYING.LESSER', which are part of this source code package.
 */

import { ChatHistoryEntry } from "./ChatHistoryEntry";
import { DomainUser } from "../../identity";
import { Immutable } from "../../util/Immutable";

/**
 * Represents a user being removed from this chat.  Analogous to a [[UserRemovedEvent]].
 *
 * @category Chat Subsytem
 */
export class UserRemovedChatHistoryEntry extends ChatHistoryEntry {
  public static readonly TYPE = ChatHistoryEntry.TYPES.USER_REMOVED;

  /**
   * @hidden
   * @internal
   */
  constructor(
    chatId: string,
    eventNumber: number,
    timestamp: Date,
    user: DomainUser,

    /**
     * The user that was removed.
     */
    public readonly removedUser: DomainUser
  ) {
    super(UserRemovedChatHistoryEntry.TYPE, chatId, eventNumber, timestamp, user);
    Immutable.make(this);
  }
}
