const r = require('express').Router()
const set_api = require('../set-api')
const test_api = require('../test-api')
const { createCase, readCases, deleteCase } = require('../db')


r.get('/', async (q, s) => {
    try {
        const rows = await readCases()
        return s
            .status(200)
            .json({
                result: rows,
                success: true
            })
    }
    catch (e) {
        return s
            .status(500)
            .json({
                success: false
            })
    }
})

r.put('/', (q, s) => {
    try {
        const id = await createCase(/* TODO: body */)
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
        const id = await deleteCase(/* TODO: body */)
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

r.use('/:caseId/set', set_api)
r.use('/:caseId/test', test_api)

module.exports = r