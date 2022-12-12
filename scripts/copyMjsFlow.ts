import fs from 'fs/promises'
import { promisify } from 'util'
import path from 'path'
import _glob from 'glob'
const glob = promisify(_glob)

async function go() {
  const files = await glob(
    path.resolve(__dirname, '..', 'src', '**', '*.js.flow')
  )
  await Promise.all(
    files.map(async (src: string) => {
      const dest = path
        .resolve(
          __dirname,
          '..',
          'es',
          path.relative(path.resolve(__dirname, '..', 'src'), src)
        )
        .replace(/\.js.flow$/, '.mjs.flow')
      await fs.copyFile(src, dest)
      // eslint-disable-next-line no-console
      console.log(`${src} -> ${dest}`)
    })
  )
}

go()
