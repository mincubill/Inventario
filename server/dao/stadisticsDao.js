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

module.exports.loans = loans;
module.exports.defaulter = defaulter;