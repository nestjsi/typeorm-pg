export function stripPublic(text: string, strip = true): string {
  let strippedText = text.trim().normalize();
  if (strip && strippedText.startsWith("public.")) {
    return strippedText.substr(7);
  } else {
    return strippedText;
  }
}
