"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("typeorm");function sha1Triplet(t,e,r,n){return t<20?e&r|~e&n:t<40?e^r^n:t<60?e&r|e&n|r&n:e^r^n}function addSafe(t,e){const r=(65535&t)+(65535&e);return(t>>16)+(e>>16)+(r>>16)<<16|65535&r}function bitwiseRotateToLeft(t,e){return t<<e|t>>>32-e}function sha1OfRawString(t){return function bigEndianToString(t){let e="";for(let r=0;r<32*t.length;r+=8)e+=String.fromCharCode(t[r>>5]>>>24-r%32&255);return e}(function bigEndianToSha1(t,e){t[e>>5]|=128<<24-e%32,t[15+(e+64>>9<<4)]=e;const r=Array(80);let n=1732584193,i=-271733879,a=-1732584194,o=271733878,s=-1009589776;for(let e=0;e<t.length;e+=16){const u=n,c=i,m=a,g=o,p=s;for(let u=0;u<80;u+=1){r[u]=u<16?t[e+u]:bitwiseRotateToLeft(r[u-3]^r[u-8]^r[u-14]^r[u-16],1);const c=addSafe(addSafe(bitwiseRotateToLeft(n,5),sha1Triplet(u,i,a,o)),addSafe(addSafe(s,r[u]),(l=u)<20?1518500249:l<40?1859775393:l<60?-1894007588:-899497514));s=o,o=a,a=bitwiseRotateToLeft(i,30),i=n,n=c}n=addSafe(n,u),i=addSafe(i,c),a=addSafe(a,m),o=addSafe(o,g),s=addSafe(s,p)}var l;return Array(n,i,a,o,s)}(function rawStringToBigEndian(t){let e=Array(t.length>>2);for(let t=0;t<e.length;t+=1)e[t]=0;for(let r=0;r<8*t.length;r+=8)e[r>>5]|=(255&t.charCodeAt(r/8))<<24-r%32;return e}(t),8*t.length))}function cryptSha1(t){return function rawStringToHexString(t){let e,r="";for(let n=0;n<t.length;n+=1)e=t.charCodeAt(n),r+="0123456789abcdef".charAt(e>>>4&15)+"0123456789abcdef".charAt(15&e);return r}(sha1OfRawString(function stringToRawUtf8String(t){let e,r,n="",i=-1;for(;++i<t.length;)e=t.charCodeAt(i),r=i+1<t.length?t.charCodeAt(i+1):0,55296<=e&&e<=56319&&56320<=r&&r<=57343&&(e=65536+((1023&e)<<10)+(1023&r),i+=1),e<=127?n+=String.fromCharCode(e):e<=2047?n+=String.fromCharCode(192|e>>>6&31,128|63&e):e<=65535?n+=String.fromCharCode(224|e>>>12&15,128|e>>>6&63,128|63&e):e<=2097151&&(n+=String.fromCharCode(240|e>>>18&7,128|e>>>12&63,128|e>>>6&63,128|63&e));return n}(t)))}function stripSchema(t,e=!0){let r=t.trim().normalize("NFC");if(!r.includes("."))return r;if(e&&r.startsWith("public."))return r.substr(7);const n=r.split(".");return 2!==n.length?r:n[1]}function stripPublic(t,e=!0){let r=t.trim().normalize("NFC");return e?stripSchema(t,!0):r}function textCaseCamel(t,e=!1){return t.replace(/^([A-Z])|[\s-_](\w)/g,(function(t,r,n,i){return!0===e&&0===i?r:n?n.toUpperCase():r.toLowerCase()}))}function textCaseSnake(t){return t.replace(/(?:([a-z])([A-Z]))|(?:((?!^)[A-Z])([a-z]))/g,"$1_$3$2$4").toLowerCase()}function safeConstraint(t,e="_",r="__"){if(t.length<64){const n=t.trim().split(r),i=n.pop().split(e).map(textCaseSnake),a=`${n.join(r)}${r}${i.join(e)}`;return a.length<64?a:t}const n=t.trim().split(r),i=[...n].pop(),a=i.split(e).map(textCaseSnake).map(t=>t.endsWith("_id")||t.endsWith("_ref")?t.substring(0,t.length-3):t.endsWith("_uuid")?t.substring(0,t.length-5):t),o=n.join(r);{const t=`${o}${a.join(e)}`;if(t.length<64)return t}{const t=`${o}${a.map(t=>textCaseCamel(t)).join(e)}`;if(t.length<64)return t}{const t=`${o}${a.map(t=>textCaseCamel(t)).join(e)}`;if(t.length<64)return t}{const t=`${o}${cryptSha1(i)}`;if(t.length<64)return t}{const t=`${n.shift()}${r}${cryptSha1(n.join(r)+i)}`;if(t.length<64)return t}return cryptSha1(t)}class SafeNamingStrategy extends t.DefaultNamingStrategy{constructor(){super(...arguments),this.name="SafeNamingStrategy"}foreignKeyName(t,e,r,n,i="FK",a=!0,o=!0){const s=stripPublic(String(t),a),l=stripPublic(r||"",a),u=e.reduce((t,e)=>`${stripPublic(t,a)}__${stripPublic(e,a)}`,`${s}__${l}`),c=63-i.length+2;if(u.length>c){if(o){const t=e.reduce((t,e)=>"_"+stripPublic(e,a),"");if(t.length<=c)return safeConstraint(`${i}_${t}`)}return safeConstraint(`${i}__${cryptSha1(u)}`)}return safeConstraint(`${i}__${u}`)}relationConstraintName(t,e,r="REL",n=!0,i=!0){const a=stripPublic(String(t),n),o=63-r.length,s=e.map(t=>stripPublic(t,n)).join("_"),l=`${r}__${a}__${s}`;if(l.length>o){if(i){const t=`${r}__${s}`;if(t.length<=o)return safeConstraint(t)}return safeConstraint(`${r}__${cryptSha1(l)}`)}return safeConstraint(l)}indexName(t,e,r,n="IDX",i=!0,a=!0){let o=stripPublic(String(t),i);const s=63-n.length,l=e.map(t=>stripPublic(t,i)).join("_"),u=`${n}__${o}__${l}`;if(u.length>s){if(a){const t=`${n}__${l}`;if(t.length<=s)return safeConstraint(t)}return safeConstraint(`${n}__${cryptSha1(u)}`)}return safeConstraint(u)}}var e,r,n;(e=exports.ColumnPrimaryType||(exports.ColumnPrimaryType={})).BigInteger="bigint",e.Decimal="decimal",e.Integer="integer",e.SmallInteger="smallint",e.UUID="uuid",(r=exports.ColumnType||(exports.ColumnType={})).BigInteger="bigint",r.Bit="bit",r.BitVarying="bit varying",r.Bool="bool",r.Boolean="boolean",r.Box="box",r.ByteHexadecimal="bytea",r.CIText="citext",r.Char="char",r.Character="character",r.CharacterVarying="character varying",r.Circle="circle",r.Cube="cube",r.Date="date",r.DateRange="daterange",r.Decimal="decimal",r.DoublePrecision="double precision",r.Enum="enum",r.Float="float",r.Float4="float4",r.Float8="float8",r.Geography="geography",r.Geometry="geometry",r.HStore="hstore",r.IPAddress="inet",r.IPCIDR="cidr",r.Int="int",r.Int2="int2",r.Int4="int4",r.Int4Range="int4range",r.Int8="int8",r.Int8Range="int8range",r.Integer="integer",r.Interval="interval",r.JSON="json",r.JSONB="jsonb",r.LabelTrees="ltree",r.Line="line",r.LineSegment="lseg",r.MACAddress="macaddr",r.Money="money",r.NumberRange="numrange",r.Numeric="numeric",r.Path="path",r.Point="point",r.Polygon="polygon",r.Real="real",r.SmallInteger="smallint",r.String="character varying",r.Text="text",r.TextSearchQuery="tsquery",r.TextSearchVector="tsvector",r.Time="time",r.TimeStamp="timestamp",r.TimeStampWithTimeZoneAbbr="timestamptz",r.TimeStampWithTimeZoneRange="tstzrange",r.TimeStampWithoutTimeZone="timestamp without time zone",r.TimeStampWithoutTimeZoneRange="tsrange",r.TimeWithTimeZoneAbbr="timetz",r.TimeWithTimeZone="time with time zone",r.TimeWithoutTimeZone="time without time zone",r.TimeStampWithTimeZone="timestamp with time zone",r.UUID="uuid",r.VariableBitString="varbit",r.VariableChar="varchar",r.XML="xml",(n=exports.ConstLength||(exports.ConstLength={}))[n.EmailMax=254]="EmailMax",n[n.EmailMin=6]="EmailMin",n[n.NameMax=99]="NameMax",n[n.NameMin=1]="NameMin",n[n.PassMax=128]="PassMax",n[n.PassMin=5]="PassMin";function safeUnique(t,e="UQ",r="_",n="__"){return safeConstraint(`${e}${n}${t.join(r)}`,r,n)}exports.Checks=function Checks(e,r){let n,i;if("string"==typeof e||e instanceof String?r?(n=e,i=r):i=e:Array.isArray(e)?i=e:"object"==typeof e&&("name"in e&&(n=e.name),"expressions"in e&&(i=e.expressions)),!i||0===i.length)throw new Error(`Check expressions is required ➜ ${JSON.stringify(e)}, ${JSON.stringify(r)}`);return Array.isArray(i)||(i=[i]),i=i.map(t=>((t=t.trim()).endsWith(";")&&(t=t.substring(0,t.length-1)),t)).join(" AND "),function EntityChecksDecorator(e,r){t.getMetadataArgsStorage().checks.push({target:r?e.constructor:e,name:n,expression:i})}},exports.ColumnOptionsExtra={comment:"Extra data in JSON format",default:{},name:"extra",nullable:!1,type:"json"},exports.EMAIL_LENGTH_MAX=254,exports.EMAIL_LENGTH_MIN=6,exports.MANY_TO_MANY_OPTION_DEFAULT={eager:!0},exports.MANY_TO_ONE_OPTION_DEFAULT={eager:!0,onDelete:"RESTRICT",onUpdate:"CASCADE"},exports.NAME_LENGTH_MAX=99,exports.NAME_LENGTH_MIN=1,exports.ONE_TO_ONE_OPTION_DEFAULT={eager:!0,onDelete:"CASCADE",onUpdate:"CASCADE"},exports.PASSWORD_LENGTH_MAX=128,exports.PASSWORD_LENGTH_MIN=5,exports.PGSQL_BIG_INTEGER_MAX="9223372036854775807",exports.PGSQL_BIG_INTEGER_MIN="-9223372036854775808",exports.PGSQL_INTEGER_MAX=2147483647,exports.PGSQL_INTEGER_MIN=-2147483648,exports.PGSQL_NUMERIC_MAX="3141592653589793238462643383279502.1618033988749894848204586834365638",exports.PGSQL_NUMERIC_MIN="-3141592653589793238462643383279502.1618033988749894848204586834365638",exports.PGSQL_SMALL_INTEGER_MAX=32767,exports.PGSQL_SMALL_INTEGER_MIN=-32768,exports.SafeNamingStrategy=SafeNamingStrategy,exports.UniqueColumns=function UniqueColumns(e){return t.Unique(safeUnique(e),e)},exports.cryptSha1=cryptSha1,exports.safeConstraint=safeConstraint,exports.safeUnique=safeUnique,exports.stripPublic=stripPublic,exports.stripSchema=stripSchema;
//# sourceMappingURL=index.js.map
