# typeorm-pg

TypeORM PostgreSQL declarations and utilities.

[![NPM Version][npm-version-img]][npm-version-url]
[![NPM Downloads][npm-downloads-img]][npm-downloads-url]

---

## Examples

### Safe naming strategy for TypeORM

```typescript
import { SafeNamingStrategy } from '@nestjsi/typeorm-pg';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          namingStrategy: new SafeNamingStrategy(),
        } as TypeOrmModuleAsyncOptions),
    }),
  ],
})
export class AppModule {}
```

### TypeORM column primary type

```typescript
import { ColumnPrimaryType } from '@nestjsi/typeorm-pg';

enum ColumnPrimaryType {
  BigInteger = "bigint",
  Decimal = "decimal",
  Integer = "integer",
  SmallInteger = "smallint",
  UUID = "uuid",
}
```

### TypeORM column type

```typescript
import { ColumnType } from '@nestjsi/typeorm-pg';

enum ColumnType {
  BigInteger = "bigint",
  Boolean = "boolean",
  Decimal = "decimal",
  DoublePrecision = "double precision",
  Enum = "enum",
  Float = "float",
  Integer = "integer",
  JSON = "json",
  JSONB = "jsonb",
  SmallInteger = "smallint",
  Text = "text",
  TimeStampWithTimeZone = "timestamp with time zone",
  UUID = "uuid",
  // and more…
}
```

### Decorators

```typescript
import {
  Checks,
  IndexColumns,
  UniqueColumns,
} from '@nestjsi/typeorm-pg';
```

### Useful constants

```typescript
import {
  EMAIL_LENGTH_MAX,
  EMAIL_LENGTH_MIN,
  // and more…
} from '@nestjsi/typeorm-pg';
```

---

<!-- Badges -->

[npm-version-url]: https://npmjs.com/package/@nestjsi/typeorm-pg
[npm-version-img]: https://npmjs.com/package/@nestjsi/typeorm-pg?&icon=npm&label=npm&color=DD3636
[npm-downloads-url]: https://npmjs.com/package/@nestjsi/typeorm-pg
[npm-downloads-img]: https://badgen.net/npm/dt/@nestjsi/typeorm-pg?&icon=terminal&label=downloads&color=009688

