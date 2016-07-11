import DiscreteOperation from "../ops/DiscreteOperation";
import OperationTransformationFunction from "./OperationTransformationFunction";
import ArrayInsertInsertOTF from "./array/ArrayInsertInsertOTF";
import ArrayInsertRemoveOTF from "./array/ArrayInsertRemoveOTF";
import ArrayInsertReplaceOTF from "./array/ArrayInsertReplaceOTF";
import ArrayInsertMoveOTF from "./array/ArrayInsertMoveOTF";
import ArrayInsertSetOTF from "./array/ArrayInsertSetOTF";
import ArrayRemoveInsertOTF from "./array/ArrayRemoveInsertOTF";
import ArrayRemoveRemoveOTF from "./array/ArrayRemoveRemoveOTF";
import ArrayRemoveReplaceOTF from "./array/ArrayRemoveReplaceOTF";
import ArrayRemoveMoveOTF from "./array/ArrayRemoveMoveOTF";
import ArrayRemoveSetOTF from "./array/ArrayRemoveSetOTF";
import ArrayReplaceInsertOTF from "./array/ArrayReplaceInsertOTF";
import ArrayReplaceRemoveOTF from "./array/ArrayReplaceRemoveOTF";
import ArrayReplaceReplaceOTF from "./array/ArrayReplaceReplaceOTF";
import ArrayReplaceMoveOTF from "./array/ArrayReplaceMoveOTF";
import ArrayReplaceSetOTF from "./array/ArrayReplaceSetOTF";
import ArrayMoveInsertOTF from "./array/ArrayMoveInsertOTF";
import ArrayMoveRemoveOTF from "./array/ArrayMoveRemoveOTF";
import ArrayMoveReplaceOTF from "./array/ArrayMoveReplaceOTF";
import ArrayMoveMoveOTF from "./array/ArrayMoveMoveOTF";
import ArrayMoveSetOTF from "./array/ArrayMoveSetOTF";
import ArraySetInsertOTF from "./array/ArraySetInsertOTF";
import ArraySetRemoveOTF from "./array/ArraySetRemoveOTF";
import ArraySetReplaceOTF from "./array/ArraySetReplaceOTF";
import ArraySetMoveOTF from "./array/ArraySetMoveOTF";
import ArraySetSetOTF from "./array/ArraySetSetOTF";
import StringInsertInsertOTF from "./string/StringInsertInsertOTF";
import StringInsertRemoveOTF from "./string/StringInsertRemoveOTF";
import StringInsertSetOTF from "./string/StringInsertSetOTF";
import StringRemoveInsertOTF from "./string/StringRemoveInsertOTF";
import StringRemoveRemoveOTF from "./string/StringRemoveRemoveOTF";
import StringRemoveSetOTF from "./string/StringRemoveSetOTF";
import StringSetInsertOTF from "./string/StringSetInsertOTF";
import StringSetRemoveOTF from "./string/StringSetRemoveOTF";
import StringSetSetOTF from "./string/StringSetSetOTF";
import NumberAddAddOTF from "./number/NumberAddAddOTF";
import NumberAddSetOTF from "./number/NumberAddSetOTF";
import NumberSetAddOTF from "./number/NumberSetAddOTF";
import NumberSetSetOTF from "./number/NumberSetSetOTF";
import BooleanSetSetOTF from "./bool/BooleanSetSetOTF";
import ObjectAddPropertyAddPropertyOTF from "./object/ObjectAddPropertyAddPropertyOTF";
import ObjectAddPropertySetPropertyOTF from "./object/ObjectAddPropertySetPropertyOTF";
import ObjectAddPropertyRemovePropertyOTF from "./object/ObjectAddPropertyRemovePropertyOTF";
import ObjectRemovePropertyAddPropertyOTF from "./object/ObjectRemovePropertyAddPropertyOTF";
import ObjectRemovePropertySetPropertyOTF from "./object/ObjectRemovePropertySetPropertyOTF";
import ObjectRemovePropertyRemovePropertyOTF from "./object/ObjectRemovePropertyRemovePropertyOTF";
import ObjectAddPropertySetOTF from "./object/ObjectAddPropertySetOTF";
import ObjectRemovePropertySetOTF from "./object/ObjectRemovePropertySetOTF";
import ObjectSetPropertyAddPropertyOTF from "./object/ObjectSetPropertyAddPropertyOTF";
import ObjectSetPropertySetPropertyOTF from "./object/ObjectSetPropertySetPropertyOTF";
import ObjectSetPropertyRemovePropertyOTF from "./object/ObjectSetPropertyRemovePropertyOTF";
import ObjectSetPropertySetOTF from "./object/ObjectSetPropertySetOTF";
import ObjectSetAddPropertyOTF from "./object/ObjectSetAddPropertyOTF";
import ObjectSetSetPropertyOTF from "./object/ObjectSetSetPropertyOTF";
import ObjectSetRemovePropertyOTF from "./object/ObjectSetRemovePropertyOTF";
import ObjectSetSetOTF from "./object/ObjectSetSetOTF";
import {ReferenceTransformationFunction} from "./ReferenceTransformationFunction";
import {ModelReferenceData} from "./ReferenceTransformer";
import {ReferenceType} from "../../reference/ModelReference";
import {StringInsertIndexTransformationFunction} from "./reference/IndexTransformationFunctions";
import {OperationType} from "../ops/OperationType";
import {StringRemoveIndexTransformationFunction} from "./reference/IndexTransformationFunctions";
import {StringSetIndexTransformationFunction} from "./reference/IndexTransformationFunctions";
import {StringInsertRangeTransformationFunction} from "./reference/RangeTransformationFunctions";
import {StringRemoveRangeTransformationFunction} from "./reference/RangeTransformationFunctions";
import {StringSetRangeTransformationFunction} from "./reference/RangeTransformationFunctions";


export default class TransformationFunctionRegistry {
  _otfs: {[key: string]: OperationTransformationFunction<any, any>};
  _rtfs: {[key: string]: ReferenceTransformationFunction};

  constructor() {
    this._otfs = {};
    this._rtfs = {};

    // string Functions
    this.registerOtf(OperationType.STRING_INSERT, OperationType.STRING_INSERT, new StringInsertInsertOTF());
    this.registerOtf(OperationType.STRING_INSERT, OperationType.STRING_REMOVE, new StringInsertRemoveOTF());
    this.registerOtf(OperationType.STRING_INSERT, OperationType.STRING_VALUE, new StringInsertSetOTF());

    this.registerOtf(OperationType.STRING_REMOVE, OperationType.STRING_INSERT, new StringRemoveInsertOTF());
    this.registerOtf(OperationType.STRING_REMOVE, OperationType.STRING_REMOVE, new StringRemoveRemoveOTF());
    this.registerOtf(OperationType.STRING_REMOVE, OperationType.STRING_VALUE, new StringRemoveSetOTF());

    this.registerOtf(OperationType.STRING_VALUE, OperationType.STRING_INSERT, new StringSetInsertOTF());
    this.registerOtf(OperationType.STRING_VALUE, OperationType.STRING_REMOVE, new StringSetRemoveOTF());
    this.registerOtf(OperationType.STRING_VALUE, OperationType.STRING_VALUE, new StringSetSetOTF());

    // object Functions
    this.registerOtf(OperationType.OBJECT_ADD, OperationType.OBJECT_ADD, new ObjectAddPropertyAddPropertyOTF());
    this.registerOtf(OperationType.OBJECT_ADD, OperationType.OBJECT_SET, new ObjectAddPropertySetPropertyOTF());
    this.registerOtf(OperationType.OBJECT_ADD, OperationType.OBJECT_REMOVE, new ObjectAddPropertyRemovePropertyOTF());
    this.registerOtf(OperationType.OBJECT_ADD, OperationType.OBJECT_VALUE, new ObjectAddPropertySetOTF());

    this.registerOtf(OperationType.OBJECT_REMOVE, OperationType.OBJECT_ADD, new ObjectRemovePropertyAddPropertyOTF());
    this.registerOtf(OperationType.OBJECT_REMOVE, OperationType.OBJECT_SET, new ObjectRemovePropertySetPropertyOTF());
    this.registerOtf(OperationType.OBJECT_REMOVE, OperationType.OBJECT_REMOVE, new ObjectRemovePropertyRemovePropertyOTF());
    this.registerOtf(OperationType.OBJECT_REMOVE, OperationType.OBJECT_VALUE, new ObjectRemovePropertySetOTF());

    this.registerOtf(OperationType.OBJECT_SET, OperationType.OBJECT_ADD, new ObjectSetPropertyAddPropertyOTF());
    this.registerOtf(OperationType.OBJECT_SET, OperationType.OBJECT_SET, new ObjectSetPropertySetPropertyOTF());
    this.registerOtf(OperationType.OBJECT_SET, OperationType.OBJECT_REMOVE, new ObjectSetPropertyRemovePropertyOTF());
    this.registerOtf(OperationType.OBJECT_SET, OperationType.OBJECT_VALUE, new ObjectSetPropertySetOTF());

    this.registerOtf(OperationType.OBJECT_VALUE, OperationType.OBJECT_ADD, new ObjectSetAddPropertyOTF());
    this.registerOtf(OperationType.OBJECT_VALUE, OperationType.OBJECT_SET, new ObjectSetSetPropertyOTF());
    this.registerOtf(OperationType.OBJECT_VALUE, OperationType.OBJECT_REMOVE, new ObjectSetRemovePropertyOTF());
    this.registerOtf(OperationType.OBJECT_VALUE, OperationType.OBJECT_VALUE, new ObjectSetSetOTF());

    // array Functions
    this.registerOtf(OperationType.ARRAY_INSERT, OperationType.ARRAY_INSERT, new ArrayInsertInsertOTF());
    this.registerOtf(OperationType.ARRAY_INSERT, OperationType.ARRAY_REMOVE, new ArrayInsertRemoveOTF());
    this.registerOtf(OperationType.ARRAY_INSERT, OperationType.ARRAY_SET, new ArrayInsertReplaceOTF());
    this.registerOtf(OperationType.ARRAY_INSERT, OperationType.ARRAY_REORDER, new ArrayInsertMoveOTF());
    this.registerOtf(OperationType.ARRAY_INSERT, OperationType.ARRAY_VALUE, new ArrayInsertSetOTF());

    this.registerOtf(OperationType.ARRAY_REMOVE, OperationType.ARRAY_INSERT, new ArrayRemoveInsertOTF());
    this.registerOtf(OperationType.ARRAY_REMOVE, OperationType.ARRAY_REMOVE, new ArrayRemoveRemoveOTF());
    this.registerOtf(OperationType.ARRAY_REMOVE, OperationType.ARRAY_SET, new ArrayRemoveReplaceOTF());
    this.registerOtf(OperationType.ARRAY_REMOVE, OperationType.ARRAY_REORDER, new ArrayRemoveMoveOTF());
    this.registerOtf(OperationType.ARRAY_REMOVE, OperationType.ARRAY_VALUE, new ArrayRemoveSetOTF());

    this.registerOtf(OperationType.ARRAY_SET, OperationType.ARRAY_INSERT, new ArrayReplaceInsertOTF());
    this.registerOtf(OperationType.ARRAY_SET, OperationType.ARRAY_REMOVE, new ArrayReplaceRemoveOTF());
    this.registerOtf(OperationType.ARRAY_SET, OperationType.ARRAY_SET, new ArrayReplaceReplaceOTF());
    this.registerOtf(OperationType.ARRAY_SET, OperationType.ARRAY_REORDER, new ArrayReplaceMoveOTF());
    this.registerOtf(OperationType.ARRAY_SET, OperationType.ARRAY_VALUE, new ArrayReplaceSetOTF());

    this.registerOtf(OperationType.ARRAY_REORDER, OperationType.ARRAY_INSERT, new ArrayMoveInsertOTF());
    this.registerOtf(OperationType.ARRAY_REORDER, OperationType.ARRAY_REMOVE, new ArrayMoveRemoveOTF());
    this.registerOtf(OperationType.ARRAY_REORDER, OperationType.ARRAY_SET, new ArrayMoveReplaceOTF());
    this.registerOtf(OperationType.ARRAY_REORDER, OperationType.ARRAY_REORDER, new ArrayMoveMoveOTF());
    this.registerOtf(OperationType.ARRAY_REORDER, OperationType.ARRAY_VALUE, new ArrayMoveSetOTF());

    this.registerOtf(OperationType.ARRAY_VALUE, OperationType.ARRAY_INSERT, new ArraySetInsertOTF());
    this.registerOtf(OperationType.ARRAY_VALUE, OperationType.ARRAY_REMOVE, new ArraySetRemoveOTF());
    this.registerOtf(OperationType.ARRAY_VALUE, OperationType.ARRAY_SET, new ArraySetReplaceOTF());
    this.registerOtf(OperationType.ARRAY_VALUE, OperationType.ARRAY_REORDER, new ArraySetMoveOTF());
    this.registerOtf(OperationType.ARRAY_VALUE, OperationType.ARRAY_VALUE, new ArraySetSetOTF());

    // number Functions
    this.registerOtf(OperationType.NUMBER_ADD, OperationType.NUMBER_ADD, new NumberAddAddOTF());
    this.registerOtf(OperationType.NUMBER_ADD, OperationType.NUMBER_VALUE, new NumberAddSetOTF());

    this.registerOtf(OperationType.NUMBER_VALUE, OperationType.NUMBER_ADD, new NumberSetAddOTF());
    this.registerOtf(OperationType.NUMBER_VALUE, OperationType.NUMBER_VALUE, new NumberSetSetOTF());

    // boolean Functions
    this.registerOtf(OperationType.BOOLEAN_VALUE, OperationType.BOOLEAN_VALUE, new BooleanSetSetOTF());

    //
    // Reference Transformation Functions
    //
    this.registerRtf(ReferenceType.INDEX, OperationType.STRING_INSERT, StringInsertIndexTransformationFunction);
    this.registerRtf(ReferenceType.INDEX, OperationType.STRING_REMOVE, StringRemoveIndexTransformationFunction);
    this.registerRtf(ReferenceType.INDEX, OperationType.STRING_VALUE, StringSetIndexTransformationFunction);

    this.registerRtf(ReferenceType.RANGE, OperationType.STRING_INSERT, StringInsertRangeTransformationFunction);
    this.registerRtf(ReferenceType.RANGE, OperationType.STRING_REMOVE, StringRemoveRangeTransformationFunction);
    this.registerRtf(ReferenceType.RANGE, OperationType.STRING_VALUE, StringSetRangeTransformationFunction);
  }

  registerOtf<S extends DiscreteOperation, C extends DiscreteOperation>
  (s: string, c: string, otf: OperationTransformationFunction<S, C>): void {
    var key: string = s + c;
    if (this._otfs[key]) {
      throw new Error("Transformation function already registered for " + s + ", " + c);
    } else {
      this._otfs[key] = otf;
    }
  }

  registerRtf<S extends DiscreteOperation>(r: string, s: string, rtf: ReferenceTransformationFunction): void {
    var key: string = s + r;
    if (this._rtfs[key]) {
      throw new Error("Transformation function already registered for " + s + ", " + r);
    } else {
      this._rtfs[key] = rtf;
    }
  }

  getOperationTransformationFunction<S extends DiscreteOperation, C extends DiscreteOperation>
  (s: S, c: C): OperationTransformationFunction<S, C> {
    var key: string = s.type + c.type;
    return this._otfs[key];
  }

  getReferenceTransformationFunction<O extends DiscreteOperation> (o: O, r: ModelReferenceData): ReferenceTransformationFunction {
    var key: string = o.type + r.type;
    return this._rtfs[key];
  }
}