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
    const tableName = stripPublic(
      typeof tableOrName === "string" ? tableOrName : tableOrName.name,
      stripPublicSchemaName,
    );
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
    const tableName = stripPublic(
      typeof tableOrName === "string" ? tableOrName : tableOrName.name,
      stripPublicSchemaName,
    );
    const maxLength = MAX_IDENTIFIER_LENGTH - nameStartsWith.length;
    const relationConstraintName = `REL__${tableName}__${columnNames.join("_")}`;
    if (relationConstraintName.length > maxLength) {
      return `${nameStartsWith}${cryptSha1(relationConstraintName)}`;
    } else {
      return relationConstraintName;
    }
  }
}
