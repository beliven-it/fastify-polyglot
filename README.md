# fastify-polyglot

A plugin to handle i18n using [node-polyglot](https://www.npmjs.com/package/node-polyglot)

[![Node.js CI](https://github.com/beliven-it/fastify-polyglot/actions/workflows/node.js.yml/badge.svg)](https://github.com/beliven-it/fastify-polyglot/actions/workflows/node.js.yml)

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

Alternatively, you can pass a path lo load locales from:

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

[![Beliven](https://assets.beliven.com/brand/logo_pos_color.svg)](https://www.beliven.com)

## License

Licensed under [MIT](./LICENSE)
