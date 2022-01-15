const r = require('express').Router()
const { createSet, readSets, deleteSet } = require('../db')


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

r.put('/', (q, s) => {
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
    try {
        const id = await deleteSet(/* TODO: body */)
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

module.exports = r