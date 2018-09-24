# stream-option [![Build Status](https://travis-ci.org/Co0sh/stream-option.svg?branch=master)](https://travis-ci.org/Co0sh/stream-option) [![Coverage Status](https://coveralls.io/repos/github/Co0sh/stream-option/badge.svg)](https://coveralls.io/github/Co0sh/stream-option)

A JavaScript library with Option and Result monads and an iterable API similar to the Java 8 Stream API.

## Motivation

Null pointers are considered a [billion dollar mistake](https://www.lucidchart.com/techblog/2015/08/31/the-worst-mistake-of-computer-science/). Because of all the problems they're causing many programming languages were designed specifically withoud null values, instead implementing various optional types (i.e. Rust or Haskell). Other languages are trying to fix this (i.e. Optional type in Java). Unfortunatelly, we on the web are stuck not with one null, but with two, each having a different use.

This package ports the excellent Option and Result types from the Rust language to JavaScript, in a futile attempt to remove `null` and `undefined` from your code. Unfortunatelly, ES5 is full of function returning `undefined`, `NaN`s, invalid `Date` objects etc. Wrapping everything with Options ans Results would be
too cumbersome, not mentioning the bundle size on the frontend. Still, you can benefit from using these in your own functions.

One other thing that is only partially available in JavaScript and would make a huge difference is an API allowing lazy operations on iterables, similar to the ones existing in most functional languages. This package aims to provide the most necessary functions, based on Java 8 Stream API.
