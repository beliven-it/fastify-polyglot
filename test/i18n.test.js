const t = require('tap')
const path = require('path')
const Fastify = require('fastify')
const { ERR_MISSING_DICTIONARY_FOR_DEFAULT_LOCALE } = require('../errors')

function buildFastify (t) {
  const fastify = Fastify({ logger: false })
  t.tearDown(() => fastify.close())
  return fastify
}

t.test('fastify-polyglot', async t => {
  t.test('without options and missing default locales folder', async t => {
    t.plan(1)
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../i18n'))
      t.fail('should throw an error')
    } catch (err) {
      t.true(err, 'should throw an error')
    }
  })

  t.test('with a not existing default locale', async t => {
    t.plan(2)
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../i18n'), {
        defaultLocale: 'jp'
      })
      t.fail('should throw an error')
    } catch (err) {
      t.ok(err, 'should throw an error')
      t.equal(err.message, ERR_MISSING_DICTIONARY_FOR_DEFAULT_LOCALE, 'should notify default locale is not present in locale dictionaries')
    }
  })

  t.test('with an existing locales folder', async t => {
    t.plan(1)
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../i18n'), {
        localesPath: path.join(__dirname, './locales')
      })
      const locales = Object.keys(fastify.i18n.locales)
      t.same(locales, ['en'], 'should load locales from fs')
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('with a not existing locales folder', async t => {
    t.plan(1)
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../i18n'), {
        localesPath: path.join(__dirname, './li18n'),
        locales: {
          en: {
            world: 'World'
          }
        }
      })
      const locales = Object.keys(fastify.i18n.locales)
      t.same(locales, ['en'], 'should use only provided locales without failing')
    } catch (err) {
      console.error(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('with locales from both local and provided dictionaries', async t => {
    t.plan(1)
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../i18n'), {
        localesPath: path.join(__dirname, './locales'),
        locales: {
          it: {
            hi: 'Ciao'
          }
        }
      })
      const locales = Object.keys(fastify.i18n.locales).sort()
      t.same(locales, ['en', 'it'], 'should merge locales')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('with locales from both local and provided dictionaries with the same locale code', async t => {
    t.plan(1)
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../i18n'), {
        localesPath: path.join(__dirname, './locales'),
        locales: {
          en: {
            world: 'World'
          }
        }
      })
      const keys = Object.keys(fastify.i18n.locales.en).sort()
      t.same(keys, ['hi', 'world'], 'should merge dictionaries')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw any error')
    }
  })
})
