import { ChatHistoryEntry } from "./ChatHistoryEntry";
import { Immutable } from "../../util/Immutable";
import { DomainUser } from "../../identity";

/**
 * Represents a chat's topic being changed.  Analogous to a [[ChatTopicChangedEvent]].
 *
 * @category Chat Subsytem
 */
export class TopicChangedChatHistoryEntry extends ChatHistoryEntry {
  public static readonly TYPE = ChatHistoryEntry.TYPES.TOPIC_CHANGED;

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
     * The new topic for the chat.
     */
    public readonly topic: string
  ) {
    super(TopicChangedChatHistoryEntry.TYPE, chatId, eventNumber, timestamp, user);
    Immutable.make(this);
  }
}