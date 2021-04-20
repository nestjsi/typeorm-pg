import { DefaultNamingStrategy, NamingStrategyInterface, RelationOptions, Table } from "typeorm";

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
export const ColumnOptionsExtra: {
  readonly comment: "Extra data in JSON format";
  readonly default: {};
  readonly name: "extra";
  readonly nullable: false;
  readonly type: "json";
};
export const EMAIL_LENGTH_MAX: 254;
export const EMAIL_LENGTH_MIN: 6;
export const NAME_LENGTH_MAX: 99;
export const NAME_LENGTH_MIN: 1;
export const PASSWORD_LENGTH_MAX: 128;
export const PASSWORD_LENGTH_MIN: 5;
export enum ConstLength {
  EmailMax = 254,
  EmailMin = 6,
  NameMax = 99,
  NameMin = 1,
  PassMax = 128,
  PassMin = 5,
}
export const MANY_TO_MANY_OPTION_DEFAULT: RelationOptions;
export const MANY_TO_ONE_OPTION_DEFAULT: RelationOptions;
export const ONE_TO_ONE_OPTION_DEFAULT: RelationOptions;

export class SafeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  /**
   * @param {Table|string} tableOrName
   * @param {Array.<String>} columnNames
   * @param {String=} referencedTablePath
   * @param {Array.<String>=} referencedColumnNames
   * @param {String=} [nameStartsWith="FK__"]
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
   * @param {Table|string} tableOrName
   * @param {Array.<String>} columnNames
   * @param {String=} [nameStartsWith="REL__"]
   * @param {Boolean=} [stripPublicSchemaName=true]
   * @returns {String}
   */
  public relationConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
    nameStartsWith?: string,
    stripPublicSchemaName?: boolean,
  ): string;
}
