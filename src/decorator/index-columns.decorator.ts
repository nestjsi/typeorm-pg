import { Index } from "typeorm";

import { ColumnPrefix } from "../constant/column.const";

import { safeIndex } from "../util/safe-index.func";
import { safeConstraint } from "../util/safe-constraint.func";

/**
 * @name IndexColumns
 * @param {string[]} [fields] List of field names
 * @returns {ClassDecorator & PropertyDecorator}
 * @since 0.1.6
 */
export function IndexColumns(fields: string[]): ClassDecorator & PropertyDecorator;
/**
 * @name IndexColumns
 * @param {string[]} [fields] List of field names
 * @param {boolean|string=} [prefix=false] Add prefix to name
 * @returns {ClassDecorator & PropertyDecorator}
 * @since 0.1.6
 */
export function IndexColumns(fields: string[], prefix?: boolean | string): ClassDecorator & PropertyDecorator;
/**
 * @name IndexColumns
 * @param {string} [name] Column name
 * @param {string[]} [fields] List of field names
 * @returns {ClassDecorator & PropertyDecorator}
 * @since 0.1.6
 */
export function IndexColumns(name: string, fields: string[]): ClassDecorator & PropertyDecorator;
/**
 * @name IndexColumns
 * @param {string} [name] Column name
 * @param {string[]} [fields] List of field names
 * @param {boolean|string=} [prefix=false] Add prefix to name
 * @returns {ClassDecorator & PropertyDecorator}
 * @since 0.1.6
 */
export function IndexColumns(
  name: string,
  fields: string[],
  prefix?: boolean | string,
): ClassDecorator & PropertyDecorator;

export function IndexColumns(
  nameOrFields: string | string[],
  fieldsOrPrefix: string[] | boolean | string = false,
  prefix: boolean | string = false,
): ClassDecorator & PropertyDecorator {
  if (Array.isArray(nameOrFields)) {
    const fields = nameOrFields; // string[]
    let passPrefix = undefined;
    if (prefix === true) {
      passPrefix = ColumnPrefix.Index;
    } else if (typeof prefix === "string") {
      passPrefix = prefix;
    }
    return Index(safeIndex(fields, passPrefix), fields);
  } else {
    const fields = fieldsOrPrefix as string[];
    let name = nameOrFields; // string
    if (prefix === true) {
      name = `${ColumnPrefix.Index}__${name}`;
    } else if (typeof prefix === "string") {
      name = `${prefix}${name}`;
    }
    return Index(safeConstraint(name), fields);
  }
}
