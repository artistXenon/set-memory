// get the client
const { readSets, readCases } = require('.')


// with placeholder
;(async () => {
  try {
      console.log(await readCases())
  }
  catch (e) {
      console.log(e)
  }
  finally { process.exit(0) }
})()