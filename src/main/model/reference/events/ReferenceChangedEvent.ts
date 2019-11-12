/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import {IConvergenceEvent} from "../../../util";
import {ModelReference} from "../ModelReference";

/**
 * Emitted when a [[ModelReference]]'s value is set.
 *
 * @category Collaboration Awareness
 */
export class ReferenceChangedEvent<T> implements IConvergenceEvent {
  public static readonly NAME = "set";

  /**
   * @inheritdoc
   */
  public readonly name: string = ReferenceChangedEvent.NAME;

  /**
   * The first (if there were multiple) previous value of the reference.
   */
  public readonly oldValue: T;

  constructor(
    /**
     * The underlying reference that changed.
     */
    public readonly src: ModelReference<any>,

    /**
     * The previous values of the reference.
     */
    public readonly oldValues: T[],

    /**
     * All newly-added values. That is, values that were not in the set of old values.
     */
    public readonly addedValues: T[],

    /**
     * All just-removed values.  That is, old values not in the set of new values.
     */
    public readonly removedValues: T[],

    /**
     * true if this event was emitted by the system, as opposed to an explicit e.g.
     * [[LocalModelReference.set]].
     */
    public readonly synthetic: boolean
  ) {
    if (oldValues.length > 0) {
      this.oldValue = oldValues[0];
    }

    Object.freeze(this);
  }
}
