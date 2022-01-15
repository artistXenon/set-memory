const r = require('express').Router()
const set_api = require('../set-api')
const { createCase, readCases, deleteCase } = require('../db')


r.get('/', (q, s) => {
    //readCases
    s.status(200).send('case')
})

r.put('/:id', (q, s) => {
    //createCase
    s.status(200).send('create case')
})

r.delete('/:id', (q, s) => {
    //deleteCase
    s.status(200).send('delete case')
})

r.use('/:caseId/set', set_api)

module.exports = r