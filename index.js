const e_app = require('express')
const bodyParser = require('body-parser')
const case_api = require('./case-api')

const app = e_app()
const port = 3003

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/cases', case_api)

app.use('/', (q, s) => {
    s.status(200).send('😇')
})


app.use((e, q, s, n) => {
    console.log(e)
    s.status(500).send('')
})

app.listen(port, () => console.log('started'))