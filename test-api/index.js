const r = require('express').Router()
const { readTest, updateTest, flushTest } = require('../db')


r.get('/', async (q, s) => {
    try {
        const caseId = q.caseId
        const count = q.query?.count
        if (!caseId) throw new Error('malformatted body')
        const rows = await readTest(caseId, count)
        for (const row of rows) row.elements = JSON.parse(row.elements)
        
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

r.post('/:setId', async (q, s) => {
    try {
        const setId = q.params?.setId
        const result = q.body?.result
        if (!setId || !result) throw new Error('malformatted body')
        await updateTest(setId, result)
        return s
            .status(200)
            .json({ success: true })
    }
    catch (e) {
        console.log(e)
        return s
            .status(500)
            .json({ success: false })
    }
})

r.delete('/', async (q, s) => {
    try {
        const caseId = q.caseId
        if (!caseId) throw new Error('malformatted body')
        await flushTest(caseId)
        return s
            .status(200)
            .json({ success: true })
    }
    catch (e) {
        return s
            .status(500)
            .json({ success: false })
    }
})

module.exports = r