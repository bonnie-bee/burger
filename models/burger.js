const orm = require("../config/orm.js");

//creates the functions that I'll call to pass the info put into the site to the database then send things back to the site
const burger = {
    //will get all the burgers
    all: function(cb){
        orm.selectAll("burgers", function(res){
            cb(res);
        });
    },
    //makes a burger
    create: function (cols, vals, cb){
        orm.insertOne("burgers", cols, vals, function(res) {
            cb(res);
        });
    },
    //updates a burger
    update: function (colVals, condition, cb) {
        orm.updateOne("burgers", colVals, condition, function(res){
            cb(res);
        })
    }
}

module.exports = burger;