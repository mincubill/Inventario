const con = require("../dao/connection.js");

const createMovementHeader = function(movementHeader){
    let query = "select FN_CREATE_MOVEMENT_HEADER(?,?,?,?)";
    return new Promise((resolve, reject) => {
        con.query(query, [movementHeader.dateBegin,movementHeader.description,movementHeader.days,movementHeader.user], (error, result, fields) => {
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

const changeStatusMovementHeader = function(movementHeader){
    let query = "select FN_CHANGE_STATUS_MOVEMENT_HEADER(?,?)";
    return new Promise((resolve, reject) => {
        con.query(query, [movementHeader.id,movementHeader.status], (error, result, fields) => {
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

const getMovementHeaders = function(){
    let query = "SELECT * FROM MOVEMENT_HEADER";
    return new Promise((resolve, reject) => {
        con.query(query, (error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            resolve(result); 
        });
    });
};

const getLatestId = function(){
    let query = "SELECT MAX(ID) FROM MOVEMENT_HEADER";
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

const getMovementHeadersByUser = function(movementHeader){
    let query = "SELECT * FROM MOVEMENT_HEADER WHERE USER_M = ?";
    return new Promise((resolve, reject) => {
        con.query(query,[movementHeader.user] ,(error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            resolve(result); 
        });
    });
};

const getMovementHeaderById = function(movementHeader){
    let query = "SELECT * FROM MOVEMENT_HEADER WHERE ID = ?";
    return new Promise((resolve, reject) => {
        con.query(query,[movementHeader.id] ,(error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            resolve(result); 
        });
    });
};

const getMovementHeaderWithDebt = function(){
    let query = "SELECT * FROM MOVEMENT_HEADER WHERE DEBT > 0";
    return new Promise((resolve, reject) => {
        con.query(query,(error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            resolve(result); 
        });
    });
};
module.exports.createMovementHeader = createMovementHeader;
module.exports.changeStatusMovementHeader = changeStatusMovementHeader;
module.exports.getMovementHeaders = getMovementHeaders;
module.exports.getMovementHeadersByUser = getMovementHeadersByUser;
module.exports.getMovementHeaderById = getMovementHeaderById;
module.exports.getMovementHeaderWithDebt = getMovementHeaderWithDebt;
module.exports.getLatestId = getLatestId;
