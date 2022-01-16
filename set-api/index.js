const r = require('express').Router()
const { createSet, readSets, deleteSet } = require('../db')


r.get('/', async (q, s) => {
    try {
        const caseId = q.params?.caseId
        if (!caseId) throw new Error('malformatted body')
        const rows = await readSets(caseId)
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

r.put('/', async (q, s) => {
    try {
        const caseId = q.params?.caseId
        const elements = q.body?.elements
        if (!caseId || !elements) throw new Error('malformatted body')
        const id = await createSet(caseId, elements)
        return s
            .status(200)
            .json({
                result: id,
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
        await deleteSet(q.params.id)
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