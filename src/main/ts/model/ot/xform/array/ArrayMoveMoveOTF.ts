import OperationTransformationFunction from "../OperationTransformationFunction";
import OperationPair from "../OperationPair";
import ArrayMoveOperation from "../../ops/ArrayMoveOperation";
import {ArrayMoveHelper} from "./ArrayMoveHelper";
import {MoveDirection} from "./ArrayMoveHelper";
import {RangeIndexRelationship} from "../../util/RangeRelationshipUtil";
import {RangeRangeRelationship} from "../../util/RangeRelationshipUtil";

export default class ArrayMoveMoveOTF implements OperationTransformationFunction<ArrayMoveOperation, ArrayMoveOperation> {
  transform(s: ArrayMoveOperation, c: ArrayMoveOperation): OperationPair {
    var sMoveType: MoveDirection = ArrayMoveHelper.getMoveDirection(s);
    var cMoveType: MoveDirection = ArrayMoveHelper.getMoveDirection(c);

    if (sMoveType === MoveDirection.Forward) {
      if (cMoveType === MoveDirection.Forward) {
        return this.transformServerForwardMoveWithClientForwardMove(s, c);
      } else if (cMoveType === MoveDirection.Backward) {
        return this.transformServerForwardMoveWithClientBackwardMove(s, c);
      } else { // MoveDirection.Identity
        return this.transformServerForwardMoveWithClientIdentityMove(s, c);
      }
    } else if (sMoveType === MoveDirection.Backward) {
      if (cMoveType === MoveDirection.Forward) {
        return this.transformServerBackwardMoveWithClientForwardMove(s, c);
      } else if (cMoveType === MoveDirection.Backward) {
        return this.transformServerBackwardMoveWithClientBackwardMove(s, c);
      } else { // MoveDirection.Identity
        return this.transformServerBackwardMoveWithClientIdentityMove(s, c);
      }
    } else {
      if (cMoveType === MoveDirection.Forward) {
        return this.transformServerIdentityMoveWithClientForwardMove(s, c);
      } else if (cMoveType === MoveDirection.Backward) {
        return this.transformServerIdentityMoveWithClientBackwardMove(s, c);
      } else { // MoveDirection.Identity
        return this.transformServerIdentityMoveWithClientIdentityMove(s, c);
      }
    }
  }

  private transformServerForwardMoveWithClientForwardMove(s: ArrayMoveOperation, c: ArrayMoveOperation): OperationPair {
    switch (ArrayMoveHelper.getRangeRelationship(s, c)) {
      case RangeRangeRelationship.Precedes:
        // A-MM-FF-1
        return new OperationPair(s, c);
      case RangeRangeRelationship.PrecededBy:
        // A-MM-FF-2
        return new OperationPair(s, c);
      case RangeRangeRelationship.Meets:
        // A-MM-FF-3
        return new OperationPair(s.copy({toIndex: s.toIndex - 1}), c.copy({fromIndex: c.fromIndex - 1}));
      case RangeRangeRelationship.MetBy:
        // A-MM-FF-4
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1}), c.copy({toIndex: c.toIndex - 1}));
      case RangeRangeRelationship.Overlaps:
        // A-MM-FF-5
        return new OperationPair(s.copy({toIndex: s.toIndex - 1}), c.copy({fromIndex: c.fromIndex - 1}));
      case RangeRangeRelationship.OverlappedBy:
        // A-MM-FF-6
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1}), c.copy({toIndex: c.toIndex - 1}));
      case RangeRangeRelationship.Starts:
        // A-MM-FF-7
        return new OperationPair(s.copy({fromIndex: c.toIndex}), c.copy({noOp: true}));
      case RangeRangeRelationship.StartedBy:
        // A-MM-FF-8
        return new OperationPair(s.copy({fromIndex: c.toIndex}), c.copy({noOp: true}));
      case RangeRangeRelationship.Contains:
        // A-MM-FF-9
        return new OperationPair(s, c.copy({fromIndex: c.fromIndex - 1, toIndex: c.toIndex - 1}));
      case RangeRangeRelationship.ContainedBy:
        // A-MM-FF-10
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1, toIndex: s.toIndex - 1}), c);
      case RangeRangeRelationship.Finishes:
        // A-MM-FF-11
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1}), c.copy({toIndex: c.toIndex - 1}));
      case RangeRangeRelationship.FinishedBy:
        // A-MM-FF-12
        return new OperationPair(s, c.copy({fromIndex: c.fromIndex - 1, toIndex: c.toIndex - 1}));
      case RangeRangeRelationship.EqualTo:
        // A-MM-FF-13
        return new OperationPair(s.copy({noOp: true}), c.copy({noOp: true}));
      default:
        throw new Error("Invalid range-range relationship");
    }
  }

  private transformServerForwardMoveWithClientBackwardMove(s: ArrayMoveOperation, c: ArrayMoveOperation): OperationPair {
    switch (ArrayMoveHelper.getRangeRelationship(s, c)) {
      case RangeRangeRelationship.Precedes:
        // A-MM-FB-1
        return new OperationPair(s, c);
      case RangeRangeRelationship.PrecededBy:
        // A-MM-FB-2
        return new OperationPair(s, c);
      case RangeRangeRelationship.Meets:
        // A-MM-FB-3
        return new OperationPair(s.copy({toIndex: s.toIndex + 1}), c.copy({toIndex: c.toIndex - 1}));
      case RangeRangeRelationship.MetBy:
        // A-MM-FB-4
        return new OperationPair(s.copy({fromIndex: c.toIndex}), c.copy({noOp: true}));
      case RangeRangeRelationship.Overlaps:
        // A-MM-FB-5
        return new OperationPair(s.copy({toIndex: s.toIndex + 1}), c.copy({toIndex: c.toIndex - 1}));
      case RangeRangeRelationship.OverlappedBy:
        // A-MM-FB-6
        return new OperationPair(s.copy({fromIndex: s.fromIndex + 1}), c.copy({fromIndex: c.fromIndex - 1}));
      case RangeRangeRelationship.Starts:
        // A-MM-FB-7
        return new OperationPair(s.copy({fromIndex: s.fromIndex + 1, toIndex: s.toIndex + 1}), c);
      case RangeRangeRelationship.StartedBy:
        // A-MM-FB-8
        return new OperationPair(s.copy({fromIndex: s.fromIndex + 1}), c.copy({fromIndex: c.fromIndex - 1}));
      case RangeRangeRelationship.Contains:
        // A-MM-FB-9
        return new OperationPair(s, c.copy({fromIndex: c.fromIndex - 1, toIndex: c.toIndex - 1}));
      case RangeRangeRelationship.ContainedBy:
        // A-MM-FB-10
        return new OperationPair(s.copy({fromIndex: s.fromIndex + 1, toIndex: s.toIndex + 1}), c);
      case RangeRangeRelationship.Finishes:
        // A-MM-FB-11
        return new OperationPair(s.copy({fromIndex: s.fromIndex + 1}), c.copy({fromIndex: c.fromIndex - 1}));
      case RangeRangeRelationship.FinishedBy:
        // A-MM-FB-12
        return new OperationPair(s, c.copy({fromIndex: c.fromIndex - 1, toIndex: c.toIndex - 1}));
      case RangeRangeRelationship.EqualTo:
        // A-MM-FB-13
        return new OperationPair(s.copy({fromIndex: s.fromIndex + 1}), c.copy({fromIndex: c.fromIndex - 1}));
      default:
        throw new Error("Invalid range-range relationship");
    }
  }

  private transformServerForwardMoveWithClientIdentityMove(s: ArrayMoveOperation, c: ArrayMoveOperation): OperationPair {
    switch (ArrayMoveHelper.getRangeIndexRelationship(s, c.fromIndex)) {
      case RangeIndexRelationship.Before:
      case RangeIndexRelationship.After:
        // A-MM-FI-1 and A-MM-FI-5
        return new OperationPair(s, c);
      case RangeIndexRelationship.Start:
        // A-MM-FI-2
        return new OperationPair(s, c.copy({fromIndex: s.toIndex, toIndex: s.toIndex}));
      case RangeIndexRelationship.Within:
      case RangeIndexRelationship.End:
        // A-MM-FI-3 and A-MM-FI-4
        return new OperationPair(s, c.copy({fromIndex: c.fromIndex - 1, toIndex: c.toIndex - 1}));
      default:
        throw new Error("Invalid range-index relationship");
    }
  }

  private transformServerBackwardMoveWithClientForwardMove(s: ArrayMoveOperation, c: ArrayMoveOperation): OperationPair {
    switch (ArrayMoveHelper.getRangeRelationship(s, c)) {
      case RangeRangeRelationship.Precedes:
        // A-MM-BF-1
        return new OperationPair(s, c);
      case RangeRangeRelationship.PrecededBy:
        // A-MM-BF-2
        return new OperationPair(s, c);
      case RangeRangeRelationship.Meets:
        // A-MM-BF-3
        return new OperationPair(s.copy({fromIndex: c.toIndex}), c.copy({noOp: true}));
      case RangeRangeRelationship.MetBy:
        // A-MM-BF-4
        return new OperationPair(s.copy({toIndex: s.toIndex - 1}), c.copy({toIndex: c.toIndex + 1}));
      case RangeRangeRelationship.Overlaps:
        // A-MM-BF-5
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1}), c.copy({fromIndex: c.fromIndex + 1}));
      case RangeRangeRelationship.OverlappedBy:
        // A-MM-BF-6
        return new OperationPair(s.copy({toIndex: s.toIndex - 1}), c.copy({toIndex: c.toIndex + 1}));
      case RangeRangeRelationship.Starts:
        // A-MM-BF-7
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1}), c.copy({fromIndex: c.fromIndex + 1}));
      case RangeRangeRelationship.StartedBy:
        // A-MM-BF-8
        return new OperationPair(s, c.copy({fromIndex: c.fromIndex + 1, toIndex: c.toIndex + 1}));
      case RangeRangeRelationship.Contains:
        // A-MM-BF-9
        return new OperationPair(s, c.copy({fromIndex: c.fromIndex + 1, toIndex: c.toIndex + 1}));
      case RangeRangeRelationship.ContainedBy:
        // A-MM-BF-10
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1, toIndex: s.toIndex - 1}), c);
      case RangeRangeRelationship.Finishes:
        // A-MM-BF-11
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1, toIndex: s.toIndex - 1}), c);
      case RangeRangeRelationship.FinishedBy:
        // A-MM-BF-12
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1}), c.copy({fromIndex: c.fromIndex + 1}));
      case RangeRangeRelationship.EqualTo:
        // A-MM-BF-13
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1}), c.copy({fromIndex: c.fromIndex + 1}));
      default:
        throw new Error("Invalid range-range relationship");
    }
  }

  private transformServerBackwardMoveWithClientBackwardMove(s: ArrayMoveOperation, c: ArrayMoveOperation): OperationPair {
    switch (ArrayMoveHelper.getRangeRelationship(s, c)) {
      case RangeRangeRelationship.Precedes:
        // A-MM-BB-1
        return new OperationPair(s, c);
      case RangeRangeRelationship.PrecededBy:
        // A-MM-BB-2
        return new OperationPair(s, c);
      case RangeRangeRelationship.Meets:
        // A-MM-BB-3
        return new OperationPair(s.copy({fromIndex: s.fromIndex + 1}), c.copy({toIndex: c.toIndex + 1}));
      case RangeRangeRelationship.MetBy:
        // A-MM-BB-4
        return new OperationPair(s.copy({toIndex: s.toIndex + 1}), c.copy({fromIndex: c.fromIndex + 1}));
      case RangeRangeRelationship.Overlaps:
        // A-MM-BB-5
        return new OperationPair(s.copy({fromIndex: s.fromIndex + 1}), c.copy({toIndex: c.toIndex + 1}));
      case RangeRangeRelationship.OverlappedBy:
        // A-MM-BB-6
        return new OperationPair(s.copy({toIndex: s.toIndex + 1}), c.copy({fromIndex: c.fromIndex + 1}));
      case RangeRangeRelationship.Starts:
        // A-MM-BB-7
        return new OperationPair(s.copy({fromIndex: s.fromIndex + 1, toIndex: s.toIndex + 1}), c);
      case RangeRangeRelationship.StartedBy:
        // A-MM-BB-8
        return new OperationPair(s, c.copy({fromIndex: c.fromIndex + 1, toIndex: c.toIndex + 1}));
      case RangeRangeRelationship.Contains:
        // A-MM-BB-9
        return new OperationPair(s, c.copy({fromIndex: c.fromIndex + 1, toIndex: c.toIndex + 1}));
      case RangeRangeRelationship.ContainedBy:
        // A-MM-BB-10
        return new OperationPair(s.copy({fromIndex: s.fromIndex + 1, toIndex: s.toIndex + 1}), c);
      case RangeRangeRelationship.Finishes:
        // A-MM-BB-11
        return new OperationPair(s.copy({fromIndex: c.toIndex}), c.copy({noOp: true}));
      case RangeRangeRelationship.FinishedBy:
        // A-MM-BB-12
        return new OperationPair(s.copy({fromIndex: c.toIndex}), c.copy({noOp: true}));
      case RangeRangeRelationship.EqualTo:
        // A-MM-BB-13
        return new OperationPair(s.copy({noOp: true}), c.copy({noOp: true}));
      default:
        throw new Error("Invalid range-range relationship");
    }
  }

  private transformServerBackwardMoveWithClientIdentityMove(s: ArrayMoveOperation, c: ArrayMoveOperation): OperationPair {
    switch (ArrayMoveHelper.getRangeIndexRelationship(s, c.fromIndex)) {
      case RangeIndexRelationship.Before:
      case RangeIndexRelationship.After:
        // A-MM-BI-1 and A-MM-BI-5
        return new OperationPair(s, c);
      case RangeIndexRelationship.Start:
      case RangeIndexRelationship.Within:
        // A-MM-BI-2 and A-MM-BI-3
        return new OperationPair(s, c.copy({fromIndex: c.fromIndex + 1, toIndex: c.toIndex + 1}));
      case RangeIndexRelationship.End:
        // A-MM-BI-4
        return new OperationPair(s, c.copy({fromIndex: s.toIndex, toIndex: s.toIndex}));
      default:
        throw new Error("Invalid range-index relationship");
    }
  }

  private transformServerIdentityMoveWithClientForwardMove(s: ArrayMoveOperation, c: ArrayMoveOperation): OperationPair {
    switch (ArrayMoveHelper.getRangeIndexRelationship(c, s.fromIndex)) {
      case RangeIndexRelationship.Before:
      case RangeIndexRelationship.After:
        // A-MM-IF-1 and A-MM-IF-5
        return new OperationPair(s, c);
      case RangeIndexRelationship.Start:
        // A-MM-IF-2
        return new OperationPair(s.copy({fromIndex: c.toIndex, toIndex: c.toIndex}), c);
      case RangeIndexRelationship.Within:
      case RangeIndexRelationship.End:
        // A-MM-IF-3 and A-MM-IF-4
        return new OperationPair(s.copy({fromIndex: s.fromIndex - 1, toIndex: s.toIndex - 1}), c);
      default:
        throw new Error("Invalid range-index relationship");
    }
  }

  private transformServerIdentityMoveWithClientBackwardMove(s: ArrayMoveOperation, c: ArrayMoveOperation): OperationPair {
    switch (ArrayMoveHelper.getRangeIndexRelationship(c, s.fromIndex)) {
      case RangeIndexRelationship.Before:
      case RangeIndexRelationship.After:
        // A-MM-IB-1 and A-MM-IB-5
        return new OperationPair(s, c);
      case RangeIndexRelationship.Start:
      case RangeIndexRelationship.Within:
        // A-MM-IB-2 and A-MM-IB-3
        return new OperationPair(s.copy({fromIndex: s.fromIndex + 1, toIndex: s.toIndex + 1}), c);
      case RangeIndexRelationship.End:
        // A-MM-IB-4
        return new OperationPair(s.copy({fromIndex: c.toIndex, toIndex: c.toIndex}), c);
      default:
        throw new Error("Invalid range-index relationship");
    }
  }

  private transformServerIdentityMoveWithClientIdentityMove(s: ArrayMoveOperation, c: ArrayMoveOperation): OperationPair {
    // A-MM-II-1
    return new OperationPair(s, c);
  }
}