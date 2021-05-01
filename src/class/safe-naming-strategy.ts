import { DefaultNamingStrategy, NamingStrategyInterface, Table } from "typeorm";

import { cryptSha1 } from "../util/crypt-sha1";
import { stripPublic } from "../util/strip-public";

const MAX_IDENTIFIER_LENGTH = 63 as const;

export //
class SafeNamingStrategy
  //
  extends DefaultNamingStrategy
  //
  implements NamingStrategyInterface {
  //
  public name: string = "SafeNamingStrategy";

  /**
   * @foreignKeyName
   * @param {Table|String} [tableOrName]
   * @param {Array.<String>} [columnNames]
   * @param {String=} [referencedTablePath]
   * @param {Array.<String>=} [referencedColumnNames]
   * @param {String=} [nameStartsWith="FK"]
   * @param {Boolean=} [stripPublicSchemaName=true]
   * @returns {String}
   */
  public foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    referencedColumnNames?: string[],
    nameStartsWith: string = "FK",
    stripPublicSchemaName = true,
  ): string {
    const tableName = stripPublic(String(tableOrName), stripPublicSchemaName);
    const tablePath = stripPublic(referencedTablePath || "", stripPublicSchemaName);
    const foreignKeyName = columnNames.reduce(
      (name: string, column: string) =>
        `${stripPublic(name, stripPublicSchemaName)}__${stripPublic(column, stripPublicSchemaName)}`,
      `${tableName}__${tablePath}`,
    );
    const maxLength = MAX_IDENTIFIER_LENGTH - nameStartsWith.length;
    if (foreignKeyName.length > maxLength) {
      return `${nameStartsWith}${cryptSha1(foreignKeyName)}`;
    } else {
      return `${nameStartsWith}${foreignKeyName}`;
    }
  }

  /**
   * @name relationConstraintName
   * @param {Table|String} [tableOrName]
   * @param {Array.<String>} [columnNames]
   * @param {String=} [nameStartsWith="REL"]
   * @param {Boolean=} [stripPublicSchemaName=true]
   * @returns {String}
   */
  public relationConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
    nameStartsWith: string = "REL",
    stripPublicSchemaName = true,
  ): string {
    const tableName = stripPublic(String(tableOrName), stripPublicSchemaName);
    const maxLength = MAX_IDENTIFIER_LENGTH - nameStartsWith.length;
    const columns = columnNames.map(name => stripPublic(name, stripPublicSchemaName)).join('_');
    const relationConstraintName = `${nameStartsWith}__${tableName}__${columns}`;
    if (relationConstraintName.length > maxLength) {
      return `${nameStartsWith}${cryptSha1(relationConstraintName)}`;
    } else {
      return relationConstraintName;
    }
  }

  /**
   * @name indexName
   * @param {Table|string} [tableOrName]
   * @param {Array.<string>} [columnNames]
   * @param {string=} [where]
   * @param {string=} [nameStartsWith="IDX"]
   * @param {boolean} [stripPublicSchemaName=true]
   * @returns {string}
   */
  public indexName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string,
    nameStartsWith: string = "IDX",
    stripPublicSchemaName = true,
  ): string {
    let tableName = stripPublic(String(tableOrName), stripPublicSchemaName);
    const maxLength = MAX_IDENTIFIER_LENGTH - nameStartsWith.length;
    const columns = columnNames.map(name => stripPublic(name, stripPublicSchemaName)).join('_');
    const indexName = `${nameStartsWith}__${tableName}__${columns}`;
    if (indexName.length > maxLength) {
      return `${nameStartsWith}${cryptSha1(indexName)}`;
    } else {
      return indexName;
    }
  }
}
