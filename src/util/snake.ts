/**
 * @name textCaseSnake
 * @description Converts string into snake-case.
 * @param {string} [text]
 * @returns {string}
 */
export function textCaseSnake(text: string): string {
  return text.replace(/(?:([a-z])([A-Z]))|(?:((?!^)[A-Z])([a-z]))/g, "$1_$3$2$4").toLowerCase();
}
