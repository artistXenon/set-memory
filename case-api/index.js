const r = require('express').Router()
const set_api = require('../set-api')
const test_api = require('../test-api')
const { createCase, readCases, deleteCase } = require('../db')


r.get('/', async (q, s) => {
    try {
        const rows = await readCases()
        for (const row of rows) {
            row.set_json = JSON.parse(row.set_json)
            row.test_json = JSON.parse(row.test_json)
        }
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
            .json({ success: false })
    }
})

r.post('/', async (q, s) => {
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
        return s
            .status(500)
            .json({ success: false })
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
        return s
            .status(500)
            .json({ success: false })
    }
})

r.use('/:caseId/sets', (q, s, n) => {
    q.caseId = q.params.caseId
    return set_api(q, s, n)
})

r.use('/:caseId/tests', (q, s, n) => {
    q.caseId = q.params.caseId
    return test_api(q, s, n)
})

module.exports = r