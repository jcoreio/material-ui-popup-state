// @flow

async function asyncScript(run: () => Promise<*>, options?: {exitOnSuccess?: boolean} = {}): Promise<any> {
  try {
    const result = await run()
    if (options.exitOnSuccess !== false) process.exit(0)
    else return result
  } catch (error) {
    console.error(error.stack) // eslint-disable-line no-console
    process.exit(1)
  }
}

export default asyncScript
