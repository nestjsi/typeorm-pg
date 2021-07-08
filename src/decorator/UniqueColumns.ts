import { Unique } from "typeorm";

import { safeUnique } from "../util/safe-unique";

/**
 * @name UniqueColumns
 * @param {string[]} [fields]
 * @returns {ClassDecorator & PropertyDecorator}
 * @since 0.1.5
 */
export function UniqueColumns(fields: string[]): ClassDecorator & PropertyDecorator {
  return Unique(safeUnique(fields), fields);
}
