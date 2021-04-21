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

  public foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    referencedColumnNames?: string[],
    nameStartsWith: string = "FK__",
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

  public relationConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
    nameStartsWith: string = "REL__",
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

  public indexName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string,
    nameStartsWith: string = "IDX__",
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
