import { stripSchema } from "./strip-schema";

export function stripPublic(text: string, strip = true): string {
  let strippedText = text.trim().normalize("NFC");
  if (!strip) {
    return strippedText;
  }
  return stripSchema(text, true);
}
