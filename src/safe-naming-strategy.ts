import * as crypto from "crypto";

import { DefaultNamingStrategy, NamingStrategyInterface, Table } from "typeorm";

function cryptSha1(text: string) {
  const hash = crypto.createHash("sha1");
  hash.update(text);
  return hash.digest("hex");
}

export class SafeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  public foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    __referencedColumnNames?: string[],
  ): string {
    let tableName = typeof tableOrName === "string" ? tableOrName : tableOrName.name;
    if (tableName.startsWith("public.")) {
      tableName = tableName.substr(7);
    }
    const foreignKeyName = columnNames.reduce(
      (name: string, column: string) => `${name}__${column}`,
      `${tableName}__${referencedTablePath}`,
    );
    if (foreignKeyName.length > 59) {
      return `FK__${cryptSha1(foreignKeyName)}`;
    } else {
      return `FK__${foreignKeyName}`;
    }
  }
}
