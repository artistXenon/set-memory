const mysql = require('mysql2')


const config = /**production */ false ? 
    {
        host: 'localhost',
        user: 'app1',//app1
        password: 'app_pass1',//app_pass1
        database: 'app1'
    } :
    {
        host: '192.168.0.31',
        user: 'app1_test',//app1
        password: 'app_pass_test1',//app_pass1
        database: 'app1_test'
    }

const connection = mysql.createConnection(config)

const createCase = async (name, desc, sets, tests) => {
    try {
        const result = await connection
            .promise()
            .query(
                'INSERT INTO `cases` (name, description, set_json, test_json) VALUES (?, ?, ?, ?)', 
                [ name, desc, sets, tests ])
        return result
    }
    catch (e) {
        console.log(e)
        throw new Error('INSERTION ERROR')
    }
}

const readCases = async () => {
    try {
        const [ rows ] = await connection
            .promise()
            .query('SELECT name, description, set_json, test_json, id FROM `cases`')
            return rows
    }
    catch (e) {
        console.log(e)
        throw new Error('READ ERROR')
    }
}

const deleteCase = async (caseId) => {
    try {
        await connection.execute('DELETE FROM `cases` WHERE id=?', [ caseId ])
        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}

const createSet = async (caseId, setElements) => {
    try {
        const result = await connection
            .promise()
            .query(
                'INSERT INTO `sets` (elements, case_id) VALUES (?, ?)', 
                [ setElements, caseId ])
        return result
    }
    catch (e) {
        console.log(e)
        throw new Error('INSERTION ERROR')
    }
}

const readSets = async (caseId, count) => {
    try {
        const [ rows ] = await connection
            .promise()
            .query(
                'SELECT elements, result, sets.set_id FROM `sets` LEFT JOIN `tests` ON sets.set_id=tests.set_id WHERE case_id=? ORDER BY elements ASC LIMIT ?', 
                [ caseId, count > 0 ? counts : 10 ]) // TODO: pagination review tests in progress
        return rows        
    }
    catch (e) {
        console.log(e)
        throw new Error('READ ERROR')
    }
}

const deleteSet = async (setId) => {
    try {
        await connection.execute('DELETE FROM `sets` WHERE set_id=?', [ setId ])
        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}

const readTest = async (caseId, count) => {
    try {
        const [[{ test_json }]] = await connection
            .promise()
            .query('SELECT test_json FROM `cases` WHERE id=?', [ caseId ])
        const testCount = JSON.parse(test_json).length
        if (isNaN(testCount)) throw new Error('malformatted case')
        const fullResult = (1 << testCount) - 1

        const [ rows ] = await connection
            .promise()
            .query(
                'SELECT elements, sets.set_id, result FROM `sets` LEFT JOIN `tests` ON sets.set_id=tests.set_id WHERE case_id=? AND (result<? OR result IS NULL) LIMIT ?', 
                [caseId, fullResult, count > 0 ? counts : 10]) // TODO: exclude resolved set.
        return rows        
    }
    catch (e) {
        console.log(e)
        throw new Error('READ ERROR')
    }
}

const updateTest = async (setId, result) => {
    try {
        const { insertId } = await connection
            .execute(
                'INSERT INTO `tests` (result, set_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE result= result | ?, set_id=?', 
                [ result, setId, result, setId ])
        return insertId
    }
    catch (e) {
        console.log(e)
        throw new Error('INSERTION ERROR')
    }
}

const flushTest = async (caseId) => {
    try {
        await connection.execute('DELETE `tests` FROM `tests` INNER JOIN `sets` ON sets.set_id=tests.set_id WHERE case_id=?', [ caseId ])
        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}

module.exports = {
    createCase, readCases, deleteCase,
    createSet, readSets, deleteSet,
    readTest, updateTest, flushTest
}