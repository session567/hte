import { execSync } from 'child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from 'fs'
import { join } from 'path'

const buildDir = 'build/temp'
const outputDir = 'build'
const relevantPaths = ['_locales', 'dist', 'images']

console.log('Building extension')

console.log('Running esbuild build script')
execSync('pnpm build --minify', { stdio: 'inherit' })

console.log(`Creating build directory ${buildDir}/`)
mkdirSync(buildDir, { recursive: true })

console.log('Copying files to build directory')

console.log('  Copying manifest.json')
cpSync('manifest.json', join(buildDir, 'manifest.json'))

const manifest = JSON.parse(readFileSync(join(buildDir, 'manifest.json'), 'utf-8'))
const zipName = `hte-${manifest.version}.zip`

relevantPaths.forEach((path) => {
  if (!existsSync(path)) {
    console.error(`  File or directory ${path} not found`)
    process.exit(1)
  }

  console.log(`  Copying ${path} to ${buildDir}/`)
  cpSync(path, join(buildDir, path), { recursive: true })
})

try {
  console.log('Creating zip archive')
  mkdirSync(outputDir, { recursive: true })
  execSync(`cd ${buildDir} && zip -rq ../${zipName} .`)

  console.log('Running web-ext lint')
  const lintOutput = execSync(`pnpm web-ext lint --source-dir=${join(outputDir, zipName)}`, {
    encoding: 'utf8',
  })

  // Only show output if there are warnings, notices or errors
  if (/(errors|notices|warnings)\s+[1-9]/.test(lintOutput)) {
    console.log(lintOutput)
  }

  console.log('Extension build complete!')
  console.log(`Output: ${join(outputDir, zipName)}`)
} finally {
  console.log('Cleaning up build files')
  console.log(`  Removing ${buildDir}/`)
  rmSync(buildDir, { recursive: true, force: true })
}
