import { Index } from "typeorm";

import { safeIndex } from "../util/safe-index";

/**
 * @name IndexColumns
 * @param {string[]} [fields]
 * @returns {ClassDecorator & PropertyDecorator}
 * @since 0.1.6
 */
export function IndexColumns(fields: string[]): ClassDecorator & PropertyDecorator {
  return Index(safeIndex(fields), fields);
}
