/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in the files
 * 'LICENSE' and 'COPYING.LESSER', which are part of this source code package.
 */

/**
 * Indicates an error on the Convergence Server.
 */
export class ConvergenceServerError extends Error {
  /**
   * @internal
   */
  private readonly _code: string;

  /**
   * @internal
   */
  private readonly _details: {[key: string]: any};

  /**
   * @hidden
   * @internal
   */
  constructor(m: string, code: string, details: {[key: string]: any}) {
    super(m);

    this._code = code;
    this._details = details;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ConvergenceServerError.prototype);
  }

  public get code(): string {
    return this._code;
  }

  public get details(): {[key: string]: any} {
    return this._details;
  }
}