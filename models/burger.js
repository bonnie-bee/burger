const orm = require("../config/orm.js");
console.log("in the models!")

//creates the functions that I'll call to pass the info put into the site to the database then send things back to the site
const burger = {
    //will get all the burgers
    all: function(cb){
        orm.selectAll("burgers", function(res){
            cb(res);
            // console.log('model result: ', res)
        });
    },
    //makes a burger
    create: function (cols, vals, cb){
        // console.log("model console cols and vals: ", cols, vals)
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