/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/**
 * A callback function that will result in some model data that will become the
 * model's initial contents.
 *
 * @category Real Time Data Subsystem
 */
export type ModelDataCallback = () => ModelData;

/**
 * Some JSON-like model data that will become the new model's initial contents.
 *
 * @category Real Time Data Subsystem
 */
export interface ModelData {
  [key: string]: any;
}

/**
 * Either some data or a callback returning data can be provided.
 *
 * @category Real Time Data Subsystem
 */
export type ModelDataInitializer = ModelData | ModelDataCallback;
