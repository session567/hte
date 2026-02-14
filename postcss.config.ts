import autoprefixer from 'autoprefixer'
import postcssFor from 'postcss-for'

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [autoprefixer(), postcssFor()],
}

export default config
