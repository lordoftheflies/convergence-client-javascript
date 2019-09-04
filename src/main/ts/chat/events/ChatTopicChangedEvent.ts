import {ChatEvent} from "./ChatEvent";
import {DomainUser} from "../../identity";

/**
 * Emitted when a [[Chat]]'s topic changes.
 */
export class ChatTopicChangedEvent extends ChatEvent {
  public static readonly NAME = "topic_changed";

  /**
   * The name of this event type.  This can be e.g. used to filter when using the
   * [[ConvergenceEventEmitter.events]] stream.
   */
  public readonly name: string = ChatTopicChangedEvent.NAME;

  /**
   * @hidden
   * @internal
   */
  constructor(
    /**
     * The ID of the [[Chat]] on which this event occurred
     */
    public readonly chatId: string,

    /**
     * This event's unique sequential number.  This can be useful when e.g. querying for
     * events on a particular chat ([[Chat.getHistory]]).
     */
    public readonly eventNumber: number,

    /**
     * The timestamp when the event occurred
     */
    public readonly timestamp: Date,

    /**
     * The user that initiated the event
     */
    public readonly user: DomainUser,

    /**
     * The Chat's new topic
     */
    public readonly topic: string
  ) {
    super(chatId, eventNumber, timestamp, user);
    Object.freeze(this);
  }
}