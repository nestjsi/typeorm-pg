# Changelog

---

## 0.1.6

-   ➕ New decorator `IndexColumns`.

-   ➕ New exported utility function `safeIndex`.

## 0.1.5

-   ➕ New decorator `UniqueColumns.

-   ➕ New exported utility function `safeUnique`.

## 0.1.4

-   ➕ New exported utility function `stripSchema`.

## 0.1.3

-   ➕ New decorator `Checks`.

## 0.1.2

-   ➕ New constants: **PGSQL_INTEGER_MAX**, **PGSQL_INTEGER_MIN**, **PGSQL_SMALL_INTEGER_MAX**, **PGSQL_SMALL_INTEGER_MIN**, **PGSQL_BIG_INTEGER_MAX**, **PGSQL_BIG_INTEGER_MIN**, **PGSQL_NUMERIC_MAX**, **PGSQL_NUMERIC_MIN**.

## 0.1.1

-   ♻️ `SafeNamingStrategy` - foreign keys now have double underscores from start. Breaking change.

## 0.1.0

-   ♻️ `SafeNamingStrategy` - change names started with defaults. Breaking change.

## 0.0.8

-   ⬆️ Dependencies updated.

## 0.0.7

-   ♻️ `SafeNamingStrategy` - custom name for index key.

## 0.0.6

-   📚 Documentation updated.

## 0.0.5

-   ♻️ `SafeNamingStrategy` - custom name for relation constraint key.

## 0.0.4

-   ♻️ `SafeNamingStrategy` - custom name for foreign key.

## 0.0.3

-   ♻️ Rename `CustomNamingStrategy` to `SafeNamingStrategy`.

## 0.0.2

-   ♻️ `CustomNamingStrategy.foreignKeyName()` now fits into PostgreSQL's max identifier length (63 bytes).

## 0.0.1

-   Initial commit.
