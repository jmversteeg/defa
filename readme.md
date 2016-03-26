# defa

> like `_.defaults` but with support for callbacks

[![Build Status][travis-image]][travis-url]
[![Code Quality][codeclimate-image]][codeclimate-url]
[![Code Coverage][coveralls-image]][coveralls-url]
[![NPM Version][npm-image]][npm-url]

Assigns own and inherited enumerable properties of source objects to the
destination object for all destination properties that resolve to `undefined`.
Source objects are applied from left to right. Once a property is set,
additional values of the same property are ignored.

A function can be given instead of a source object, it will be invoked with the destination object at the
current iteration. A source object is expected to be returned.
A function can also be given for any of the property values on the source object and it will only be invoked if
the destination property resolves to `undefined`.

## Install

```
$ npm install --save defa
```


## Usage

```js
const defa = require('defa');

defa({
   foo: 'bar'
}, obj => {
   return {
      bar: () => obj.foo + 'baz'
   };
});

// => {foo: 'bar', bar: 'barbaz'}
```


## License

MIT © [JM Versteeg](http://github.com/jmversteeg)

[![dependency Status][david-image]][david-url]
[![devDependency Status][david-dev-image]][david-dev-url]

[travis-image]: https://img.shields.io/travis/jmversteeg/defa.svg?style=flat-square
[travis-url]: https://travis-ci.org/jmversteeg/defa

[codeclimate-image]: https://img.shields.io/codeclimate/github/jmversteeg/defa.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/jmversteeg/defa

[david-image]: https://img.shields.io/david/jmversteeg/defa.svg?style=flat-square
[david-url]: https://david-dm.org/jmversteeg/defa

[david-dev-image]: https://img.shields.io/david/dev/jmversteeg/defa.svg?style=flat-square
[david-dev-url]: https://david-dm.org/jmversteeg/defa#info=devDependencies

[coveralls-image]: https://img.shields.io/coveralls/jmversteeg/defa.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/jmversteeg/defa

[npm-image]: https://img.shields.io/npm/v/defa.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/defa