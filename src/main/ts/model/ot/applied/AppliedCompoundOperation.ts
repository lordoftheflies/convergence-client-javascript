import {AppliedOperation} from "./AppliedOperation";
import {BatchChange} from "../ops/operationChanges";
import {AppliedDiscreteOperation} from "./AppliedDiscreteOperation";
import {OperationType} from "../ops/OperationType";

export class AppliedCompoundOperation extends AppliedOperation implements BatchChange {
  constructor(public ops: AppliedDiscreteOperation[]) {
    super(OperationType.COMPOUND);
    Object.freeze(this);
  }

  public inverse(): AppliedCompoundOperation {
    return new AppliedCompoundOperation(this.ops.map((op) => {
      return <AppliedDiscreteOperation> op.inverse();
    }));
  }
}
