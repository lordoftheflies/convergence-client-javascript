import OperationTransformationFunction from "../OperationTransformationFunction";
import OperationPair from "../OperationPair";
import ArrayMoveOperation from "../../ops/ArrayMoveOperation";
import {ArrayMoveHelper} from "./ArrayMoveHelper";
import {MoveDirection} from "./ArrayMoveHelper";
import {RangeIndexRelationship} from "../../util/RangeRelationshipUtil";
import ArrayRemoveOperation from "../../ops/ArrayRemoveOperation";

export default class ArrayMoveRemoveOTF implements OperationTransformationFunction<ArrayMoveOperation, ArrayRemoveOperation> {
  transform(s: ArrayMoveOperation, c: ArrayRemoveOperation): OperationPair {
    switch (ArrayMoveHelper.getMoveDirection(s)) {
      case MoveDirection.Forward:
        return this.transformAgainstForwardMove(s, c);
      case MoveDirection.Backward:
        return this.transformAgainstBackwardMove(s, c);
      case MoveDirection.Identity:
        return this.transformAgainstIdentityMove(s, c);
      default:
        throw new Error("Invalid move direction");
    }
  }

  private transformAgainstForwardMove(s: ArrayMoveOperation, c: ArrayRemoveOperation): OperationPair {
    switch (ArrayMoveHelper.getRangeIndexRelationship(s, c.index)) {
      case RangeIndexRelationship.Before:
        // A-MR-1
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1, toIndex: s.toIndex - 1}), c);
      case RangeIndexRelationship.Start:
        // A-MR-2
        return new OperationPair(s.copy({noOp: true}), c.copy({index: s.toIndex}));
      case RangeIndexRelationship.Within:
      case RangeIndexRelationship.End:
        // A-MR-3 and A-MR-4
        return new OperationPair(s.copy({toIndex: s.toIndex - 1}), c.copy({index: c.index - 1}));
      case RangeIndexRelationship.After:
        // A-MR-5
        return new OperationPair(s, c);
      default:
        throw new Error("Invalid range-index relationship");
    }
  }

  private transformAgainstBackwardMove(s: ArrayMoveOperation, c: ArrayRemoveOperation): OperationPair {
    switch (ArrayMoveHelper.getRangeIndexRelationship(s, c.index)) {
      case RangeIndexRelationship.Before:
        // A-MR-6
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1, toIndex: s.toIndex - 1}), c);
      case RangeIndexRelationship.Start:
      case RangeIndexRelationship.Within:
        // A-MR-7 and A-MR-8
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1}), c.copy({index: c.index + 1}));
      case RangeIndexRelationship.End:
        // A-MR-9
        return new OperationPair(s.copy({noOp: true}), c.copy({index: s.toIndex}));
      case RangeIndexRelationship.After:
        // A-MR-10
        return new OperationPair(s, c);
      default:
        throw new Error("Invalid range-index relationship");
    }
  }

  private transformAgainstIdentityMove(s: ArrayMoveOperation, c: ArrayRemoveOperation): OperationPair {
    switch (ArrayMoveHelper.getRangeIndexRelationship(s, c.index)) {
      case RangeIndexRelationship.Before:
        // A-MR-11
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1, toIndex: s.toIndex - 1}), c);
      case RangeIndexRelationship.Start:
      case RangeIndexRelationship.Within:
      case RangeIndexRelationship.End:
        // A-MR-12
        return new OperationPair(s.copy({noOp: true}), c);
      case RangeIndexRelationship.After:
        // A-MR-13
        return new OperationPair(s, c);
      default:
        throw new Error("Invalid range-index relationship");
    }
  }
}