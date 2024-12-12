//@ts-check

import { join } from 'node:path'
import process from 'node:process'
import * as esbuild from 'esbuild'
import svgr from 'esbuild-plugin-svgr'

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: [join(import.meta.dirname, 'src', '**')],
  format: 'esm',
  logLevel: 'info',
  outdir: 'dist',
  sourceRoot: join(import.meta.dirname, 'src'),
  sourcemap: true,
  plugins: [
    svgr({
      titleProp: true,
      ref: true,
      svgo: true,
      exportType: 'default',
    }),
  ],
}

if (process.argv.includes('--watch')) {
  const ctx = await esbuild.context(options)
  await ctx.watch()
} else {
  await esbuild.build(options)
}
