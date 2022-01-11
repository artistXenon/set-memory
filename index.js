const e_app = require('express')
const case_api = require('./case-api')

const app = e_app()
const port = 3003


app.use('/', (q, s) => {
    s.status(200).send('😇')
})
app.use('/case', case_api)


app.use((e, q, s, n) => {
    console.log(e)
    s.status(500).send('')
})

app.listen(port, () => console.log('started'))