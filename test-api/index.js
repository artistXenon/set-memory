const r = require('express').Router()
const { updateTest, flushTest } = require('../db')


r.get('/', (q, s) => {
    //query test size
    try {
        const rows = await readSets(/* TODO: case id */)
        return s
            .status(200)
            .json({
                result: rows,
                success: true
            })
    }
    catch (e) {
        return s.status(500).json({
            success: false
        })
    }
})

r.put('/:setId', (q, s) => {
    try {
        const id = await createSet(/* TODO: body */)
        return s
            .status(200)
            .json({
                result: id,
                success: true
            })
    }
    catch (e) {
        return s.status(500).json({
            success: false
        })
    }
})

r.delete('/:id', (q, s) => {
    //deleteSet
    s.status(200).send('delete set')
})

module.exports = r