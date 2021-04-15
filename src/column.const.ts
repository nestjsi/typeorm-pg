export const EMAIL_LENGTH_MAX = 254 as const;
export const EMAIL_LENGTH_MIN = 6 as const;

export const NAME_LENGTH_MAX = 99 as const;
export const NAME_LENGTH_MIN = 1 as const;

export const PASSWORD_LENGTH_MAX = 128 as const;
export const PASSWORD_LENGTH_MIN = 5 as const;

export const ColumnOptionsExtra = {
  comment: "Extra data in JSON format",
  default: {},
  name: "extra",
  nullable: false,
  type: "json",
} as const;
