const r = require('express').Router()
const set_api = require('../set-api')

r.put('/:name', (q, s) => {
    //create case
    s.status(200).send('create case')
})

r.get('/:name/:case', (q, s) => {
    //get case
    s.status(200).send('case')
})

r.delete('/:name', (q, s) => {
    //delete case
    s.status(200).send('delete case')
})

r.use('/:name/set', set_api)

module.exports = r