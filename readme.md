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

### Property by callback

Suppose you have a class, `Car`, whose constructor takes the optional argument `options`.

```js

const _ = require('lodash');

class Car {

    constructor(options) {
        _.defaults(options, {
            engine: new Engine()
        });
        this.engine = options.engine;
    }
}
```

Hold up. See what's happening here? A new instance of `Engine` is created every time the constructor of `Car` is invoked, regardless of whether `options.engine` is provided.
This is not really a problem, until instantiating `Engine` becomes a computationally expensive task.

`defa` deals with this issue.

```js

const defaults = require('defa');

class Car {

    constructor(options) {
        defaults(options, {
            engine: () => new Engine()
        });
        this.engine = options.engine;
    }
}
```

### Object by callback

Suppose the constructor of `Engine` takes an argument, `fuelType`, and you want to modify the constructor of `Car` in a way that you can provide the `fuelType` to the `Car` constructor without have to deal with the `Engine` constructor, and add the same time, you want to maintain the flexibility of being able to override the engine altogether by providing `options.engine`.

```js

const _ = require('lodash');

class Car {

    constructor(options) {
        _.defaults(options, {
            engine: new Engine(options.fuelType ? options.fuelType : 'gasoline')
        });
        this.engine = options.engine;
    }
}
```

This becomes more complex and unreadable as the amount of option parameters increases. If only there were a way to define the default of `fuelType` separately.

```js

const defaults = require('defa');

class Car {

    constructor(options) {
        defaults(options, {
            fuelType: 'gasoline'
        }, options => { return {
            engine: new Engine(options.fuelType)
        }});
        this.engine = options.engine;
    }
}
```

Or the alternative, neater notation:

```js

const defaults = require('defa');

class Car {

    constructor(options) {
        defaults(options, {
            fuelType: 'gasoline'
        }, {
            engine: options => new Engine(options.fuelType)
        });
        this.engine = options.engine;
    }
}
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