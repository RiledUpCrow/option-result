# option-result [![Build Status](https://travis-ci.org/Co0sh/option-result.svg?branch=master)](https://travis-ci.org/Co0sh/option-result) [![Coverage Status](https://coveralls.io/repos/github/Co0sh/option-result/badge.svg?branch=master)](https://coveralls.io/github/Co0sh/option-result?branch=master) [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/option-result.svg)](https://github.com/Co0sh/option-result) [![npm](https://img.shields.io/npm/v/option-result.svg)](https://www.npmjs.com/package/option-result)

A lightweight JavaScript and TypeScript library with simple Option and Result monads.

## Motivation

Null pointers are considered a [billion dollar mistake](https://www.lucidchart.com/techblog/2015/08/31/the-worst-mistake-of-computer-science/). Because of all the problems they're causing many programming languages were designed specifically without null values, instead implementing various optional types (i.e. Rust or Haskell). Other languages are trying to fix this (like Optional type in Java). Unfortunatelly, we on the web are stuck with not one null, but with two, each having a different use.

This package ports the excellent Option and Result types from the Rust language to JavaScript, in an attempt to remove `null` and `undefined` from your code. ES5 is full of function returning `undefined`, `NaN`s, invalid `Date` objects etc. and wrapping everything with Options and Results would be
too cumbersome. Still, you can benefit from using these monads in your own functions.

## Getting started

### Prerequisites

You need to have **node** and **npm** installed on your system.

### Installation

Run this command inside your project:

```
npm i -S option-result
```

And then import the types in your code:

```js
const { Option, Result } = require('option-result');
// or
import { Option, Result } from 'option-result';
```

## Usage

> Examples here are using Typescript (highly recommended). If you're using vanilla JS simply skip type declarations and generic type arguments.

The package contains two types: **`Option`** and **`Result`**. Each has static methods used for creating new instances:

```ts
// contains a string
const foo = Option.some('foo');

// type necessary to signal which type the value would be
const bar = Option.none<string>();

// error is by default of type Error
const baz = Result.ok('baz');

// again, type here is necessary to signal value type
const qux = Result.err<string>(new Error('baz is missing'));
```

### `Option`

Option represents a value which may not be present, for example a first value of an array of unknown size. It provides utility methods to generate a default value, run code if a value exist, perfomr checks on it etc.

```ts
// convert first number in the array to a string if it's odd, or use 'unknown'
const result = Option.wrap(numbers[0])
  .if(n => n % 2 === 1)
  .map(String)
  .or('unknown');
```

Option is best used as a return type of a function which would otherwise return `null` or `undefined` - this way you can explicitly signal that the return value may not be present and the developer needs to handle this case.

The general consensus is that you should avoid using Option types in function arguments and instead compose your functions so they only take existing values or no values at all.

### `Result`

Result represents an outcome of an opertaion which can fail recoverably, like file reading, network call, data parsing etc. It holds either the resulting value of that operation or an error value. It provides utility method for working with both.

```ts
function parseIntBetter(int: string): Result<number, string> {
  const value = parseInt(int, 10);
  return isNaN(value) ? Result.err('Parsing error') : Result.ok(value);
}

const result = parseIntBetter('foo').map(int => int * 100);

result.ok().map(successAction);
result.err().map(errorAction);
```

It's less interesting than Option but can be converted to one as shown above.

## Development

Clone the repository and install dependencies:

```
git clone https://github.com/Co0sh/option-result.git
cd option-result
npm i
```

You can build the package with this command. The files will appear in `./dist` directory.

```
npm run build
```

The project is fully covered by unit tests. You can also generate coverage report:

```
npm run coverage
```

Quality of code is ensured by TSLint. You can check the project for errors with:

```
npm run lint
```

And the code style is enforced by Prettier. No code formatted differently can be merged with _master_ branch.

```
npm run format
```

Feel free to submit pull requests but try to keep the size of the compiled code to minimum.

## License

The project is licensed under the ISC license - see the [License](./LICENSE) file for details.

## Acknowledgments

- Rust language team, source of inspiration for this package
