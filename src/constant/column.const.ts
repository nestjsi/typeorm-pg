/**
 * @description integer
 * @type {number}
 */
export const PGSQL_INTEGER_MAX = 2147483647 as const;

/**
 * @description integer
 * @type {number}
 */
export const PGSQL_INTEGER_MIN = -2147483648 as const;

/**
 * @description smallint
 * @type {number}
 */
export const PGSQL_SMALL_INTEGER_MAX = 32767 as const;

/**
 * @description smallint
 * @type {number}
 */
export const PGSQL_SMALL_INTEGER_MIN = -32768 as const;

/**
 * @description bigint
 * @type {string}
 */
export const PGSQL_BIG_INTEGER_MAX = '9223372036854775807' as const;

/**
 * @description bigint
 * @type {string}
 */
export const PGSQL_BIG_INTEGER_MIN = '-9223372036854775808' as const;

/**
 * @description numeric
 * @type {string}
 */
export const PGSQL_NUMERIC_MAX = '3141592653589793238462643383279502.1618033988749894848204586834365638' as const;

/**
 * @description numeric
 * @type {string}
 */
export const PGSQL_NUMERIC_MIN = '-3141592653589793238462643383279502.1618033988749894848204586834365638' as const;

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
