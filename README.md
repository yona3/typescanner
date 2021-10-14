# typescanner

typescanner is a simple library for implementing [Type Guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) in TypeScript.

It can be easily implemented from basic primitive type guard to type guard for types defined in Type Aliases.

## Install

```shell
npm i -D typescanner
```

## Example

```ts
// define the union type
const Lang = {
  ja: "ja",
  en: "en",
} as const;
type Lang = typeof Lang[keyof typeof Lang]; // "ja" | "en"

const langList = Object.values(Lang);

type Post = {
  id: number;
  author: string | null;
  body: string;
  lang: Lang;
  isPublic: boolean;
  createdAt: Date;
  tags?: string[] | null;
};

// create a scanner
const isPost = scanner<Post>({
  id: number,
  author: union(string, Null),
  body: string,
  lang: list(langList),
  isPublic: boolean,
  createdAt: date,
  tags: optional(array(string), Null),
});

const data = {
  id: 1,
  author: "taro",
  body: "Hello!",
  lang: "ja",
  isPublic: true,
  createdAt: new Date(),
  tags: ["tag1", "tag2"],
} as unknown;

// scan
const post = scan(data, isPost);

post.body; // OK

```

## Usage

### fields
`fields` is used when creating a `scanner`. `fields` returns a `Condition` or an array of conditions as defined below.
```ts
type Condition<T> = (value: unknown) => value is T;
```
```ts
string; // string
number; // number
boolean; // boolean
symbol; // symbol
bigint; // bigint
Undefined; // undefined
Null; // null
data; // Date

union(string, null); // string | null
// If you want to use multiple types other than null and undefined,
// you need to write the types explicitly.
union<string | number>(string, number); // string | number

// Passes the Condition for the values in the array.
array(string); // string[]
array<string | number>(string, number); // (string | number)[]

optional(string); // string | undefined
optional<string | number>(string, number); // string | number | undefined

// Check if the value passed when determining the type is contained 
// in the array passed by list().
list(["a", "b", "c"]); // "a" | "b" | "c"
```

### scanner
`scanner` is a function for implementing type guard for Objects. It returns a `Condition` of the type defined in Type Aliase by setting a field to the value of each property.
```ts
  type Foo = {
    a: string;
    b: number;
    c: boolean;
    d: Date;
    e: string[];
    f?: string;
    g: "a" | "b" | "c";
    h: string | null;
    i: string | number;
  };
  
  const isFoo = scanner<Foo>({
    a: string,
    b: number,
    c: boolean,
    d: date,
    e: array(string),
    f: optional(string),
    g: list(["a", "b", "c"]),
    h: union(string, Null),
    i: union<string | number>(string, number),
  });
  
  const foo = {
    a: "a",
    b: 2,
    c: true,
    d: new Date(),
    e: ["a", "b"],
    f: "f",
    g: "a",
  } as unknown;
  
  if (isFoo(foo)) {
    foo.a // OK
  }
```

### scan
`scan` is used with the first argument being the value you want to validate and the second argument being the `Condition`.
If the verification is successful, the "narrowed value" will be returned. If it fails, it throws an exception.
```ts
  // success
  const data = scan(foo, isFoo);
  data.a // OK
  
  // Error!
  const data = scan(bar, isFoo); // Error: type assertion is failed.
```

### primitive

```ts
isString("a")

isNumber(1)

isBoolean(true)

isUndefined(undefined)

isNull(null)

isDate(new Data())

isSymbol(Symbol("a"))

isBigint(BigInt(1))
```

### isArray

```ts
isArray(["a", "b"], isString) // string[]

isArray<string | number>(["a", 1], isString, isNumber) // (string | number)[]

isArray(["a", null, undefined], isString, isNull, isUndefined) // (string | null | undefined)[]
```

### isOptional

```ts
isOptional("a", isString) // true

isOptional(undefined, isString) // true
```

### isList

```ts
const Lang = {
  ja: "ja",
  en: "en",
} as const;

type Lang = typeof Lang[keyof typeof Lang]; // "ja" | "en"
const langList = Object.values(Lang);

isList("ja", langList)
```

## Contribution

wellcome

## License

MIT
