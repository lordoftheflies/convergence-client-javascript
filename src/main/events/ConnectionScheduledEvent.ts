/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in the files
 * 'LICENSE' and 'COPYING.LESSER', which are part of this source code package.
 */

import {IConvergenceDomainEvent} from "./IConvergenceDomainEvent";
import {ConvergenceDomain} from "../ConvergenceDomain";

/**
 * Emitted when a [[ConvergenceDomain]] is scheduled to attempt to reconnect
 * to the server.
 *
 * @module Connection and Authentication
 */
export class ConnectionScheduledEvent implements IConvergenceDomainEvent {
  public static readonly NAME = "connection_scheduled";

  /**
   * @inheritdoc
   */
  public readonly name: string = ConnectionScheduledEvent.NAME;

  /**
   * @hidden
   * @internal
   */
  constructor(
    /**
     * @inheritdoc
     */
    public readonly domain: ConvergenceDomain,

    /**
     * The number of seconds until the reconnection is attempted.
     */
    public readonly delay: number
  ) {
    Object.freeze(this);
  }
}