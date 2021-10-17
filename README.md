# typescanner

A simple library for implementing [Type Guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) in TypeScript.


### Feature
- Basic Type Guard Functions + Custom Type Guard Functions
- Intuitive definition of Object's type guard functions
- Verify the type of a value in one line


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

//　Pass a constructor as argument
instanceOf(Error)
```

### scanner
`scanner` is a function to implement type guard for objects. It returns a "type guard function" of the type defined by Type Aliase by setting a field to the value of each property.
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
    j: number;
  };
  
  // You can extend fields by defining your own type guard functions.
  const even = (value: unknown): value is number =>
    isNumber(value) && value % 2 === 0;
  
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
    j: even, // Custom field
  });
  
  const foo = {
    a: "a",
    b: 2,
    c: true,
    d: new Date(),
    e: ["a", "b"],
    f: "f",
    g: "a",
    j: 2,
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
  const data = scan(foo as unknown, isFoo);
  data.a // OK
  
  // Error!
  const data = scan(bar as unknown, isFoo); // Error: value.key does not meet the condition.
```

### other
Basic type guard functions with function names beginning with "is".

```ts
// primitive

isString("a")

isNumber(1)

isBoolean(true)

isUndefined(undefined)

isNull(null)

isDate(new Data())

isSymbol(Symbol("a"))

isBigint(BigInt(1))

// isObject

isObject(value) // (value: unknown) =>  value is { [P in keyof T]?: unknown }

// isArray

isArray(["a", "b"], isString) // string[]

isArray<string | number>(["a", 1], isString, isNumber) // (string | number)[]

isArray(["a", null, undefined], isString, isNull, isUndefined) // (string | null | undefined)[]

// isOptional

isOptional("a", isString) // true

isOptional(undefined, isString) // true

// isList

const Lang = {
  ja: "ja",
  en: "en",
} as const;

type Lang = typeof Lang[keyof typeof Lang]; // "ja" | "en"
const langList = Object.values(Lang);

isList("ja", langList) // true

// isInstanceOf

try {
  ...
} catch (error) {
  if (isInstanceOf(error, Error)) {
    error.message // OK
  }
}
```

## Contribution

wellcome

## License

MIT
