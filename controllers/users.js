const express = require('express');
const router = express.Router();
const { generateToken } = require('../helper/authorized');


const pool = require('../database/queries.js');

router.post('/login', (req, res) => {
    const {email,password} = req.body 
    const query = "SELECT * FROM users WHERE email=$1 AND password=$2";
    pool.query(query, [email,password], (err,result) => {
        if(err){
            throw error;
        } else {
            const token = generateToken(result.rows[0]);
            res.json({
                token: token, 
            })
        }
    })
});

router.post('/register', (req, res) => {
    const { id,email,gender,password,role} = req.body;

    const query = "INSERT INTO users (id,email,gender,password,role) VALUES ($1, $2) LIMIT 10 OFFSET 10";

    pool.query(query, [id,email,gender,password,role], (err, result) => {
        if(err){
            throw error;
        } 
        return res.json(result); 
    })
});

module.exports = router;
