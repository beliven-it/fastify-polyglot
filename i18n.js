'use strict'

const path = require('path')
const { readdirSync } = require('fs')
const fp = require('fastify-plugin')
const Polyglot = require('node-polyglot')
const {
  ERR_MISSING_DICTIONARY_FOR_DEFAULT_LOCALE
} = require('./errors')

module.exports = fp(function (fastify, opts, next) {
  const getLocales = basepath => {
    let contents = []
    try {
      contents = readdirSync(basepath, { withFileTypes: true })
    } catch (err) {
      fastify.log.warn(err)
    }
    return contents
      .filter(entry => entry.isFile())
      .reduce((locales, entry) => {
        const name = entry.name.replace(/\.[^/.]+$/, '')
        const pathname = path.join(basepath, name)
        locales[name] = require(pathname)
        return locales
      }, {})
  }

  const mergeLocales = (a = {}, b = {}) => {
    const locales = { ...a }
    Object.keys(b).forEach(key => {
      locales[key] = {
        ...a[key],
        ...b[key]
      }
    })
    return locales
  }

  const defaultLocale = opts.defaultLocale || 'en'
  const localesPath = opts.localesPath || './locales'
  const loadedLocales = getLocales(localesPath)
  const locales = mergeLocales(opts.locales, loadedLocales)

  if (Object.keys(locales).indexOf(defaultLocale) === -1) {
    next(new Error(ERR_MISSING_DICTIONARY_FOR_DEFAULT_LOCALE))
  }

  const i18n = new Polyglot({
    phrases: locales[defaultLocale],
    locale: defaultLocale
  })

  i18n.locales = locales
  i18n.defaultLocale = defaultLocale

  fastify.decorate('i18n', i18n)

  next()
})
