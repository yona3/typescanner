# typescanner

typescanner is a simple library for implementing type guards in TypeScript.

## Install

```shell
npm i -D typescanner
```

## Example

```ts
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

// scanner
const isPost = scanner<Post>({
  id: number,
  author: union(string, Null),
  body: string,
  lang: list(langList),
  isPublic: boolean,
  createdAt: date,
  tags: optional(array(string), Null),
});

// Post[]
const isPosts = array(isPost)

const data1 = {
  id: 1,
  author: "taro",
  body: "Hello!",
  lang: "ja",
  isPublic: true,
  createdAt: new Date(),
  tags: ["tag1", "tag2"],
} as unknown;

const data2 = {
  id: 2,
  author: "jiro",
  body: "Hi!",
  lang: "ja",
  isPublic: true,
  createdAt: new Date(),
} as unknown;

// scan
const post = scan(data1, isPost);
const posts = scan([data1, data2], isPosts);

post.body; // OK

posts.forEach((post) => {
  post.body; // OK
});

```

## Usage

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

### scanner
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
```ts
  // success
  const data = scan(foo, isFoo);
  data.a // OK
  
  // failed
  const data = scan(bar, isFoo); // Error: type assertion is failed.
```

## Contribution

wellcome

## License

MIT
