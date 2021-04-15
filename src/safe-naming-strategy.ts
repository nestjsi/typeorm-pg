import * as crypto from "crypto";

import { DefaultNamingStrategy, NamingStrategyInterface, Table } from "typeorm";

const cryptSha1 = (text: string): string => {
  const hash = crypto.createHash("sha1");
  hash.update(text);
  return hash.digest("hex");
};

const stripPublic = (text: string): string => (text.startsWith("public.") ? text.substr(7) : text);

export class SafeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  public foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    __referencedColumnNames?: string[],
    nameStartsWith: string = 'FK__',
  ): string {
    const tableName = stripPublic(typeof tableOrName === "string" ? tableOrName : tableOrName.name);
    const tablePath = stripPublic(referencedTablePath || "");
    const foreignKeyName = columnNames.reduce(
      (name: string, column: string) => `${stripPublic(name)}__${stripPublic(column)}`,
      `${tableName}__${tablePath}`,
    );
    const maxLength = 63 - nameStartsWith.length;
    if (foreignKeyName.length > maxLength) {
      return `${nameStartsWith}${cryptSha1(foreignKeyName)}`;
    } else {
      return `${nameStartsWith}${foreignKeyName}`;
    }
  }
}
