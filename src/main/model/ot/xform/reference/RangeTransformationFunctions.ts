/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is part of the Convergence JavaScript Client, which is released
 * under the terms of the GNU Lesser General Public License version 3
 * (LGPLv3), which is a refinement of the GNU Lesser General Public License
 * version 3 (GPLv3).  A copy of the both the GPLv3 and the LGPLv3 should have
 * been provided along with this file, typically located in the "COPYING" and
 * "COPYING.LESSER" files (respectively), which are part of this source code
 * package. Alternatively, see <https://www.gnu.org/licenses/gpl-3.0.html> and
 * <https://www.gnu.org/licenses/lgpl-3.0.html> for the full text of the GPLv3
 * and LGPLv3 licenses, if they were not provided.
 */

import {ReferenceTransformationFunction} from "../ReferenceTransformationFunction";
import {StringInsertOperation} from "../../ops/StringInsertOperation";
import {ModelReferenceData} from "../ReferenceTransformer";
import {Immutable} from "../../../../util/Immutable";
import {StringSetOperation} from "../../ops/StringSetOperation";
import {StringRemoveOperation} from "../../ops/StringRemoveOperation";
import {IndexRange} from "../../../reference";
import {RangeTransformer} from "./RangeTransformer";

///////////////////////////////////////////////////////////////////////////////
// String Operations
///////////////////////////////////////////////////////////////////////////////

/**
 * @hidden
 * @internal
 */
export const StringInsertRangeTransformationFunction: ReferenceTransformationFunction =
  (o: StringInsertOperation, r: ModelReferenceData) => {
    const values: IndexRange[] = RangeTransformer.handleInsert(r.values, o.index, o.value.length);
    return Immutable.copy(r, {values});
  };

/**
 * @hidden
 * @internal
 */
export const StringRemoveRangeTransformationFunction: ReferenceTransformationFunction =
  (o: StringRemoveOperation, r: ModelReferenceData) => {
    const values: IndexRange[] = RangeTransformer.handleRemove(r.values, o.index, o.value.length);
    return Immutable.copy(r, {values});
  };

/**
 * @hidden
 * @internal
 */
export const StringSetRangeTransformationFunction: ReferenceTransformationFunction =
  (o: StringSetOperation, r: ModelReferenceData) => {
    return null;
  };
