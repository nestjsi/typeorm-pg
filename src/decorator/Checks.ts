import { getMetadataArgsStorage } from "typeorm";
import { CheckMetadataArgs } from "typeorm/metadata-args/CheckMetadataArgs";

/**
 * @name Checks
 * @description
 * Creates a database check.
 * Can be used on entity property or on entity.
 * Can create checks with composite columns when used on entity.
 * @param {string|Array.<string>|{expressions:string|Array.<string>}|{expressions:string|Array.<string>,name:string}} [nameOrExpressions]
 * @param {string|Array.<string>=} [maybeExpressions=undefined]
 * @returns {ClassDecorator & PropertyDecorator}
 * @since 0.1.3
 */
export function Checks(
  nameOrExpressions:
    | string
    | [string, ...string[]]
    | { expressions: string | [string, ...string[]] }
    | { expressions: string | [string, ...string[]]; name: string },
  maybeExpressions?: string | [string, ...string[]],
): ClassDecorator & PropertyDecorator {
  let checkName: string | undefined;
  let expressions: string | [string, ...string[]] | undefined;
  if (typeof nameOrExpressions === "string" || nameOrExpressions instanceof String) {
    if (maybeExpressions) {
      checkName = nameOrExpressions as string;
      expressions = maybeExpressions as string | [string, ...string[]];
    } else {
      expressions = nameOrExpressions as string;
    }
  } else if (Array.isArray(nameOrExpressions)) {
    expressions = nameOrExpressions;
  } else if (typeof nameOrExpressions === "object") {
    if ("name" in nameOrExpressions) {
      checkName = nameOrExpressions.name;
    }
    if ("expressions" in nameOrExpressions) {
      expressions = nameOrExpressions.expressions;
    }
  }
  if (!expressions || expressions.length === 0) {
    throw new Error(
      `Check expressions is required ➜ ${JSON.stringify(nameOrExpressions)}, ${JSON.stringify(maybeExpressions)}`,
    );
  }
  if (!Array.isArray(expressions)) {
    expressions = [expressions];
  }
  expressions = expressions
    .map((expression: string) => {
      expression = expression.trim();
      if (expression.endsWith(";")) {
        expression = expression.substring(0, expression.length - 1);
      }
      return expression;
    })
    .join(" AND ");
  return function EntityChecksDecorator(
    clsOrObject:
      | (<TFunction extends (...args: any[]) => any>(target: TFunction) => TFunction | void)
      | Record<string, any>,
    propertyName?: string | symbol,
  ): void {
    getMetadataArgsStorage().checks.push({
      target: propertyName ? clsOrObject.constructor : (clsOrObject as (...args: any[]) => any),
      name: checkName,
      expression: expressions,
    } as CheckMetadataArgs);
  };
}
