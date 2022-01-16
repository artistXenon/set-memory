const r = require('express').Router()
const { createSet, readSets, deleteSet } = require('../db')


r.get('/', async (q, s) => {
    try {
        const caseId = q.caseId
        if (!caseId) throw new Error('malformatted body')
        const elements = await readSets(caseId)
        return s
            .status(200)
            .json({
                result: elements,
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
        const caseId = q.caseId
        const elements = q.body?.elements
        if (!caseId || !elements) throw new Error('malformatted body')
        //TODO: check if element is well formatted based on set info from case
        const [{ insertId }] = await createSet(caseId, JSON.stringify(elements))
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