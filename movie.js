var express = require('express');
var router = express.Router();
var movies = [
    {id : 101, name: "Fight Club", year: 1999, rating: 8.1},
    {id : 102, name: "Inception", year: 2010, rating: 8.7},
    {id : 103, name: "The Dark Knight", year: 2008, rating: 9},
    {id : 104, name: "12 Angry Men", year: 1957, rating: 8.9},

];


router.get('/:id([0-9]{3,})', function (req,res) {
    var currMovie = movies.filter(function(movie) {
        if(movie.id == req.params.id) {
            return true;
        }
    });

    if (currMovie.length == 1) {
        res.json(currMovie[0]);

    } else {
        res.status(404); //set status to 404 as movie was not found
        res.json({message : 'Not Found'});
    }

});

router.post('/', function(req,res){
    //check if all fields are provided and are valid:
    if(
        !req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)
    ) {
        res.status(400);
        res.json({message: 'Bad Request'});
    } else {
        var newId = movies[movies.length - 1].id + 1;
        movies.push({
            id : newId, 
        })
    }
})

router.put('/:id' , function(req,res){
    //check if all fields are provided and are valid
    if(!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
        !req.params.id.toString().match(/^[0-9]{3,}$/g)){

            res.status(400);
            res.json({message: "Bad Request"});

        } else {
            // Get us the index of movie with given id
            var updateIndex = movies.map(function(movie){
                return movie.id;
            }).indexOf(parseInt(req.params.id));

            if(updateIndex === -1){
                //Movie not found, create new
                movies.push({
                    id: req.params.id,
                    name: req.params.name,
                    year: req.params.year,
                    rating: req.params.rating
                });
                res.json({message: "New Movie created" , location: "/movies/" + req.params.id});

            } else {
                //update existing movie
                movies[updateIndex] = {
                    id : req.params.id,
                    name: req.params.name,
                    year: req.params.year,
                    rating: req.param.rating
                };
                res.json({message: "Movie id " + req.params.id + " updated", 
                location: "/movies" + req.params.id});
            }
        }
});

router.delete('/:id', function(req,res){
    var removeIndex = movies.map(function(movie){
        return movie.id; 
    }).indexOf(req.params.id); //Gets us the indexof movie with given id.

    if(removeIndex === -1){
        res.json({message: "Not found"});
    } else {
        movie.splice(removeIndex, 1);
        res.send({message: "Movie Id " + req.params.id + " removed."});
    }
});

//Routers will go here
module.exports = router; 