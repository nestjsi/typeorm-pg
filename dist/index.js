"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("typeorm");var t,r,a;(t=exports.ColumnPrimaryType||(exports.ColumnPrimaryType={})).BigInteger="bigint",t.Decimal="decimal",t.Integer="integer",t.SmallInteger="smallint",t.UUID="uuid",(r=exports.ColumnType||(exports.ColumnType={})).BigInteger="bigint",r.Bit="bit",r.BitVarying="bit varying",r.Bool="bool",r.Boolean="boolean",r.Box="box",r.ByteHexadecimal="bytea",r.CIText="citext",r.Char="char",r.Character="character",r.CharacterVarying="character varying",r.Circle="circle",r.Cube="cube",r.Date="date",r.DateRange="daterange",r.Decimal="decimal",r.DoublePrecision="double precision",r.Enum="enum",r.Float="float",r.Float4="float4",r.Float8="float8",r.Geography="geography",r.Geometry="geometry",r.HStore="hstore",r.IPAddress="inet",r.IPCIDR="cidr",r.Int="int",r.Int2="int2",r.Int4="int4",r.Int4Range="int4range",r.Int8="int8",r.Int8Range="int8range",r.Integer="integer",r.Interval="interval",r.JSON="json",r.JSONB="jsonb",r.LabelTrees="ltree",r.Line="line",r.LineSegment="lseg",r.MACAddress="macaddr",r.Money="money",r.NumberRange="numrange",r.Numeric="numeric",r.Path="path",r.Point="point",r.Polygon="polygon",r.Real="real",r.SmallInteger="smallint",r.String="character varying",r.Text="text",r.TextSearchQuery="tsquery",r.TextSearchVector="tsvector",r.Time="time",r.TimeStamp="timestamp",r.TimeStampWithTimeZoneAbbr="timestamptz",r.TimeStampWithTimeZoneRange="tstzrange",r.TimeStampWithoutTimeZone="timestamp without time zone",r.TimeStampWithoutTimeZoneRange="tsrange",r.TimeWithTimeZoneAbbr="timetz",r.TimeWithTimeZone="time with time zone",r.TimeWithoutTimeZone="time without time zone",r.TimeStampWithTimeZone="timestamp with time zone",r.UUID="uuid",r.VariableBitString="varbit",r.VariableChar="varchar",r.XML="xml",(a=exports.ConstLength||(exports.ConstLength={}))[a.EmailMax=254]="EmailMax",a[a.EmailMin=6]="EmailMin",a[a.NameMax=99]="NameMax",a[a.NameMin=1]="NameMin",a[a.PassMax=128]="PassMax",a[a.PassMin=5]="PassMin";function sha1Triplet(e,t,r,a){return e<20?t&r|~t&a:e<40?t^r^a:e<60?t&r|t&a|r&a:t^r^a}function addSafe(e,t){const r=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(r>>16)<<16|65535&r}function bitwiseRotateToLeft(e,t){return e<<t|e>>>32-t}function sha1OfRawString(e){return function bigEndianToString(e){let t="";for(let r=0;r<32*e.length;r+=8)t+=String.fromCharCode(e[r>>5]>>>24-r%32&255);return t}(function bigEndianToSha1(e,t){e[t>>5]|=128<<24-t%32,e[15+(t+64>>9<<4)]=t;const r=Array(80);let a=1732584193,n=-271733879,i=-1732584194,o=271733878,l=-1009589776;for(let t=0;t<e.length;t+=16){const s=a,g=n,c=i,u=o,h=l;for(let s=0;s<80;s+=1){r[s]=s<16?e[t+s]:bitwiseRotateToLeft(r[s-3]^r[s-8]^r[s-14]^r[s-16],1);const g=addSafe(addSafe(bitwiseRotateToLeft(a,5),sha1Triplet(s,n,i,o)),addSafe(addSafe(l,r[s]),(m=s)<20?1518500249:m<40?1859775393:m<60?-1894007588:-899497514));l=o,o=i,i=bitwiseRotateToLeft(n,30),n=a,a=g}a=addSafe(a,s),n=addSafe(n,g),i=addSafe(i,c),o=addSafe(o,u),l=addSafe(l,h)}var m;return Array(a,n,i,o,l)}(function rawStringToBigEndian(e){let t=Array(e.length>>2);for(let e=0;e<t.length;e+=1)t[e]=0;for(let r=0;r<8*e.length;r+=8)t[r>>5]|=(255&e.charCodeAt(r/8))<<24-r%32;return t}(e),8*e.length))}function cryptSha1(e){return function rawStringToHexString(e){let t,r="";for(let a=0;a<e.length;a+=1)t=e.charCodeAt(a),r+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return r}(sha1OfRawString(function stringToRawUtf8String(e){let t,r,a="",n=-1;for(;++n<e.length;)t=e.charCodeAt(n),r=n+1<e.length?e.charCodeAt(n+1):0,55296<=t&&t<=56319&&56320<=r&&r<=57343&&(t=65536+((1023&t)<<10)+(1023&r),n+=1),t<=127?a+=String.fromCharCode(t):t<=2047?a+=String.fromCharCode(192|t>>>6&31,128|63&t):t<=65535?a+=String.fromCharCode(224|t>>>12&15,128|t>>>6&63,128|63&t):t<=2097151&&(a+=String.fromCharCode(240|t>>>18&7,128|t>>>12&63,128|t>>>6&63,128|63&t));return a}(e)))}function stripPublic(e,t=!0){let r=e.trim().normalize("NFC");return t&&r.startsWith("public.")?r.substr(7):r}class SafeNamingStrategy extends e.DefaultNamingStrategy{constructor(){super(...arguments),this.name="SafeNamingStrategy"}foreignKeyName(e,t,r,a,n="FK",i=!0){const o=stripPublic(String(e),i),l=stripPublic(r||"",i),m=t.reduce((e,t)=>`${stripPublic(e,i)}__${stripPublic(t,i)}`,`${o}__${l}`),s=63-n.length+2;return m.length>s?`${n}__${cryptSha1(m)}`:`${n}__${m}`}relationConstraintName(e,t,r="REL",a=!0){const n=stripPublic(String(e),a),i=63-r.length,o=`${r}__${n}__${t.map(e=>stripPublic(e,a)).join("_")}`;return o.length>i?`${r}__${cryptSha1(o)}`:o}indexName(e,t,r,a="IDX",n=!0){let i=stripPublic(String(e),n);const o=63-a.length,l=`${a}__${i}__${t.map(e=>stripPublic(e,n)).join("_")}`;return l.length>o?`${a}__${cryptSha1(l)}`:l}}exports.ColumnOptionsExtra={comment:"Extra data in JSON format",default:{},name:"extra",nullable:!1,type:"json"},exports.EMAIL_LENGTH_MAX=254,exports.EMAIL_LENGTH_MIN=6,exports.MANY_TO_MANY_OPTION_DEFAULT={eager:!0},exports.MANY_TO_ONE_OPTION_DEFAULT={eager:!0,onDelete:"RESTRICT",onUpdate:"CASCADE"},exports.NAME_LENGTH_MAX=99,exports.NAME_LENGTH_MIN=1,exports.ONE_TO_ONE_OPTION_DEFAULT={eager:!0,onDelete:"CASCADE",onUpdate:"CASCADE"},exports.PASSWORD_LENGTH_MAX=128,exports.PASSWORD_LENGTH_MIN=5,exports.SafeNamingStrategy=SafeNamingStrategy;
//# sourceMappingURL=index.js.map
