# option-result [![Build Status](https://travis-ci.org/Co0sh/option-result.svg?branch=master)](https://travis-ci.org/Co0sh/option-result) [![Coverage Status](https://coveralls.io/repos/github/Co0sh/option-result/badge.svg?branch=master)](https://coveralls.io/github/Co0sh/option-result?branch=master)

A lightweight JavaScript and TypeScript library with simple Option and Result monads.

## Motivation

Null pointers are considered a [billion dollar mistake](https://www.lucidchart.com/techblog/2015/08/31/the-worst-mistake-of-computer-science/). Because of all the problems they're causing many programming languages were designed specifically without null values, instead implementing various optional types (i.e. Rust or Haskell). Other languages are trying to fix this (like Optional type in Java). Unfortunatelly, we on the web are stuck with not one null, but with two, each having a different use.

This package ports the excellent Option and Result types from the Rust language to JavaScript, in an attempt to remove `null` and `undefined` from your code. ES5 is full of function returning `undefined`, `NaN`s, invalid `Date` objects etc. and wrapping everything with Options ans Results would be
too cumbersome. Still, you can benefit from using these monads in your own functions.
