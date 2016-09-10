import {ModelNode} from "./ModelNode";
import {BooleanValue} from "../dataValue";
import {ModelValueType} from "../ModelValueType";
import {Model} from "./Model";
import {BooleanSetOperation} from "../ot/ops/BooleanSetOperation";
import {ModelOperationEvent} from "../ModelOperationEvent";
import {OperationType} from "../ot/ops/OperationType";
import {Path} from "../ot/Path";
import {BooleanNodeSetValueEvent} from "./events";

export class BooleanNode extends ModelNode<boolean> {

  static Events: any = {
    VALUE: "value",
    DETACHED: ModelNode.Events.DETACHED,
    MODEL_CHANGED: ModelNode.Events.MODEL_CHANGED
  };

  private _data: boolean;

  /**
   * Constructs a new RealTimeBoolean.
   */
  constructor(data: BooleanValue,
              path: () => Path,
              model: Model,
              sessionId: string,
              username: string) {
    super(ModelValueType.Boolean, data.id, path, model, sessionId, username);
    this._data = data.value;
  }

  dataValue(): BooleanValue {
    return <BooleanValue> {
      id: this.id(),
      type: "boolean",
      value: this.data()
    };
  }

  //
  // private and protected methods
  //

  protected _setData(value: boolean): void {
    this._applySetValue(value, true, this.sessionId, this.username);
  }

  protected _getData(): boolean {
    return this._data;
  }

  private _applySetValue(value: boolean, local: boolean, sessionId: string, username: string): void {
    this._validateSet(value);
    this._data = value;

    var event: BooleanNodeSetValueEvent = {
      src: this,
      local: local,
      name: BooleanNode.Events.VALUE,
      sessionId: sessionId,
      username: username,
      value: value
    };

    this._emitValueEvent(event);
  }

  // Handlers for incoming operations

  _handleModelOperationEvent(operationEvent: ModelOperationEvent): void {
    var type: string = operationEvent.operation.type;
    if (type === OperationType.BOOLEAN_VALUE) {
      this._handleSetOperation(operationEvent);
    } else {
      throw new Error("Invalid operation!");
    }
  }

  private _handleSetOperation(operationEvent: ModelOperationEvent): void {
    var operation: BooleanSetOperation = <BooleanSetOperation> operationEvent.operation;
    this._applySetValue(operation.value, false, operationEvent.sessionId, operationEvent.username);
  }

  private _validateSet(value: boolean): void {
    if (typeof value !== "boolean") {
      throw new Error("Value must be a boolean");
    }
  }
}
