"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("crypto"),t=require("typeorm");var a,i,r;(a=exports.ColumnPrimaryType||(exports.ColumnPrimaryType={})).BigInteger="bigint",a.Decimal="decimal",a.Integer="integer",a.SmallInteger="smallint",a.UUID="uuid",(i=exports.ColumnType||(exports.ColumnType={})).BigInteger="bigint",i.Bit="bit",i.BitVarying="bit varying",i.Bool="bool",i.Boolean="boolean",i.Box="box",i.ByteHexadecimal="bytea",i.CIText="citext",i.Char="char",i.Character="character",i.CharacterVarying="character varying",i.Circle="circle",i.Cube="cube",i.Date="date",i.DateRange="daterange",i.Decimal="decimal",i.DoublePrecision="double precision",i.Enum="enum",i.Float="float",i.Float4="float4",i.Float8="float8",i.Geography="geography",i.Geometry="geometry",i.HStore="hstore",i.IPAddress="inet",i.IPCIDR="cidr",i.Int="int",i.Int2="int2",i.Int4="int4",i.Int4Range="int4range",i.Int8="int8",i.Int8Range="int8range",i.Integer="integer",i.Interval="interval",i.JSON="json",i.JSONB="jsonb",i.LabelTrees="ltree",i.Line="line",i.LineSegment="lseg",i.MACAddress="macaddr",i.Money="money",i.NumberRange="numrange",i.Numeric="numeric",i.Path="path",i.Point="point",i.Polygon="polygon",i.Real="real",i.SmallInteger="smallint",i.String="character varying",i.Text="text",i.TextSearchQuery="tsquery",i.TextSearchVector="tsvector",i.Time="time",i.TimeStamp="timestamp",i.TimeStampWithTimeZoneAbbr="timestamptz",i.TimeStampWithTimeZoneRange="tstzrange",i.TimeStampWithoutTimeZone="timestamp without time zone",i.TimeStampWithoutTimeZoneRange="tsrange",i.TimeWithTimeZoneAbbr="timetz",i.TimeWithTimeZone="time with time zone",i.TimeWithoutTimeZone="time without time zone",i.TimeStampWithTimeZone="timestamp with time zone",i.UUID="uuid",i.VariableBitString="varbit",i.VariableChar="varchar",i.XML="xml",(r=exports.ConstLength||(exports.ConstLength={}))[r.EmailMax=254]="EmailMax",r[r.EmailMin=6]="EmailMin",r[r.NameMax=99]="NameMax",r[r.NameMin=1]="NameMin",r[r.PassMax=128]="PassMax",r[r.PassMin=5]="PassMin";const stripPublic=e=>e.startsWith("public.")?e.substr(7):e;class SafeNamingStrategy extends t.DefaultNamingStrategy{foreignKeyName(t,a,i,r,n="FK__"){const o=stripPublic("string"==typeof t?t:t.name),m=stripPublic(i||""),s=a.reduce((e,t)=>`${stripPublic(e)}__${stripPublic(t)}`,`${o}__${m}`),l=63-n.length;return s.length>l?`${n}${(t=>{const a=e.createHash("sha1");return a.update(t),a.digest("hex")})(s)}`:`${n}${s}`}}exports.ColumnOptionsExtra={comment:"Extra data in JSON format",default:{},name:"extra",nullable:!1,type:"json"},exports.EMAIL_LENGTH_MAX=254,exports.EMAIL_LENGTH_MIN=6,exports.MANY_TO_MANY_OPTION_DEFAULT={eager:!0},exports.MANY_TO_ONE_OPTION_DEFAULT={eager:!0,onDelete:"RESTRICT",onUpdate:"CASCADE"},exports.NAME_LENGTH_MAX=99,exports.NAME_LENGTH_MIN=1,exports.ONE_TO_ONE_OPTION_DEFAULT={eager:!0,onDelete:"CASCADE",onUpdate:"CASCADE"},exports.PASSWORD_LENGTH_MAX=128,exports.PASSWORD_LENGTH_MIN=5,exports.SafeNamingStrategy=SafeNamingStrategy;
//# sourceMappingURL=index.js.map
