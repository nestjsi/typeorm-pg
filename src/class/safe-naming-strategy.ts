import { DefaultNamingStrategy, NamingStrategyInterface, Table } from "typeorm";

import { cryptSha1 } from "../util/crypt-sha1";
import { stripPublic } from "../util/strip-public";
import { safeConstraint } from "../util/safe-constraint";

const MAX_IDENTIFIER_LENGTH = 63 as const;

export //
class SafeNamingStrategy
  //
  extends DefaultNamingStrategy
  //
  implements NamingStrategyInterface
{
  //
  public name: string = "SafeNamingStrategy";

  /**
   * @foreignKeyName
   * @param {Table|string} [tableOrName]
   * @param {string[]} [columnNames]
   * @param {string=} [referencedTablePath]
   * @param {string[]=} [referencedColumnNames]
   * @param {string=} [nameStartsWith="FK"]
   * @param {boolean=} [stripPublicSchemaName=true]
   * @param {boolean=} [stripPathAndTableAttempt=true]
   * @returns {string}
   */
  public foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    referencedColumnNames?: string[],
    nameStartsWith: string = "FK",
    stripPublicSchemaName = true,
    stripPathAndTableAttempt = true,
  ): string {
    const tableName = stripPublic(String(tableOrName), stripPublicSchemaName);
    const tablePath = stripPublic(referencedTablePath || "", stripPublicSchemaName);
    const foreignKeyName = columnNames.reduce(
      (name: string, column: string) =>
        `${stripPublic(name, stripPublicSchemaName)}__${stripPublic(column, stripPublicSchemaName)}`,
      `${tableName}__${tablePath}`,
    );
    const maxLength = MAX_IDENTIFIER_LENGTH - nameStartsWith.length + 2;
    if (foreignKeyName.length > maxLength) {
      if (stripPathAndTableAttempt) {
        const foreignKeyNameAttempt = columnNames
          //
          .reduce((name: string, column: string) => `_${stripPublic(column, stripPublicSchemaName)}`, "");
        if (foreignKeyNameAttempt.length <= maxLength) {
          return safeConstraint(`${nameStartsWith}_${foreignKeyNameAttempt}`);
          // return `${nameStartsWith}_${foreignKeyNameAttempt}`;
        }
      }
      return safeConstraint(`${nameStartsWith}__${cryptSha1(foreignKeyName)}`);
      // return `${nameStartsWith}__${cryptSha1(foreignKeyName)}`;
    } else {
      return safeConstraint(`${nameStartsWith}__${foreignKeyName}`);
      // return `${nameStartsWith}__${foreignKeyName}`;
    }
  }

  /**
   * @name relationConstraintName
   * @param {Table|string} [tableOrName]
   * @param {string[]} [columnNames]
   * @param {string=} [nameStartsWith="REL"]
   * @param {boolean=} [stripPublicSchemaName=true]
   * @param {boolean=} [stripPathAndTableAttempt=true]
   * @returns {string}
   */
  public relationConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
    nameStartsWith: string = "REL",
    stripPublicSchemaName = true,
    stripPathAndTableAttempt = true,
  ): string {
    const tableName = stripPublic(String(tableOrName), stripPublicSchemaName);
    const maxLength = MAX_IDENTIFIER_LENGTH - nameStartsWith.length;
    const columns = columnNames.map((name) => stripPublic(name, stripPublicSchemaName)).join("_");
    const relationConstraintName = `${nameStartsWith}__${tableName}__${columns}`;
    if (relationConstraintName.length > maxLength) {
      if (stripPathAndTableAttempt) {
        const relationConstraintNameAttempt = `${nameStartsWith}__${columns}`;
        if (relationConstraintNameAttempt.length <= maxLength) {
          return safeConstraint(relationConstraintNameAttempt);
        }
      }
      return safeConstraint(`${nameStartsWith}__${cryptSha1(relationConstraintName)}`);
      // return `${nameStartsWith}__${cryptSha1(relationConstraintName)}`;
    } else {
      return safeConstraint(relationConstraintName);
      // return relationConstraintName;
    }
  }

  /**
   * @name indexName
   * @param {Table|string} [tableOrName]
   * @param {string[]} [columnNames]
   * @param {string=} [where]
   * @param {string=} [nameStartsWith="IDX"]
   * @param {boolean} [stripPublicSchemaName=true]
   * @param {boolean=} [stripPathAndTableAttempt=true]
   * @returns {string}
   */
  public indexName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string,
    nameStartsWith: string = "IDX",
    stripPublicSchemaName = true,
    stripPathAndTableAttempt = true,
  ): string {
    let tableName = stripPublic(String(tableOrName), stripPublicSchemaName);
    const maxLength = MAX_IDENTIFIER_LENGTH - nameStartsWith.length;
    const columns = columnNames.map((name) => stripPublic(name, stripPublicSchemaName)).join("_");
    const indexName = `${nameStartsWith}__${tableName}__${columns}`;
    if (indexName.length > maxLength) {
      if (stripPathAndTableAttempt) {
        const indexNameAttempt = `${nameStartsWith}__${columns}`;
        if (indexNameAttempt.length <= maxLength) {
          return safeConstraint(indexNameAttempt);
          // return `${nameStartsWith}_${indexKeyNameAttempt}`;
        }
      }
      return safeConstraint(`${nameStartsWith}__${cryptSha1(indexName)}`);
      // return `${nameStartsWith}__${cryptSha1(indexName)}`;
    } else {
      return safeConstraint(indexName);
      // return indexName;
    }
  }
}
