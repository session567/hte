import esbuild from 'esbuild'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  outbase: 'src',
  target: ['firefox115', 'chrome120'],
  define: {
    __VERSION__: JSON.stringify(pkg.version),
  },
})
