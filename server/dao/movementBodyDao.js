const con = require("../dao/connection.js");

const createMovementBody = function(movementBody){
    let query = "select FN_CREATE_MOVEMENT_BODY(?,?)";
    return new Promise((resolve, reject) => {
        con.query(query, [movementBody.product,movementBody.header], (error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            let keys = Object.keys(result[0]);
            resolve(result[0][keys[0]]); 
        });
    });
};

const getMovementBodys = function(){
    let query = "SELECT * FROM MOVEMENT_BODY";
    return new Promise((resolve, reject) => {
        con.query(query, (error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            let keys = Object.keys(result[0]);
            resolve(result[0][keys[0]]); 
        });
    });
};

const getMovementBodysByHeader = function(movementBody){
    let query = "SELECT * FROM MOVEMENT_BODY WHERE HEADER = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [movementBody.product,movementBody.header], (error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            let keys = Object.keys(result[0]);
            resolve(result[0][keys[0]]); 
        });
    });
};

module.exports.createMovementBody = createMovementBody;
module.exports.getMovementBodysByHeader = getMovementBodysByHeader;
module.exports.getMovementBodys = getMovementBodys;



