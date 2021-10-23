/**
 * @name textCaseCamel
 * @description Converts string into camelCase.
 * @param {string} [text]
 * @param {boolean=} [firstCapital=false]
 * @returns {string}
 */
export function textCaseCamel(text: string, firstCapital: boolean = false): string {
  return text.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset) {
    if (firstCapital && offset === 0) {
      return p1;
    }
    if (p2) {
      return p2.toUpperCase();
    }
    return p1.toLowerCase();
  });
}
