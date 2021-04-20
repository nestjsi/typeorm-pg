# typeorm-pg

TypeORM PostgreSQL declarations and utilities.

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

### Useful constants

```typescript
import {
  EMAIL_LENGTH_MAX,
  EMAIL_LENGTH_MIN
  // and more…
} from '@nestjsi/typeorm-pg';
```
