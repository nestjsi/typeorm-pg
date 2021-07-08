/**
 * @description integer
 * @type {number}
 */
export const PGSQL_INTEGER_MAX: number = 2147483647 as const;

/**
 * @description integer
 * @type {number}
 */
export const PGSQL_INTEGER_MIN: number = -2147483648 as const;

/**
 * @description smallint
 * @type {number}
 */
export const PGSQL_SMALL_INTEGER_MAX: number = 32767 as const;

/**
 * @description smallint
 * @type {number}
 */
export const PGSQL_SMALL_INTEGER_MIN: number = -32768 as const;

/**
 * @description bigint
 * @type {string}
 */
export const PGSQL_BIG_INTEGER_MAX: string = '9223372036854775807' as const;

/**
 * @description bigint
 * @type {string}
 */
export const PGSQL_BIG_INTEGER_MIN: string = '-9223372036854775808' as const;

/**
 * @description numeric
 * @type {string}
 */
export const PGSQL_NUMERIC_MAX: string = '3141592653589793238462643383279502.1618033988749894848204586834365638' as const;

/**
 * @description numeric
 * @type {string}
 */
export const PGSQL_NUMERIC_MIN: string = '-3141592653589793238462643383279502.1618033988749894848204586834365638' as const;

export const EMAIL_LENGTH_MAX: number = 254 as const;
export const EMAIL_LENGTH_MIN: number = 6 as const;

export const NAME_LENGTH_MAX: number = 99 as const;
export const NAME_LENGTH_MIN: number = 1 as const;

export const PASSWORD_LENGTH_MAX: number = 128 as const;
export const PASSWORD_LENGTH_MIN: number = 5 as const;

export const ColumnOptionsExtra = {
  comment: "Extra data in JSON format",
  default: {},
  name: "extra",
  nullable: false,
  type: "json",
} as const;
