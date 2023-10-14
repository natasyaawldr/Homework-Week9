const express = require('express')
const morgan = require('morgan')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const bodyParser = require('body-parser')
const app = express()

const port = 3000
const pool = require('./database/queries')
const movies = require('./controllers/movies')
const users = require('./controllers/users')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title : 'Express API with Swagger',
            version : '0.1.0',
            description :
            'this is a simple CRUD API application made with Express and documented with swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./controllers/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



pool.connect((err, res) => {
  console.log(err);
  console.log('connected');
});

app.use(express.json())
app.use('/movies' , movies)
app.use('/users', users)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(morgan('common'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})