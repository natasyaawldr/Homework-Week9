const { response } = require('express')

const Pool = require('pg').Pool;

const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'Movies',
    password: '1234567',
    port : 5432,
})

module.exports = pool
