import { execSync } from 'child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from 'fs'
import { join } from 'path'

// Parse command line arguments
const args = process.argv.slice(2)
const browserArg = args.find((arg) => arg.startsWith('--browser='))
const browser = browserArg ? browserArg.split('=')[1] : 'firefox'

if (!['firefox', 'chrome'].includes(browser)) {
  console.error(`Invalid browser: ${browser}. Must be 'firefox' or 'chrome'`)
  process.exit(1)
}

// Browser-specific config
const config = {
  firefox: {
    manifest: 'manifest-v2.json',
    outputDir: 'builds/firefox',
    lint: true,
  },
  chrome: {
    manifest: 'manifest-v3.json',
    outputDir: 'builds/chrome',
    lint: false,
  },
}

const buildDir = 'builds/temp'
const outputDir = config[browser].outputDir
const manifestFile = config[browser].manifest
const relevantPaths = ['_locales', 'dist', 'icons']

console.log(`Building ${browser} extension`)

console.log('Running esbuild build script')
execSync('pnpm build --minify', { stdio: 'inherit' })

console.log(`Creating build directory ${buildDir}/`)
mkdirSync(buildDir, { recursive: true })

console.log('Copying files to build directory')

console.log(`  Copying ${manifestFile} as manifest.json`)
cpSync(manifestFile, join(buildDir, 'manifest.json'))

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
  execSync(`cd ${buildDir} && zip -rq ../${join(outputDir.split('/')[1], zipName)} .`)

  if (config[browser].lint) {
    console.log('Running web-ext lint')
    const lintOutput = execSync(`pnpm web-ext lint --source-dir=${join(outputDir, zipName)}`, {
      encoding: 'utf8',
    })

    // Only show output if there are warnings, notices or errors
    if (/(errors|notices|warnings)\s+[1-9]/.test(lintOutput)) {
      console.log(lintOutput)
    }
  }

  console.log(`${browser} extension build complete!`)
  console.log(`Output: ${join(outputDir, zipName)}`)
} finally {
  console.log('Cleaning up build files')
  console.log(`  Removing ${buildDir}/`)
  rmSync(buildDir, { recursive: true, force: true })
}
