# fastify-polyglot

A plugin to handle i18n using [node-polyglot](https://www.npmjs.com/package/node-polyglot)

![Node.js CI](https://github.com/heply/fastify-polyglot/workflows/Node.js%20CI/badge.svg)

## Install

```bash
$ npm i --save fastify-polyglot
```

## Usage

```js
const path = require('path')

fastify.register(require('fastify-polyglot'), {
  defaultLocale: 'it',
  locales: {
    it: require(path.join(__dirname, './locales/it'))
  }
})

console.log(fastify.i18n.t('Hello!'))

// 'Ciao!'
```

Alternatively, ypou can pass a path lo load locales from:

```js
const path = require('path')

fastify.register(require('fastify-polyglot'), {
  defaultLocale: 'it',
  localesPath: path.join(__dirname, './locales')
})
```

## Options

| Name               | Description                                                                             |
|--------------------|-----------------------------------------------------------------------------------------|
| `defaultLocale`    |  The default locale code to be used (`en` by default).                                  |
| `localesPath`      |  The folder from where to load locale dictionaries (`./locales` by default).            |
| `locales`          |  A map of locales, where keys are locale codes and values are translation dictionaries. |

**NOTE:** if both `localesPath` and `locales` are passed, dictionaries will be merged together.

## Test

```bash
$ npm test
```

## Acknowledgements

This project is kindly sponsored by:

[![heply](https://raw.githack.com/heply/brand/master/heply-logo.svg)](https://www.heply.it)

## License

Licensed under [MIT](./LICENSE)
