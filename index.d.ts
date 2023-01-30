import { FastifyPluginCallback } from 'fastify';
import { PathLike } from 'fs';
import Polyglot from 'node-polyglot';

declare module 'fastify' {
  interface FastifyInstance {
    i18n: Polyglot
  }
}

declare namespace fastifyPolyglot {
  export interface FastifyPolyglotOptions {
    defaultLocale?: string
    locales?: Record<string, PathLike>
    localesPath?: string
  }
}

type FastifyPolyglot = FastifyPluginCallback<fastifyPolyglot.FastifyPolyglotOptions>
declare function fastifyPolyglot(...params: Parameters<FastifyPolyglot>): ReturnType<FastifyPolyglot>
export = fastifyPolyglot