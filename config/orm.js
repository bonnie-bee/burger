const connection = require("../config/connection");
console.log("In the orm!");

//takes the user input and turns it into question marks for the query
//Loops through the amount of values that the user inputs and creates that many question marks to be put into the query and grab the appropriate number of values inputted 
function printQuestionMarks(num){
    let arr = [];

    //will make the array ["?","?","?"]
    for (let i = 0; i < num; i++){
        arr.push("?")
    }
    
    //turns the array to "?,?,?"
    return arr.toString();
}

//turns object key/value pairs into sql syntax
function objToSql(ob){
    let arr = [];

    //for...in statement to cycle through and grab the properties in the object and set them to a variable
    //in this case the variable is key (similar to i in a for loop)
    for (let key in ob){
        //grabs the value of the property iterated over and sets it to a variable
        let value = ob[key];

        //checks to see if the properties you're iterating over are owned by the object and not inherited
        //if it is one of the object's own properties then it will turn it into a string then push it into the array with its key
        if (Object.hasOwnProperty.call(ob, key)){
//if the value is multiple words with spaces then this puts it into quotes
            if(typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'"
            }
//puts the pairs as equal instead of with colon
            arr.push(key + "=" + value);
        }
    }
//turns the array of keys and values into string (the pairs are separated by commas)
    return arr.toString();
}

const orm  = {
    selectAll: function(tableInput, cb) {
        let queryString = `SELECT * FROM ${tableInput};`;
        // console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function(tableInput, cols, vals, cb) {
        // console.log('orm vals', vals, vals.length)
        let queryString = `INSERT INTO ${tableInput} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)});`;
        // console.log(queryString);
        //need to send vals so can replace question marks
        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function(tableInput, colVals, condition, cb){
        let queryString = `UPDATE ${tableInput} SET ${objToSql(colVals)} WHERE ${condition};`;
        // console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
}

//export the orm module to be used elsewhere
module.exports = orm;