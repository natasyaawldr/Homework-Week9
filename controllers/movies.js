const express = require('express');
const router = express.Router();

const pool = require('../database/queries.js');

const verify = require('../middleware/verify.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Movies:
 *       type: object
 *       required: 
 *         - id
 *         - title
 *         - genres
 *         - year
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the movies
 *         title: 
 *           type: string
 *           description: title of the movies
 *         genres: 
 *           type: string
 *           description: genres of the movies
 *         year: 
 *           type: string
 *           description: release year of the movie
 *       example:
 *         id: 100
 *         title: Titanic
 *         genres: Romance
 *         year: 1997
 */

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: The movies managing API
 * /movies:
 *   post:
 *     summary: create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Movies'
 *     responses:
 *       201:
 *         description: The created movie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 * 
 *       500:
 *         description: Some server error
 */


router.get('/', verify, (req, res) => {
    pool.query(`SELECT * FROM movies ${
        req.query.limit ? 'LIMIT ' + req.query.limit : ''
      } `, (err, result) => {
        if(err){
            throw err;
        }
        res.json(result.rows);
    })
});

router.get('/:id',(req, res) => {
    pool.query(`SELECT * FROM movies WHERE id = ${req.params.id}`, (err, result) => {
        if(err){
            throw err;
        }
        res.json(result.rows);
    })
});


router.post('/', (req, res) => {
    const {id,title, genres, year} = req.body;
    const query = {
        text: 'INSERT INTO movies ("id","title", "genres", "year") VALUES ($1, $2, $3, $4) RETURNING *',
        values: [id,title, genres, year],
    };
    pool.query(query,(err, result) => {
        if(err){
            throw error;
        }
        res.status(201).json({
            status : 'success',
            data : result.rows[0],
        });
    });
});

router.put('/:id', (req, res) => {
    const { title } = req.body;
    const { id } = req.params;
    const query = {
      text: 'UPDATE movies SET title = $1 WHERE id = $2',
      values: [title, id],
    };
  
    pool.query(query, (err, results) => {
      if (err) {
        throw error;
      }
      res.status(200).json({
        status: 'success',
      });
    });
  });
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = {
      text: 'DELETE FROM movies WHERE id = $1',
      values: [id],
    };
  
    pool.query(query, (err, results) => {
      if (err) {
        throw error;
      }
      res.status(204).json({
        message: 'success',
      });
    });
  });

  module.exports = router;
  