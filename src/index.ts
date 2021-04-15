import { DefaultNamingStrategy, NamingStrategyInterface, RelationOptions, Table } from "typeorm";

function rawStringToBigEndian(text: string): number[] {
  let output = Array(text.length >> 2);
  for (let index = 0; index < output.length; index += 1) {
    output[index] = 0;
  }
  for (let index = 0; index < text.length * 8; index += 8) {
    output[index >> 5] |= (text.charCodeAt(index / 8) & 0xff) << (24 - (index % 32));
  }
  return output;
}

function bigEndianToString(text: number[]): string {
  let output = "";
  for (let index = 0; index < text.length * 32; index += 8) {
    output += String.fromCharCode((text[index >> 5] >>> (24 - (index % 32))) & 0xff);
  }
  return output;
}

function bigEndianToSha1(bigEndianArray: number[], textLength: number) {
  bigEndianArray[textLength >> 5] |= 0x80 << (24 - (textLength % 32));
  bigEndianArray[(((textLength + 64) >> 9) << 4) + 15] = textLength;
  const word = Array(80);
  let alpha = 1732584193;
  let beta = -271733879;
  let gamma = -1732584194;
  let delta = 271733878;
  let epsilon = -1009589776;
  for (let index = 0; index < bigEndianArray.length; index += 16) {
    const originalAlpha = alpha;
    const originalBeta = beta;
    const originalGamma = gamma;
    const originalDelta = delta;
    const originalEpsilon = epsilon;
    for (let dyadic = 0; dyadic < 80; dyadic += 1) {
      if (dyadic < 16) {
        word[dyadic] = bigEndianArray[index + dyadic];
      } else {
        word[dyadic] = bitwiseRotateToLeft(
          word[dyadic - 3] ^ word[dyadic - 8] ^ word[dyadic - 14] ^ word[dyadic - 16],
          1,
        );
      }
      const triplet = addSafe(
        addSafe(bitwiseRotateToLeft(alpha, 5), sha1Triplet(dyadic, beta, gamma, delta)),
        addSafe(addSafe(epsilon, word[dyadic]), sha1AdditiveConstantForCurrentIteration(dyadic)),
      );
      epsilon = delta;
      delta = gamma;
      gamma = bitwiseRotateToLeft(beta, 30);
      beta = alpha;
      alpha = triplet;
    }
    alpha = addSafe(alpha, originalAlpha);
    beta = addSafe(beta, originalBeta);
    gamma = addSafe(gamma, originalGamma);
    delta = addSafe(delta, originalDelta);
    epsilon = addSafe(epsilon, originalEpsilon);
  }
  return Array(alpha, beta, gamma, delta, epsilon);
}

function sha1Triplet(triplet: number, alpha: number, beta: number, gamma: number) {
  if (triplet < 20) {
    return (alpha & beta) | (~alpha & gamma);
  }
  if (triplet < 40) {
    return alpha ^ beta ^ gamma;
  }
  if (triplet < 60) {
    return (alpha & beta) | (alpha & gamma) | (beta & gamma);
  }
  return alpha ^ beta ^ gamma;
}

function sha1AdditiveConstantForCurrentIteration(aConstant: number) {
  return aConstant < 20 ? 1518500249 : aConstant < 40 ? 1859775393 : aConstant < 60 ? -1894007588 : -899497514;
}

function addSafe(alpha: number, beta: number) {
  const lsw = (alpha & 0xffff) + (beta & 0xffff);
  const msw = (alpha >> 16) + (beta >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xffff);
}

function bitwiseRotateToLeft(aNumber: number, count: number) {
  return (aNumber << count) | (aNumber >>> (32 - count));
}

function stringToRawUtf8String(text: string) {
  let output = "";
  let index = -1;
  let x;
  let y;
  while (++index < text.length) {
    x = text.charCodeAt(index);
    y = index + 1 < text.length ? text.charCodeAt(index + 1) : 0;
    if (0xd800 <= x && x <= 0xdbff && 0xdc00 <= y && y <= 0xdfff) {
      x = 0x10000 + ((x & 0x03ff) << 10) + (y & 0x03ff);
      index += 1;
    }
    if (x <= 0x7f) {
      output += String.fromCharCode(x);
    } else if (x <= 0x7ff) {
      output += String.fromCharCode(0xc0 | ((x >>> 6) & 0x1f), 0x80 | (x & 0x3f));
    } else if (x <= 0xffff) {
      output += String.fromCharCode(0xe0 | ((x >>> 12) & 0x0f), 0x80 | ((x >>> 6) & 0x3f), 0x80 | (x & 0x3f));
    } else if (x <= 0x1fffff) {
      output += String.fromCharCode(
        0xf0 | ((x >>> 18) & 0x07),
        0x80 | ((x >>> 12) & 0x3f),
        0x80 | ((x >>> 6) & 0x3f),
        0x80 | (x & 0x3f),
      );
    }
  }
  return output;
}

function sha1OfRawString(text: string) {
  return bigEndianToString(bigEndianToSha1(rawStringToBigEndian(text), text.length * 8));
}

function rawStringToHexString(text: string) {
  let output = "";
  let hex;
  for (let index = 0; index < text.length; index += 1) {
    hex = text.charCodeAt(index);
    output += "0123456789abcdef".charAt((hex >>> 4) & 0x0f) + "0123456789abcdef".charAt(hex & 0x0f);
  }
  return output;
}

function cryptSha1(text: string): string {
  return rawStringToHexString(sha1OfRawString(stringToRawUtf8String(text)));
}

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

export const ColumnOptionsExtra = {
  comment: "Extra data in JSON format",
  default: {},
  name: "extra",
  nullable: false,
  type: "json",
} as const;

export const EMAIL_LENGTH_MAX = 254 as const;
export const EMAIL_LENGTH_MIN = 6 as const;

export const NAME_LENGTH_MAX = 99 as const;
export const NAME_LENGTH_MIN = 1 as const;

export const PASSWORD_LENGTH_MAX = 128 as const;
export const PASSWORD_LENGTH_MIN = 5 as const;

export enum ConstLength {
  EmailMax = 254,
  EmailMin = 6,
  NameMax = 99,
  NameMin = 1,
  PassMax = 128,
  PassMin = 5,
}

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

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  public foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    referencedColumnNames?: string[],
  ): string {
    tableOrName = typeof tableOrName === "string" ? tableOrName : tableOrName.name;
    const foreignKeyName = columnNames.reduce(
      (name: string, column: string) => `${name}__${column}`,
      `${tableOrName}__${referencedTablePath}`,
    );
    // Array.from(foreignKeyName).length > 63
    if (foreignKeyName.length > 59) {
      return `FK__${cryptSha1(foreignKeyName)}`;
    } else {
      return `FK__${foreignKeyName}`;
    }
  }
}