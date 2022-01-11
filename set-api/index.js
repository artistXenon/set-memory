const r = require('express').Router()


r.put('/:id', (q, s) => {
    //create case
    s.status(200).send('create set')
})

r.get('/:id', (q, s) => {
    //get case
    s.status(200).send('case')
})

r.delete('/:id', (q, s) => {
    //delete case
    s.status(200).send('delete set')
})

module.exports = r