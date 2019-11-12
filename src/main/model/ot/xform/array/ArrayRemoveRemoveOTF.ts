/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import {OperationTransformationFunction} from "../OperationTransformationFunction";
import {OperationPair} from "../OperationPair";
import {ArrayRemoveOperation} from "../../ops/ArrayRemoveOperation";

/**
 * @hidden
 * @internal
 */
export const ArrayRemoveRemoveOTF: OperationTransformationFunction<ArrayRemoveOperation, ArrayRemoveOperation> =
  (s: ArrayRemoveOperation, c: ArrayRemoveOperation) => {
    if (s.index === c.index) {
      // A-RR-2
      return new OperationPair(s.copy({noOp: true}), c.copy({noOp: true}));
    } else if (s.index < c.index) {
      // A-RR-1
      return new OperationPair(s, c.copy({index: c.index - 1}));
    } else {
      // A-RR-3
      return new OperationPair(s.copy({index: s.index - 1}), c);
    }
  };
