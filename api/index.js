const r = require('express').Router()

r.get('/list', (q, s) => {
    s.status(200).send('lisst')
})


module.exports = r