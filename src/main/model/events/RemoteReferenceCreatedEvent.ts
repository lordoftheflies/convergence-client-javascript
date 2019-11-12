/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import {IConvergenceEvent} from "../../util";
import {ModelReference} from "../reference";
import {RealTimeElement, RealTimeModel} from "../rt";

/**
 * The [[RemoteReferenceCreatedEvent]] is fired by an [[ObservableModel]] when
 * a remote reference is created.
 *
 * @category Collaboration Awareness
 */
export class RemoteReferenceCreatedEvent implements IConvergenceEvent {
  public static readonly NAME = "reference";

  /**
   * @inheritdoc
   */
  public readonly name: string = RemoteReferenceCreatedEvent.NAME;

  /**
   * @param reference
   * @param element
   * @param model
   *
   * @hidden
   * @internal
   */
  constructor(
    /**
     * The reference that was just created
     */
    public readonly reference: ModelReference<any>,

    /**
     * The model on which the reference was created
     */
    public readonly model: RealTimeModel,

    /**
     * The element to which this reference is bound to, or `undefined` if it is not yet bound
     */
    public readonly element?: RealTimeElement<any>
  ) {
    Object.freeze(this);
  }
}
