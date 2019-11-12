/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in the files
 * 'LICENSE' and 'COPYING.LESSER', which are part of this source code package.
 */

import {expect} from "chai";
import {Validation} from "../../main/util/Validation";

describe("Validation", () => {

  describe("assertNonEmptyArray", () => {
    it("Passing in a non array throws", () => {
      expect(() => Validation.assertNonEmptyArray(4 as any as any[])).to.throw();
    });

    it("Passing in a empty array throws", () => {
      expect(() => Validation.assertNonEmptyArray([])).to.throw();
    });

    it("Passing in a non-empty array does not throw", () => {
      expect(() => Validation.assertNonEmptyArray([4])).not.to.throw();
    });
  });
});
