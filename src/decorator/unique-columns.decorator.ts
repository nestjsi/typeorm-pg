import { Unique } from "typeorm";

import { ColumnPrefix } from "../constant/column.const";

import { safeUnique } from "../util/safe-unique.func";
import { safeConstraint } from "../util/safe-constraint.func";

/**
 * @name UniqueColumns
 * @param {string[]} [fields] List of field names
 * @returns {ClassDecorator & PropertyDecorator}
 * @since 0.1.5
 */
export function UniqueColumns(fields: string[]): ClassDecorator & PropertyDecorator;
/**
 * @name UniqueColumns
 * @param {string[]} [fields] List of field names
 * @param {boolean|string=} [prefix=false] Add prefix to name
 * @returns {ClassDecorator & PropertyDecorator}
 * @since 0.1.5
 */
export function UniqueColumns(fields: string[], prefix?: boolean | string): ClassDecorator & PropertyDecorator;
/**
 * @name UniqueColumns
 * @param {string} [name] Column name
 * @param {string[]} [fields] List of field names
 * @returns {ClassDecorator & PropertyDecorator}
 * @since 0.1.5
 */
export function UniqueColumns(name: string, fields: string[]): ClassDecorator & PropertyDecorator;
/**
 * @name UniqueColumns
 * @param {string} [name] Column name
 * @param {string[]} [fields] List of field names
 * @param {boolean|string=} [prefix=false] Add prefix to name
 * @returns {ClassDecorator & PropertyDecorator}
 * @since 0.1.5
 */
export function UniqueColumns(
  name: string,
  fields: string[],
  prefix?: boolean | string,
): ClassDecorator & PropertyDecorator;

export function UniqueColumns(
  nameOrFields: string | string[],
  fieldsOrPrefix: string[] | boolean | string = false,
  prefix: boolean | string = false,
): ClassDecorator & PropertyDecorator {
  if (Array.isArray(nameOrFields)) {
    const fields = nameOrFields; // string[]
    let passPrefix = undefined;
    if (prefix === true) {
      passPrefix = ColumnPrefix.Unique;
    } else if (typeof prefix === "string") {
      passPrefix = prefix;
    }
    return Unique(safeUnique(fields, passPrefix), fields);
  } else {
    const fields = fieldsOrPrefix as string[];
    let name = nameOrFields; // string
    if (prefix === true) {
      name = `${ColumnPrefix.Unique}__${name}`;
    } else if (typeof prefix === "string") {
      name = `${prefix}${name}`;
    }
    return Unique(safeConstraint(name), fields);
  }
}
