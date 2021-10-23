/**
 * @description PostgreSQL's Max Identifier Length
 * @type {number}
 */
export const PGSQL_MAX_IDENTIFIER_LENGTH = 63 as const;

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

/**
 * Column types used for @PrimaryGeneratedColumn() decorator.
 */
export enum ColumnPrimaryType {
  BigInteger = "bigint",
  Decimal = "decimal",
  Integer = "integer",
  SmallInteger = "smallint",
  UUID = "uuid",
}

/**
 * @description Column types for PostgreSQL
 * @link https://typeorm.io/#/entities/column-types-for-postgres
 * @link https://github.com/typeorm/typeorm/blob/master/test/functional/database-schema/column-types/postgres/column-types-postgres.ts
 */
export enum ColumnType {
  BigInteger = "bigint",
  Bit = "bit",
  BitVarying = "bit varying",
  /**
   * @deprecated use Boolean instead
   * @alias Boolean
   */
  Bool = "bool",
  Boolean = "boolean",
  Box = "box",
  ByteHexadecimal = "bytea",
  CIText = "citext",
  /**
   * @deprecated use Character instead
   * @alias Character
   */
  Char = "char",
  Character = "character",
  CharacterVarying = "character varying",
  Circle = "circle",
  Cube = "cube",
  Date = "date",
  DateRange = "daterange",
  Decimal = "decimal",
  DoublePrecision = "double precision",
  Enum = "enum",
  Float = "float",
  /**
   * @deprecated use Real instead
   * @alias Real
   */
  Float4 = "float4",
  /**
   * @deprecated use DoublePrecision instead
   * @alias DoublePrecision
   */
  Float8 = "float8",
  Geography = "geography",
  Geometry = "geometry",
  HStore = "hstore",
  IPAddress = "inet",
  IPCIDR = "cidr",
  /**
   * @deprecated use Integer instead
   * @alias Integer
   */
  Int = "int",
  /**
   * @deprecated use SmallInt instead
   * @alias SmallInt
   */
  Int2 = "int2",
  /**
   * @deprecated use Integer instead
   * @alias Integer
   */
  Int4 = "int4",
  Int4Range = "int4range",
  /**
   * @deprecated use BigInt instead
   * @alias BigInt
   */
  Int8 = "int8",
  Int8Range = "int8range",
  Integer = "integer",
  Interval = "interval",
  JSON = "json",
  JSONB = "jsonb",
  LabelTrees = "ltree",
  Line = "line",
  LineSegment = "lseg",
  MACAddress = "macaddr",
  Money = "money",
  NumberRange = "numrange",
  /**
   * @deprecated use Decimal instead
   * @alias Decimal
   */
  Numeric = "numeric",
  Path = "path",
  Point = "point",
  Polygon = "polygon",
  Real = "real",
  SmallInteger = "smallint",
  /**
   * @description Text of variable-length with limit
   * @alias CharacterVarying
   */
  String = "character varying",
  Text = "text",
  TextSearchQuery = "tsquery",
  TextSearchVector = "tsvector",
  Time = "time",
  TimeStamp = "timestamp",
  /**
   * @deprecated use TimeStampWithTimeZone instead
   * @alias TimeStampWithTimeZone
   */
  TimeStampWithTimeZoneAbbr = "timestamptz",
  TimeStampWithTimeZoneRange = "tstzrange",
  TimeStampWithoutTimeZone = "timestamp without time zone",
  TimeStampWithoutTimeZoneRange = "tsrange",
  TimeWithTimeZoneAbbr = "timetz",
  TimeWithTimeZone = "time with time zone",
  TimeWithoutTimeZone = "time without time zone",
  TimeStampWithTimeZone = "timestamp with time zone",
  UUID = "uuid",
  /**
   * @deprecated use BitVarying instead
   * @alias BitVarying
   */
  VariableBitString = "varbit",
  /**
   * @deprecated use CharacterVarying instead
   * @alias CharacterVarying
   */
  VariableChar = "varchar",
  XML = "xml",
}

export enum ConstLength {
  EmailMax = 254,
  EmailMin = 6,
  NameMax = 99,
  NameMin = 1,
  PassMax = 128,
  PassMin = 5,
}

export enum ColumnPrefix {
  /** Unique index / constraint */
  AltKey = "ak",
  /** Check constraint */
  Check = "ck",
  /** Default constraint */
  Default = "df",
  /** Exclusion constraint */
  Exclusion = "ex",
  /** Foreign key */
  ForeignKey = "fk",
  /** Non-unique index */
  Index = "idx",
  /** Primary Key constraint */
  PrimaryKey = "pk",
  /** Relation constraint */
  Relation = "rel",
  /** Sequences */
  Sequences = "seq",
  /** Unique constraint */
  Unique = "uq",
}

export enum ColumnSuffix {
  /** Unique index / constraint */
  AltKey = "AK",
  /** Check constraint */
  Check = "CK",
  /** Default constraint */
  Default = "DF",
  /** Exclusion constraint */
  Exclusion = "EX",
  /** Foreign key */
  ForeignKey = "FK",
  /** Non-unique index */
  Index = "IDX",
  /** Primary Key constraint */
  PrimaryKey = "PK",
  /** Relation constraint */
  Relation = "REL",
  /** Sequences */
  Sequences = "SEQ",
  /** Unique constraint */
  Unique = "UQ",
}
