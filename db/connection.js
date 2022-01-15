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

const createCase = async (name, desc, set) => {
    try {
        const { insertId } = await connection
            .execute(
                'INSERT INTO `cases` (name, description, set_json) VALUES (?, ?, ?)', 
                [ name, desc, set ])
        return insertId
    }
    catch (e) {
        console.log(e)
        throw new Error('INSERTION ERROR')
    }
}

const readCases = () => {
    try {
        const [ rows ] = await connection
            .promise()
            .query('SELECT name, description, set_json, id FROM `cases`')
            return rows
    }
    catch (e) {
        console.log(e)
        throw new Error('READ ERROR')
    }
}

const deleteCase = async (caseId) => {
    try {
        await connection
            .execute('DELETE FROM `cases` WHERE id=?', [ caseId ])
        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}

const createSet = (setId, setElements) => {
    try {
        const { insertId } = await connection
            .execute(
                'INSERT INTO `sets` (elements, set_id) VALUES (?, ?)', 
                [ setElements, setId ])
        return insertId
    }
    catch (e) {
        console.log(e)
        throw new Error('INSERTION ERROR')
    }
}

const readSets = (caseId, count) => {
    try {
        if (count > 0) {
            const [ rows ] = await connection
                .promise()
                .query('SELECT elements, set_id FROM `sets` WHERE case_id=? LIMIT ?', [caseId, count]) // generate test. TODO: exclude resolved set.
            return rows
        }
        else {
            const [ rows ] = await connection
                .promise()
                .query('SELECT elements, set_id FROM `sets` WHERE case_id=?', [caseId]) // generate test. TODO: exclude resolved set.
            return rows
        }
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

const updateTest = (setId, result) => {
    try {
        const { insertId } = await connection
            .execute(
                'INSERT INTO `tests` (result, set_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE result=?, set_id=?', 
                [result, setId, result, setId])
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
    updateTest, flushTest
}