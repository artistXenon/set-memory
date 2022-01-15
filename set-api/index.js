const r = require('express').Router()
const { createSet, readSets, deleteSet } = require('../db')


r.get('/', (q, s) => {
    //readSets
    s.status(200).send('case')
})

r.put('/:setId', (q, s) => {
    //createSet
    s.status(200).send('create set')
})

r.delete('/:id', (q, s) => {
    //deleteSet
    s.status(200).send('delete set')
})

module.exports = r