/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import { ChatHistoryEntry } from "./ChatHistoryEntry";
import { DomainUser } from "../../identity";
import { Immutable } from "../../util/Immutable";

/**
 * Represents a user leaving this chat.  Analogous to a [[UserLeftEvent]].
 *
 * @category Chat Subsytem
 */
export class UserLeftChatHistoryEntry extends ChatHistoryEntry {
  public static readonly TYPE = ChatHistoryEntry.TYPES.USER_LEFT;

  /**
   * @hidden
   * @internal
   */
  constructor(chatId: string,
              eventNumber: number,
              timestamp: Date,
              user: DomainUser) {
    super(UserLeftChatHistoryEntry.TYPE, chatId, eventNumber, timestamp, user);
    Immutable.make(this);
  }
}
