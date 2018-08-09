const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');
console.log("in the controller!")

//main page
router.get('/', function(req, res){
    console.log("main page - all burgers")
    //grabs the info from the all function in burger.js and sends it to be rendered in the handelbars file
    burger.all(function(data){
        // console.log(data);
        const hbsObject = {
            burgers: data
        }
        // console.log(`hbsObject: ${hbsObject}`);
        res.render('index', hbsObject);
    });
});

//burger info - api page 
router.post("/api/burgers", function(req, res){
    console.log("posting burgers api")
    //inputs the parameters for the create function 
    burger.create([
        "burger_name", "devoured"
    ], [ 
        //grabs the info sent in the ajax call of the burger.js file when the create burger button is hit and puts it in as value parameter for the create function
        req.body.name, req.body.devoured
    ], function(result){
        // console.log(result);
        //takes the result of the http request and renders it in json to be displayed on the api page
        res.json({id: result.insertId});
    });
});

router.put("/api/burgers/:id", function(req, res){
    // console.log("req id", req.params.id)
    console.log('updated a burger!');
    const condition = `id = ${req.params.id}`;
    // console.log("condition: ", condition)

    burger.update({
        devoured: 1,
    }, condition, function(result){
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    });
});

module.exports = router