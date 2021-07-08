import { DefaultNamingStrategy, NamingStrategyInterface, RelationOptions, Table, Unique } from "typeorm";

/**
 * Column types used for @PrimaryGeneratedColumn() decorator.
 */
export declare enum ColumnPrimaryType {
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
export declare enum ColumnType {
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
export declare const ColumnOptionsExtra: {
  readonly comment: "Extra data in JSON format";
  readonly default: {};
  readonly name: "extra";
  readonly nullable: false;
  readonly type: "json";
};
/**
 * @description integer
 * @type {number}
 */
export declare const PGSQL_INTEGER_MAX: number; // 2147483647

/**
 * @description integer
 * @type {number}
 */
export declare const PGSQL_INTEGER_MIN: number; // -2147483648

/**
 * @description smallint
 * @type {number}
 */
export declare const PGSQL_SMALL_INTEGER_MAX: number; // 32767

/**
 * @description smallint
 * @type {number}
 */
export declare const PGSQL_SMALL_INTEGER_MIN: number; // -32768

/**
 * @description bigint
 * @type {string}
 */
export declare const PGSQL_BIG_INTEGER_MAX: string; // "9223372036854775807"

/**
 * @description bigint
 * @type {string}
 */
export declare const PGSQL_BIG_INTEGER_MIN: string; // "-9223372036854775808"

/**
 * @description numeric
 * @type {string}
 */
export declare const PGSQL_NUMERIC_MAX: string; // "3141592653589793238462643383279502.1618033988749894848204586834365638"

/**
 * @description numeric
 * @type {string}
 */
export declare const PGSQL_NUMERIC_MIN: string;

export declare const EMAIL_LENGTH_MAX: 254;
export declare const EMAIL_LENGTH_MIN: 6;
export declare const NAME_LENGTH_MAX: 99;
export declare const NAME_LENGTH_MIN: 1;
export declare const PASSWORD_LENGTH_MAX: 128;
export declare const PASSWORD_LENGTH_MIN: 5;
export declare enum ConstLength {
  EmailMax = 254,
  EmailMin = 6,
  NameMax = 99,
  NameMin = 1,
  PassMax = 128,
  PassMin = 5,
}
export declare const MANY_TO_MANY_OPTION_DEFAULT: RelationOptions;
export declare const MANY_TO_ONE_OPTION_DEFAULT: RelationOptions;
export declare const ONE_TO_ONE_OPTION_DEFAULT: RelationOptions;

export declare class SafeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  /**
   * @foreignKeyName
   * @param {Table|String} [tableOrName]
   * @param {Array.<String>} [columnNames]
   * @param {String=} [referencedTablePath]
   * @param {Array.<String>=} [referencedColumnNames]
   * @param {String=} [nameStartsWith="FK"]
   * @param {Boolean=} [stripPublicSchemaName=true]
   * @returns {String}
   */
  public foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    referencedColumnNames?: string[],
    nameStartsWith?: string,
    stripPublicSchemaName?: boolean,
  ): string;

  /**
   * @name relationConstraintName
   * @param {Table|String} [tableOrName]
   * @param {Array.<String>} [columnNames]
   * @param {String=} [nameStartsWith="REL"]
   * @param {Boolean=} [stripPublicSchemaName=true]
   * @returns {String}
   */
  public relationConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
    nameStartsWith?: string,
    stripPublicSchemaName?: boolean,
  ): string;

  /**
   * @name indexName
   * @param {Table|string} [tableOrName]
   * @param {Array.<string>} [columnNames]
   * @param {string=} [where]
   * @param {string=} [nameStartsWith="IDX"]
   * @param {boolean} [stripPublicSchemaName=true]
   * @returns {string}
   */
  public indexName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string,
    nameStartsWith?: string,
    stripPublicSchemaName?: boolean,
  ): string;
}

/**
 * @name Checks
 * @description
 * Creates a database check.
 * Can be used on entity property or on entity.
 * Can create checks with composite columns when used on entity.
 * @param {string|Array.<string>|{expressions:string|Array.<string>}|{expressions:string|Array.<string>,name:string}} [nameOrExpressions]
 * @param {string|Array.<string>=} [maybeExpressions=undefined]
 * @returns {ClassDecorator & PropertyDecorator}
 * @since 0.1.3
 */
export function Checks(
  nameOrExpressions:
    | string
    | [string, ...string[]]
    | { expressions: string | [string, ...string[]] }
    | { expressions: string | [string, ...string[]]; name: string },
  maybeExpressions?: string | [string, ...string[]],
): ClassDecorator & PropertyDecorator;

export function cryptSha1(text: string): string;

export function stripPublic(text: string, strip: boolean): string;

export function stripSchema(text: string, strip: boolean): string;

/**
 * @name safeConstraint
 * @description Return safe, uncut name for foreign keys, primary keys etc.
 * @param {string} [name]
 * @param {string} [separatorMinor='_']
 * @param {string} [separatorMajor='__']
 * @returns {string}
 */
export function safeConstraint(name: string, separatorMinor?: string, separatorMajor?: string): string;

/**
 * @name safeUnique
 * @description Return safe, uncut name for unique key.
 * @param {string[]} [columnNames]
 * @param {string} [prefix='UQ']
 * @param {string} [separatorMinor='_']
 * @param {string} [separatorMajor='__']
 * @returns {string}
 */
export function safeUnique(
  columnNames: string[],
  prefix?: string,
  separatorMinor?: string,
  separatorMajor?: string,
): string;

/**
 * @name UniqueColumns
 * @param {string[]} [fields]
 * @returns {ClassDecorator & PropertyDecorator}
 * @since 0.1.5
 */
export function UniqueColumns(fields: string[]): ClassDecorator & PropertyDecorator;