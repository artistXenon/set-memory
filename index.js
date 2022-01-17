const e_app = require('express')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')
const case_api = require('./case-api')

const app = e_app()
const port = 3003

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(history())
app.use('/api/cases', case_api)

app.use('/', e_app.static('./vue/dist'))


app.use((e, q, s, n) => {
    console.log(e)
    s.status(500).send('')
})

app.listen(port, _ => console.log('started: ' + port))