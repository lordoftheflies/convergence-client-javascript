/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in the files
 * 'LICENSE' and 'COPYING.LESSER', which are part of this source code package.
 */

import {RichTextElement} from "./RichTextElement";

/**
 * @hidden
 * @internal
 */
export interface RichTextContent {
  document(): RichTextDocument;
  root(): RichTextRootElement;
  parent(): RichTextElement;
  path(): RichTextPath;

  attributes(): Map<string, any>;
  getAttribute(key: string): any;
  hasAttribute(key: string): boolean;

  type(): RichTextContentType;
  isA(type: RichTextContentType): boolean;
  isLeaf(): boolean;
}

import {RichTextDocument} from "./RichTextDocument";
import {RichTextRootElement} from "./RichTextRootElement";
import {RichTextContentType} from "./RichTextContentType";
import {RichTextPath} from "./RichTextLocation";
