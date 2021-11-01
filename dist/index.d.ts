declare module "constant/column.const" {
  /**
   * @description PostgreSQL's Max Identifier Length
   * @type {number}
   */
  export const PGSQL_MAX_IDENTIFIER_LENGTH: 63;
  /**
   * @description integer
   * @type {number}
   */
  export const PGSQL_INTEGER_MAX: number;
  /**
   * @description integer
   * @type {number}
   */
  export const PGSQL_INTEGER_MIN: number;
  /**
   * @description smallint
   * @type {number}
   */
  export const PGSQL_SMALL_INTEGER_MAX: number;
  /**
   * @description smallint
   * @type {number}
   */
  export const PGSQL_SMALL_INTEGER_MIN: number;
  /**
   * @description bigint
   * @type {string}
   */
  export const PGSQL_BIG_INTEGER_MAX: string;
  /**
   * @description bigint
   * @type {string}
   */
  export const PGSQL_BIG_INTEGER_MIN: string;
  /**
   * @description numeric
   * @type {string}
   */
  export const PGSQL_NUMERIC_MAX: string;
  /**
   * @description numeric
   * @type {string}
   */
  export const PGSQL_NUMERIC_MIN: string;
  export const EMAIL_LENGTH_MAX: number;
  export const EMAIL_LENGTH_MIN: number;
  export const NAME_LENGTH_MAX: number;
  export const NAME_LENGTH_MIN: number;
  export const PASSWORD_LENGTH_MAX: number;
  export const PASSWORD_LENGTH_MIN: number;
  export const ColumnOptionsExtra: {
    readonly comment: "Extra data in JSON format";
    readonly default: {};
    readonly name: "extra";
    readonly nullable: false;
    readonly type: "json";
  };
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
}
declare module "util/crypt-sha1.func" {
  export function cryptSha1(text: string): string;
}
declare module "util/extract-table-name.func" {
  import { Table } from "typeorm";
  export function extractTableName(tableOrName: Table | string): string;
}
declare module "util/camel.func" {
  /**
   * @name textCaseCamel
   * @description Converts string into camelCase.
   * @param {string} [text]
   * @param {boolean=} [firstCapital=false]
   * @returns {string}
   */
  export function textCaseCamel(text: string, firstCapital?: boolean): string;
}
declare module "util/snake.func" {
  /**
   * @name textCaseSnake
   * @description Converts string into snake-case.
   * @param {string} [text]
   * @returns {string}
   */
  export function textCaseSnake(text: string): string;
}
declare module "util/safe-constraint.func" {
  /**
   * @name safeConstraint
   * @description Return safe, uncut name for foreign keys, primary keys etc.
   * @param {string} [name]
   * @param {string=} [separatorMinor='_']
   * @param {string=} [separatorMajor='__']
   * @returns {string}
   */
  export function safeConstraint(name: string, separatorMinor?: string, separatorMajor?: string): string;
}
declare module "util/strip-schema.func" {
  export function stripSchema(text: string, strip?: boolean): string;
}
declare module "util/strip-public.func" {
  export function stripPublic(text: string, strip?: boolean): string;
}
declare module "class/safe-naming-strategy.class" {
  import { DefaultNamingStrategy, NamingStrategyInterface, Table } from "typeorm";
  export class SafeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    name: string;
    /**
     * @name indexName
     * @param {Table|string} [tableOrName]
     * @param {string[]} [columnNames]
     * @param {string=} [where]
     * @param {string=} [nameStartsWith="IDX"]
     * @param {boolean} [stripPublicSchemaName=true]
     * @param {boolean=} [stripPathAndTableAttempt=true]
     * @returns {string}
     */
    indexName(
      tableOrName: Table | string,
      columnNames: string[],
      where?: string,
      nameStartsWith?: string,
      stripPublicSchemaName?: boolean,
      stripPathAndTableAttempt?: boolean,
    ): string;
    /**
     * @foreignKeyName
     * @param {Table|string} [tableOrName]
     * @param {string[]} [columnNames]
     * @param {string=} [referencedTablePath]
     * @param {string[]=} [referencedColumnNames]
     * @param {string=} [nameStartsWith="FK"]
     * @param {boolean=} [stripPublicSchemaName=true]
     * @param {boolean=} [stripPathAndTableAttempt=true]
     * @returns {string}
     */
    foreignKeyName(
      tableOrName: Table | string,
      columnNames: string[],
      referencedTablePath?: string,
      referencedColumnNames?: string[],
      nameStartsWith?: string,
      stripPublicSchemaName?: boolean,
      stripPathAndTableAttempt?: boolean,
    ): string;
    /**
     * @name primaryKeyName
     * @param {Table|string} [tableOrName]
     * @param {string[]} [columnNames]
     * @param {string=} [nameStartsWith="PK"]
     * @param {boolean=} [stripPublicSchemaName=true]
     * @param {boolean=} [stripPathAndTableAttempt=true]
     * @returns {string}
     */
    primaryKeyName(
      tableOrName: Table | string,
      columnNames: string[],
      nameStartsWith?: string,
      stripPublicSchemaName?: boolean,
      stripPathAndTableAttempt?: boolean,
    ): string;
    /**
     * @name relationConstraintName
     * @param {Table|string} [tableOrName]
     * @param {string[]} [columnNames]
     * @param {string=} [nameStartsWith="REL"]
     * @param {boolean=} [stripPublicSchemaName=true]
     * @param {boolean=} [stripPathAndTableAttempt=true]
     * @returns {string}
     */
    relationConstraintName(
      tableOrName: Table | string,
      columnNames: string[],
      nameStartsWith?: string,
      stripPublicSchemaName?: boolean,
      stripPathAndTableAttempt?: boolean,
    ): string;
  }
}
declare module "constant/options.const" {
  import { RelationOptions } from "typeorm";
  export const MANY_TO_MANY_OPTION_DEFAULT: RelationOptions;
  export const MANY_TO_ONE_OPTION_DEFAULT: RelationOptions;
  export const ONE_TO_ONE_OPTION_DEFAULT: RelationOptions;
}
declare module "decorator/checks.decorator" {
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
      | {
          expressions: string | [string, ...string[]];
        }
      | {
          expressions: string | [string, ...string[]];
          name: string;
        },
    maybeExpressions?: string | [string, ...string[]],
  ): ClassDecorator & PropertyDecorator;
}
declare module "util/safe-index.func" {
  /**
   * @name safeIndex
   * @description Return safe, uncut name for index key.
   * @param {string[]} [columnNames]
   * @param {string=} [prefix='IDX']
   * @param {string=} [separatorMinor='_']
   * @param {string=} [separatorMajor='__']
   * @returns {string}
   */
  export function safeIndex(
    columnNames: string[],
    prefix?: string,
    separatorMinor?: string,
    separatorMajor?: string,
  ): string;
}
declare module "decorator/index-columns.decorator" {
  /**
   * @name IndexColumns
   * @param {string[]} [fields] List of field names
   * @returns {ClassDecorator & PropertyDecorator}
   * @since 0.1.6
   */
  export function IndexColumns(fields: string[]): ClassDecorator & PropertyDecorator;
  /**
   * @name IndexColumns
   * @param {string[]} [fields] List of field names
   * @param {boolean|string=} [prefix=false] Add prefix to name
   * @returns {ClassDecorator & PropertyDecorator}
   * @since 0.1.6
   */
  export function IndexColumns(fields: string[], prefix?: boolean | string): ClassDecorator & PropertyDecorator;
  /**
   * @name IndexColumns
   * @param {string} [name] Column name
   * @param {string[]} [fields] List of field names
   * @returns {ClassDecorator & PropertyDecorator}
   * @since 0.1.6
   */
  export function IndexColumns(name: string, fields: string[]): ClassDecorator & PropertyDecorator;
  /**
   * @name IndexColumns
   * @param {string} [name] Column name
   * @param {string[]} [fields] List of field names
   * @param {boolean|string=} [prefix=false] Add prefix to name
   * @returns {ClassDecorator & PropertyDecorator}
   * @since 0.1.6
   */
  export function IndexColumns(
    name: string,
    fields: string[],
    prefix?: boolean | string,
  ): ClassDecorator & PropertyDecorator;
}
declare module "util/safe-unique.func" {
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
}
declare module "decorator/unique-columns.decorator" {
  /**
   * @name UniqueColumns
   * @param {string[]} [fields] List of field names
   * @returns {ClassDecorator & PropertyDecorator}
   * @since 0.1.5
   */
  export function UniqueColumns(fields: string[]): ClassDecorator & PropertyDecorator;
  /**
   * @name UniqueColumns
   * @param {string[]} [fields] List of field names
   * @param {boolean|string=} [prefix=false] Add prefix to name
   * @returns {ClassDecorator & PropertyDecorator}
   * @since 0.1.5
   */
  export function UniqueColumns(fields: string[], prefix?: boolean | string): ClassDecorator & PropertyDecorator;
  /**
   * @name UniqueColumns
   * @param {string} [name] Column name
   * @param {string[]} [fields] List of field names
   * @returns {ClassDecorator & PropertyDecorator}
   * @since 0.1.5
   */
  export function UniqueColumns(name: string, fields: string[]): ClassDecorator & PropertyDecorator;
  /**
   * @name UniqueColumns
   * @param {string} [name] Column name
   * @param {string[]} [fields] List of field names
   * @param {boolean|string=} [prefix=false] Add prefix to name
   * @returns {ClassDecorator & PropertyDecorator}
   * @since 0.1.5
   */
  export function UniqueColumns(
    name: string,
    fields: string[],
    prefix?: boolean | string,
  ): ClassDecorator & PropertyDecorator;
}
declare module "@nestjsi/typeorm-pg" {
  export * from "class/safe-naming-strategy.class";
  export * from "constant/column.const";
  export * from "constant/options.const";
  export * from "decorator/checks.decorator";
  export * from "decorator/index-columns.decorator";
  export * from "decorator/unique-columns.decorator";
  export * from "util/crypt-sha1.func";
  export * from "util/extract-table-name.func";
  export * from "util/safe-constraint.func";
  export * from "util/safe-index.func";
  export * from "util/safe-unique.func";
  export * from "util/strip-public.func";
  export * from "util/strip-schema.func";
}
