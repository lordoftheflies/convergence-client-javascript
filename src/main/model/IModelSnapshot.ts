/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in the files
 * 'LICENSE' and 'COPYING.LESSER', which are part of this source code package.
 */

import {ClientOperationEvent} from "./ot/ClientOperationEvent";
import {IModelData} from "../storage/api";

/**
 * @hidden
 * @internal
 */
export interface IModelSnapshot {
  model: IModelData;
  localOps: ClientOperationEvent[];
}
