import Operation from "./Operation";
import DiscreteOperation from "./DiscreteOperation";
import Immutable from "../../../util/Immutable";
import {OperationType} from "./OperationType";

export default class CompoundOperation extends Operation {

  constructor(public ops: DiscreteOperation[]) {
    super(OperationType.COMPOUND);
    Object.freeze(this);
  }

  copy(updates: any): CompoundOperation {
    return new CompoundOperation(Immutable.update(this.ops, updates.ops));
  }
}