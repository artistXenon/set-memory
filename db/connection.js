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
        const { insertId } = await connection
            .promise()
            .query(
                'INSERT INTO `sets` (elements, case_id) VALUES (?, ?)', 
                [ setElements, caseId ])
        return insertId
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
                'SELECT elements, result, sets.set_id FROM `sets` LEFT JOIN `tests` ON sets.set_id=tests.set_id WHERE case_id=? LIMIT ?', 
                [ caseId, count > 0 ? counts : 10 ]) // TODO: pagination
        return rows        
    }
    catch (e) {
        console.log(e)
        throw new Error('READ ERROR')
    }
}

const deleteSet = async (setId) => {
    try {
        await connection.execute('DELETE FROM `sets` WHERE id=?', [ setId ])
        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}

const readTest = async (caseId, count) => {
    try {
        const [ rows ] = await connection
            .promise()
            .query(
                'SELECT elements, sets.set_id FROM `sets` LEFT JOIN `tests` ON sets.set_id=tests.set_id WHERE case_id=? LIMIT ?', 
                [caseId, count > 0 ? counts : 10]) // TODO: exclude resolved set.
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
                'INSERT INTO `tests` (result, set_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE result=?, set_id=?', 
                [ result, setId, result, setId ])
        return insertId
    }
    catch (e) {
        console.log(e)
        throw new Error('INSERTION ERROR')
    }
//todo: create table tests, update or insert
}

const flushTest = async (setId) => {
    try {
        await connection.execute('DELETE FROM `tests` WHERE set_id=?', [ setId ])
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