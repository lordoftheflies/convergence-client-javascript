/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in the files
 * 'LICENSE' and 'COPYING.LESSER', which are part of this source code package.
 */

import {OperationTransformationFunction} from "../OperationTransformationFunction";
import {ObjectAddPropertyOperation} from "../../ops/ObjectAddPropertyOperation";
import {ObjectSetOperation} from "../../ops/ObjectSetOperation";
import {OperationPair} from "../OperationPair";

/**
 * @hidden
 * @internal
 */
export const ObjectAddPropertySetOTF: OperationTransformationFunction<ObjectAddPropertyOperation, ObjectSetOperation> =
  (s: ObjectAddPropertyOperation, c: ObjectSetOperation) => {
    // O-AS-1
    return new OperationPair(s.copy({noOp: true}), c);
  };
