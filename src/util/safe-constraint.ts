import { textCaseCamel } from './camel';
import { textCaseSnake } from './snake';

import { cryptSha1 } from "./crypt-sha1";

const MAX_LENGTH = 64;

/**
 * @name safeConstraint
 * @description Return safe, uncut name for foreign keys, primary keys etc.
 * @param {string} [name]
 * @param {string} [separatorMinor='_']
 * @param {string} [separatorMajor='__']
 * @returns {string}
 */
export function safeConstraint(name: string, separatorMinor: string = '_', separatorMajor: string = '__'): string {
  if (name.length < MAX_LENGTH) {
    const chunks = name.trim().split(separatorMajor);
    const columns = chunks.pop() as string;
    const namesOriginal = columns.split(separatorMinor);
    const namesSnakeCase = namesOriginal.map(textCaseSnake);
    const start = chunks.join(separatorMajor);
    const nameSnake = `${start}${separatorMajor}${namesSnakeCase.join(separatorMinor)}`;
    if (nameSnake.length < MAX_LENGTH) {
      return nameSnake;
    }
    return name;
  }
  const chunks = name.trim().split(separatorMajor);
  const columns = [...chunks].pop() as string;
  const namesOriginal = columns.split(separatorMinor);
  const namesShortSnakeCase = namesOriginal
    //
    .map(textCaseSnake)
    .map((columnName) => {
      if (columnName.endsWith('_id') || columnName.endsWith('_ref')) {
        return columnName.substring(0, columnName.length - 3);
      }
      if (columnName.endsWith('_uuid')) {
        return columnName.substring(0, columnName.length - 5);
      }
      return columnName;
    });
  const start = chunks.join(separatorMajor);
  {
    const snake = `${start}${namesShortSnakeCase.join(separatorMinor)}`;
    if (snake.length < MAX_LENGTH) {
      return snake;
    }
  }
  {
    const camel = `${start}${namesShortSnakeCase.map((name) => textCaseCamel(name)).join(separatorMinor)}`;
    if (camel.length < MAX_LENGTH) {
      return camel;
    }
  }
  {
    const shortCamel = `${start}${namesShortSnakeCase.map((columnName) => textCaseCamel(columnName)).join(separatorMinor)}`;
    if (shortCamel.length < MAX_LENGTH) {
      return shortCamel;
    }
  }
  {
    const nameWithSha1 = `${start}${cryptSha1(columns)}`;
    if (nameWithSha1.length < MAX_LENGTH) {
      return nameWithSha1;
    }
  }
  {
    const chunkStart = chunks.shift();
    const toHash = chunks.join(separatorMajor) + columns;
    const nameSha1 = `${chunkStart}${separatorMajor}${cryptSha1(toHash)}`;
    if (nameSha1.length < MAX_LENGTH) {
      return nameSha1;
    }
  }
  return cryptSha1(name);
}
