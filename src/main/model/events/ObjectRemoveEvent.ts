/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in the files
 * 'LICENSE' and 'COPYING.LESSER', which are part of this source code package.
 */

import {IValueChangedEvent} from "../index";
import {ObservableObject} from "../observable/ObservableObject";
import {ObservableElement} from "../observable/ObservableElement";
import {DomainUser} from "../../identity";

/**
 * Emitted when a key-value pair is removed from a [[RealTimeObject]].
 *
 * @category Real Time Data Subsystem
 */
export class ObjectRemoveEvent implements IValueChangedEvent {
  public static readonly NAME = "remove";

  /**
   * @inheritdoc
   */
  public readonly name: string = ObjectRemoveEvent.NAME;

  /**
   * @param element
   * @param key
   * @param oldValue
   * @param sessionId
   * @param user
   * @param local
   *
   * @hidden
   * @internal
   */
  constructor(
    /**
     * A read-only representation of the [[RealTimeObject]] which was modified
     */
    public readonly element: ObservableObject,

    /**
     * @inheritdoc
     */
    public readonly user: DomainUser,

    /**
     * @inheritdoc
     */
    public readonly sessionId: string,

    /**
     * True if the change occurred locally (within the current session)
     */
    public readonly local: boolean,

    /**
     * The key of the key-value pair that was removed
     */
    public readonly key: string,

    /**
     * A read-only representation of the value of the key-value-pair that was removed
     */
    public readonly oldValue: ObservableElement<any>
  ) {
    Object.freeze(this);
  }
}
