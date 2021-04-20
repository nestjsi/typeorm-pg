import { RelationOptions } from "typeorm";

export const MANY_TO_MANY_OPTION_DEFAULT: RelationOptions = {
  eager: true,
} as const;

export const MANY_TO_ONE_OPTION_DEFAULT: RelationOptions = {
  eager: true,
  // lazy: false,
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
  // persistence: true,
} as const;

export const ONE_TO_ONE_OPTION_DEFAULT: RelationOptions = {
  eager: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
} as const;
