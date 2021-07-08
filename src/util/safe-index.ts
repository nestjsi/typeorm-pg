import { safeConstraint } from "./safe-constraint";

/**
 * @name safeIndex
 * @description Return safe, uncut name for index key.
 * @param {string[]} [columnNames]
 * @param {string} [prefix='IDX']
 * @param {string} [separatorMinor='_']
 * @param {string} [separatorMajor='__']
 * @returns {string}
 */
export function safeIndex(
  columnNames: string[],
  prefix: string = "IDX",
  separatorMinor: string = "_",
  separatorMajor: string = "__",
): string {
  return safeConstraint(
    `${prefix}${separatorMajor}${columnNames.join(separatorMinor)}`,
    separatorMinor,
    separatorMajor,
  );
}
