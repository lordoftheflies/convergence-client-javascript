/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import {OperationPair} from "../OperationPair";
import {OperationTransformationFunction} from "../OperationTransformationFunction";
import {StringSetOperation} from "../../ops/StringSetOperation";
import {StringInsertOperation} from "../../ops/StringInsertOperation";

/**
 * @hidden
 * @internal
 */
export const StringSetInsertOTF: OperationTransformationFunction<StringSetOperation, StringInsertOperation> =
  (s: StringSetOperation, c: StringInsertOperation) => {
    // S-SI-1
    return new OperationPair(s, c.copy({noOp: true}));
  };
