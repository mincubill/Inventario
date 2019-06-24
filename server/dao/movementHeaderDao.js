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
    let query = "select movement_header.ID, movement_header.DATE_BEGIN, movement_header.DAYS, movement_header.USER_M, movement_header.DESCRIPTION ,(select count(movement_body.ID) FROM movement_body where movement_header.ID = movement_body.HEADER) as PRODUCTS, movement_header.DEBT from movement_header where movement_header.STATUS = 0 ORDER BY movement_header.DATE_BEGIN desc";
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

const getMovementHeadersByUser = function(user){
    let query = "select movement_header.ID, movement_header.DATE_BEGIN, movement_header.DAYS, movement_header.USER_M, movement_header.DESCRIPTION ,(select count(movement_body.ID) FROM movement_body where movement_header.ID = movement_body.HEADER) as PRODUCTS, movement_header.DEBT from movement_header where movement_header.STATUS = 0 and movement_header.USER_M = ?";
    return new Promise((resolve, reject) => {
        con.query(query,[user] ,(error, result, fields) => {
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
    let query = "select movement_header.ID, movement_header.DATE_BEGIN, movement_header.DAYS, movement_header.USER_M, movement_header.DESCRIPTION ,(select count(movement_body.ID) FROM movement_body where movement_header.ID = movement_body.HEADER) as PRODUCTS, movement_header.DEBT from movement_header where movement_header.STATUS = 0 and movement_header.ID = ?";
    return new Promise((resolve, reject) => {
        con.query(query,[movementHeader] ,(error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            resolve(result); 
        });
    });
};

const getMovementHeaderWithDebtTop3 = function(){
    let query = "SELECT u.RUT, u.NAME, u.LASTNAME, h.DEBT FROM movement_header h JOIN users u on h.user_m = u.RUT WHERE h.DEBT > 0 and h.STATUS = 0 ORDER BY h.DEBT DESC LIMIT 3";
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

const getMovementHeaderWithDebt = function(){
    let query = "SELECT u.RUT, u.NAME, u.LASTNAME, h.DEBT FROM movement_header h JOIN users u on h.user_m = u.RUT WHERE h.DEBT > 0 and h.STATUS = 0 ";
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
module.exports.getMovementHeaderWithDebtTop3 = getMovementHeaderWithDebtTop3;
module.exports.getMovementHeaderWithDebt = getMovementHeaderWithDebt;
module.exports.getLatestId = getLatestId;
