import { safeConstraint } from "./safe-constraint";

/**
 * @name safeUnique
 * @description Return safe, uncut name for unique key.
 * @param {string[]} [columnNames]
 * @param {string} [prefix='UQ']
 * @param {string} [separatorMinor='_']
 * @param {string} [separatorMajor='__']
 * @returns {string}
 */
export function safeUnique(
  columnNames: string[],
  prefix: string = "UQ",
  separatorMinor: string = "_",
  separatorMajor: string = "__",
): string {
  return safeConstraint(
    `${prefix}${separatorMajor}${columnNames.join(separatorMinor)}`,
    separatorMinor,
    separatorMajor,
  );
}
