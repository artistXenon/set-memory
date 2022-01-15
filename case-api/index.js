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

r.put('/', async (q, s) => {
    try {
        const name = q.body?.name
        const desc = q.body?.desc ?? ''
        const sets = q.body?.sets
        const tests = q.body?.tests
        if (!name || !sets || !tests) throw new Error('malformatted body')
        const [{ insertId }] = await createCase(name, desc, JSON.stringify(sets), JSON.stringify(tests))
        return s
            .status(200)
            .json({
                result: insertId,
                success: true
            })
    }
    catch (e) {
        return s.status(500).json({
            success: false
        })
    }
})

r.delete('/:id', async (q, s) => {
    try {
        const success = await deleteCase(q.params.id)
        if (!success) throw new Error()
        return s
            .status(200)
            .json({
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