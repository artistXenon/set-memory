const e_app = require('express')
const api = require('./api')

const app = e_app()
const port = 3003



app.use('/test', api)


app.listen(port, () => console.log('started'))