export function stripSchema(text: string, strip = true): string {
  let strippedText = text.trim().normalize("NFC");
  if (!strippedText.includes(".")) {
    return strippedText;
  }
  if (strip && strippedText.startsWith("public.")) {
    return strippedText.substr(7);
  }
  const chunks = strippedText.split(".");
  if (chunks.length !== 2) {
    return strippedText;
  }
  return chunks[1];
}
