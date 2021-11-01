import { Table } from "typeorm";

export function extractTableName(tableOrName: Table | string): string {
  if (typeof tableOrName === "string") {
    return tableOrName;
  }
  if (typeof tableOrName === "object") {
    if ("name" in tableOrName && typeof tableOrName.name === "string" && tableOrName.name.length > 0) {
      return tableOrName.name;
    }
  }
  return String(tableOrName);
}
