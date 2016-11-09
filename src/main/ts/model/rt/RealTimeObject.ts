import {RealTimeElement} from "./RealTimeElement";
import {RealTimeContainerElement} from "./RealTimeContainerElement";
import {ObjectNode} from "../internal/ObjectNode";
import {RealTimeWrapperFactory} from "./RealTimeWrapperFactory";
import {ModelEventCallbacks} from "./RealTimeModel";
import {ReferenceType} from "../reference/ModelReference";
import {LocalModelReference} from "../reference/LocalModelReference";
import {ObjectNodeSetValueEvent} from "../internal/events";
import {ModelReference} from "../reference/ModelReference";
import {ObjectNodeRemoveEvent} from "../internal/events";
import {PropertyReference} from "../reference/PropertyReference";
import {ModelNode} from "../internal/ModelNode";
import {DiscreteOperation} from "../ot/ops/DiscreteOperation";
import {ObjectSetPropertyOperation} from "../ot/ops/ObjectSetPropertyOperation";
import {ObjectAddPropertyOperation} from "../ot/ops/ObjectAddPropertyOperation";
import {ObjectRemovePropertyOperation} from "../ot/ops/ObjectRemovePropertyOperation";
import {LocalPropertyReference} from "../reference/LocalPropertyReference";
import {ObjectSetOperation} from "../ot/ops/ObjectSetOperation";
import {ObjectNodeSetEvent} from "../internal/events";
import {ModelNodeEvent} from "../internal/events";
import {RealTimeModel} from "./RealTimeModel";

export class RealTimeObject extends RealTimeElement<{ [key: string]: any; }>
implements RealTimeContainerElement<{ [key: string]: any; }> {

  public static Events: any = {
    SET: "set",
    REMOVE: "remove",
    VALUE: "value",
    DETACHED: RealTimeElement.Events.DETACHED,
    MODEL_CHANGED: RealTimeElement.Events.MODEL_CHANGED
  };

  /**
   * Constructs a new RealTimeObject.
   */
  constructor(protected _delegate: ObjectNode,
              protected _callbacks: ModelEventCallbacks,
              protected _wrapperFactory: RealTimeWrapperFactory,
              _model: RealTimeModel) {
    super(_delegate, _callbacks, _wrapperFactory, _model, [ReferenceType.PROPERTY]);

    this._delegate.events().subscribe(event => this._handleReferenceEvents(event));
  }

  public get(key: string): RealTimeElement<any> {
    return this._wrapperFactory.wrap(this._delegate.get(key));
  }

  public set(key: string, value: any): RealTimeElement<any> {
    let propSet: boolean = this._delegate.hasKey(key);
    let delegateChild: ModelNode<any> = this._delegate.set(key, value);
    let operation: DiscreteOperation;
    if (propSet) {
      operation = new ObjectSetPropertyOperation(this.id(), false, key, delegateChild.dataValue());
    } else {
      operation = new ObjectAddPropertyOperation(this.id(), false, key, delegateChild.dataValue());
    }

    this._sendOperation(operation);
    return this._wrapperFactory.wrap(delegateChild);
  }

  public remove(key: string): void {
    this._delegate.remove(key);
  }

  public keys(): string[] {
    return this._delegate.keys();
  }

  public hasKey(key: string): boolean {
    return this._delegate.hasKey(key);
  }

  public forEach(callback: (model: RealTimeElement<any>, key?: string) => void): void {
    this._delegate.forEach((modelNode, key) => {
      callback(this._wrapperFactory.wrap(modelNode), key);
    });
  }

  public elementAt(pathArgs: any): RealTimeElement<any> {
    return this._wrapperFactory.wrap(this._delegate.valueAt(pathArgs));
  }

  public propertyReference(key: string): LocalPropertyReference {
    const existing: LocalModelReference<any, any> = this._referenceManager.getLocalReference(key);
    if (existing !== undefined) {
      if (existing.reference().type() !== ReferenceType.PROPERTY) {
        throw new Error("A reference with this key already exists, but is not an index reference");
      } else {
        return <LocalPropertyReference> existing;
      }
    } else {
      const reference: PropertyReference = new PropertyReference(
        this._referenceManager, key, this, this._delegate.username, this._delegate.sessionId, true);

      const local: LocalPropertyReference = new LocalPropertyReference(
        reference,
        this._callbacks.referenceEventCallbacks
      );
      this._referenceManager.addLocalReference(local);
      return local;
    }
  }

  private _handleReferenceEvents(event: ModelNodeEvent): void {
    if (event instanceof ObjectNodeSetValueEvent) {
      if (event.local) {
        this._sendOperation(new ObjectSetOperation(this.id(), false, this._delegate.dataValue().children));
      }

      this._referenceManager.getAll().forEach((ref: ModelReference<any>) => {
        ref._dispose();
      });
      this._referenceManager.removeAll();
      this._referenceManager.removeAllLocalReferences();
    } else if (event instanceof ObjectNodeRemoveEvent) {
      if (event.local) {
        this._sendOperation(new ObjectRemovePropertyOperation(this.id(), false, event.key));
      }
      this._referenceManager.getAll().forEach((ref: ModelReference<any>) => {
        if (ref instanceof PropertyReference) {
          ref._handlePropertyRemoved(event.key);
        }
      });
    } else if (event instanceof ObjectNodeSetEvent) {
      if (event.local) {
        // Operation Handled Bellow
        // Fixme: Refactor event so we can tell if value replaced or added
      }
      this._referenceManager.getAll().forEach((ref: ModelReference<any>) => {
        if (ref instanceof PropertyReference) {
          ref._handlePropertyRemoved(event.key);
        }
      });
    }
  }
}
