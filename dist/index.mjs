import{DefaultNamingStrategy as t,getMetadataArgsStorage as e}from"typeorm";function sha1Triplet(t,e,n,r){return t<20?e&n|~e&r:t<40?e^n^r:t<60?e&n|e&r|n&r:e^n^r}function addSafe(t,e){const n=(65535&t)+(65535&e);return(t>>16)+(e>>16)+(n>>16)<<16|65535&n}function bitwiseRotateToLeft(t,e){return t<<e|t>>>32-e}function sha1OfRawString(t){return function bigEndianToString(t){let e="";for(let n=0;n<32*t.length;n+=8)e+=String.fromCharCode(t[n>>5]>>>24-n%32&255);return e}(function bigEndianToSha1(t,e){t[e>>5]|=128<<24-e%32,t[15+(e+64>>9<<4)]=e;const n=Array(80);let r=1732584193,i=-271733879,a=-1732584194,o=271733878,l=-1009589776;for(let e=0;e<t.length;e+=16){const s=r,c=i,g=a,h=o,u=l;for(let s=0;s<80;s+=1){n[s]=s<16?t[e+s]:bitwiseRotateToLeft(n[s-3]^n[s-8]^n[s-14]^n[s-16],1);const c=addSafe(addSafe(bitwiseRotateToLeft(r,5),sha1Triplet(s,i,a,o)),addSafe(addSafe(l,n[s]),(m=s)<20?1518500249:m<40?1859775393:m<60?-1894007588:-899497514));l=o,o=a,a=bitwiseRotateToLeft(i,30),i=r,r=c}r=addSafe(r,s),i=addSafe(i,c),a=addSafe(a,g),o=addSafe(o,h),l=addSafe(l,u)}var m;return Array(r,i,a,o,l)}(function rawStringToBigEndian(t){let e=Array(t.length>>2);for(let t=0;t<e.length;t+=1)e[t]=0;for(let n=0;n<8*t.length;n+=8)e[n>>5]|=(255&t.charCodeAt(n/8))<<24-n%32;return e}(t),8*t.length))}function cryptSha1(t){return function rawStringToHexString(t){let e,n="";for(let r=0;r<t.length;r+=1)e=t.charCodeAt(r),n+="0123456789abcdef".charAt(e>>>4&15)+"0123456789abcdef".charAt(15&e);return n}(sha1OfRawString(function stringToRawUtf8String(t){let e,n,r="",i=-1;for(;++i<t.length;)e=t.charCodeAt(i),n=i+1<t.length?t.charCodeAt(i+1):0,55296<=e&&e<=56319&&56320<=n&&n<=57343&&(e=65536+((1023&e)<<10)+(1023&n),i+=1),e<=127?r+=String.fromCharCode(e):e<=2047?r+=String.fromCharCode(192|e>>>6&31,128|63&e):e<=65535?r+=String.fromCharCode(224|e>>>12&15,128|e>>>6&63,128|63&e):e<=2097151&&(r+=String.fromCharCode(240|e>>>18&7,128|e>>>12&63,128|e>>>6&63,128|63&e));return r}(t)))}function stripSchema(t,e=!0){let n=t.trim().normalize("NFC");if(!n.includes("."))return n;if(e&&n.startsWith("public."))return n.substr(7);const r=n.split(".");return 2!==r.length?n:r[1]}function stripPublic(t,e=!0){let n=t.trim().normalize("NFC");return e?stripSchema(t,!0):n}class SafeNamingStrategy extends t{constructor(){super(...arguments),this.name="SafeNamingStrategy"}foreignKeyName(t,e,n,r,i="FK",a=!0){const o=stripPublic(String(t),a),l=stripPublic(n||"",a),m=e.reduce((t,e)=>`${stripPublic(t,a)}__${stripPublic(e,a)}`,`${o}__${l}`),s=63-i.length+2;return m.length>s?`${i}__${cryptSha1(m)}`:`${i}__${m}`}relationConstraintName(t,e,n="REL",r=!0){const i=stripPublic(String(t),r),a=63-n.length,o=`${n}__${i}__${e.map(t=>stripPublic(t,r)).join("_")}`;return o.length>a?`${n}__${cryptSha1(o)}`:o}indexName(t,e,n,r="IDX",i=!0){let a=stripPublic(String(t),i);const o=63-r.length,l=`${r}__${a}__${e.map(t=>stripPublic(t,i)).join("_")}`;return l.length>o?`${r}__${cryptSha1(l)}`:l}}const n=2147483647,r=-2147483648,i=32767,a=-32768,o="9223372036854775807",l="-9223372036854775808",m="3141592653589793238462643383279502.1618033988749894848204586834365638",s="-3141592653589793238462643383279502.1618033988749894848204586834365638",c=254,g=6,h=99,u=1,f=128,S=5,d={comment:"Extra data in JSON format",default:{},name:"extra",nullable:!1,type:"json"};var p,b,y;!function(t){t.BigInteger="bigint",t.Decimal="decimal",t.Integer="integer",t.SmallInteger="smallint",t.UUID="uuid"}(p||(p={})),function(t){t.BigInteger="bigint",t.Bit="bit",t.BitVarying="bit varying",t.Bool="bool",t.Boolean="boolean",t.Box="box",t.ByteHexadecimal="bytea",t.CIText="citext",t.Char="char",t.Character="character",t.CharacterVarying="character varying",t.Circle="circle",t.Cube="cube",t.Date="date",t.DateRange="daterange",t.Decimal="decimal",t.DoublePrecision="double precision",t.Enum="enum",t.Float="float",t.Float4="float4",t.Float8="float8",t.Geography="geography",t.Geometry="geometry",t.HStore="hstore",t.IPAddress="inet",t.IPCIDR="cidr",t.Int="int",t.Int2="int2",t.Int4="int4",t.Int4Range="int4range",t.Int8="int8",t.Int8Range="int8range",t.Integer="integer",t.Interval="interval",t.JSON="json",t.JSONB="jsonb",t.LabelTrees="ltree",t.Line="line",t.LineSegment="lseg",t.MACAddress="macaddr",t.Money="money",t.NumberRange="numrange",t.Numeric="numeric",t.Path="path",t.Point="point",t.Polygon="polygon",t.Real="real",t.SmallInteger="smallint",t.String="character varying",t.Text="text",t.TextSearchQuery="tsquery",t.TextSearchVector="tsvector",t.Time="time",t.TimeStamp="timestamp",t.TimeStampWithTimeZoneAbbr="timestamptz",t.TimeStampWithTimeZoneRange="tstzrange",t.TimeStampWithoutTimeZone="timestamp without time zone",t.TimeStampWithoutTimeZoneRange="tsrange",t.TimeWithTimeZoneAbbr="timetz",t.TimeWithTimeZone="time with time zone",t.TimeWithoutTimeZone="time without time zone",t.TimeStampWithTimeZone="timestamp with time zone",t.UUID="uuid",t.VariableBitString="varbit",t.VariableChar="varchar",t.XML="xml"}(b||(b={})),function(t){t[t.EmailMax=254]="EmailMax",t[t.EmailMin=6]="EmailMin",t[t.NameMax=99]="NameMax",t[t.NameMin=1]="NameMin",t[t.PassMax=128]="PassMax",t[t.PassMin=5]="PassMin"}(y||(y={}));const C={eager:!0},T={eager:!0,onDelete:"RESTRICT",onUpdate:"CASCADE"},x={eager:!0,onDelete:"CASCADE",onUpdate:"CASCADE"};function Checks(t,n){let r,i;if("string"==typeof t||t instanceof String?n?(r=t,i=n):i=t:Array.isArray(t)?i=t:"object"==typeof t&&("name"in t&&(r=t.name),"expressions"in t&&(i=t.expressions)),!i||0===i.length)throw new Error(`Check expressions is required ➜ ${JSON.stringify(t)}, ${JSON.stringify(n)}`);return Array.isArray(i)||(i=[i]),i=i.map(t=>((t=t.trim()).endsWith(";")&&(t=t.substring(0,t.length-1)),t)).join(" AND "),function EntityChecksDecorator(t,n){e().checks.push({target:n?t.constructor:t,name:r,expression:i})}}export{Checks,d as ColumnOptionsExtra,p as ColumnPrimaryType,b as ColumnType,y as ConstLength,c as EMAIL_LENGTH_MAX,g as EMAIL_LENGTH_MIN,C as MANY_TO_MANY_OPTION_DEFAULT,T as MANY_TO_ONE_OPTION_DEFAULT,h as NAME_LENGTH_MAX,u as NAME_LENGTH_MIN,x as ONE_TO_ONE_OPTION_DEFAULT,f as PASSWORD_LENGTH_MAX,S as PASSWORD_LENGTH_MIN,o as PGSQL_BIG_INTEGER_MAX,l as PGSQL_BIG_INTEGER_MIN,n as PGSQL_INTEGER_MAX,r as PGSQL_INTEGER_MIN,m as PGSQL_NUMERIC_MAX,s as PGSQL_NUMERIC_MIN,i as PGSQL_SMALL_INTEGER_MAX,a as PGSQL_SMALL_INTEGER_MIN,SafeNamingStrategy,cryptSha1,stripPublic,stripSchema};
//# sourceMappingURL=index.mjs.map
