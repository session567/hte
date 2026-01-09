import esbuild from 'esbuild'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

const args = process.argv.slice(2)
const has = (flag) => args.includes(flag)

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  outbase: 'src',
  target: ['firefox115', 'chrome120'],
  minify: has('--minify'),
  define: {
    __VERSION__: JSON.stringify(pkg.version),
  },
})
