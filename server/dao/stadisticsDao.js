const con = require('./connection.js');

const loans = function () {
    let query = "select count(movement_header.ID) as COUNT_LOANS from movement_header where movement_header.STATUS = 0";
    return new Promise( ( resolve, reject ) => {
        con.query( query, ( error, result, fields ) => {
            if( error ) {
                console.log( error );
                reject( error );
                return;
            }
            let keys = Object.keys(result[0]);
            resolve(result[0][keys[0]]); 
        });
    });
};


const defaulter = function () {
    let query = "select count(movement_header.ID) from movement_header where movement_header.DEBT > 0 and movement_header.STATUS = 0";
    return new Promise( (resolve, reject ) => {
        con.query( query, ( error, result, fields ) => {
            if( error ) {
                console.log( error );
                reject( error );
                return;
            }
            let keys = Object.keys(result[0]);
            resolve(result[0][keys[0]]); 
        });
    });
};

const getDebts = function () {
    let query = "SELECT u.RUT, u.NAME, u.LASTNAME, h.DEBT FROM movement_header h JOIN users u on h.user_m = u.RUT WHERE DEBT > 0 ";
    return new Promise((resolve, reject) => {
        con.query(query,(error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            resolve(result);
            console.log(result);
        });
    });
};

module.exports.loans = loans;
module.exports.defaulter = defaulter;
module.exports.getDebts = getDebts;