const stadisticsDao = require('../dao/stadisticsDao.js');

const loans = function (req, res) {
    stadisticsDao.loans().then( ( success ) => {
        res.send( success.toString() );
    }).catch( ( error ) => {
        console.log( error )
    });
};

const defaulter = function(req, res) {
    stadisticsDao.defaulter().then( ( success ) => {
        res.send(success.toString());
    }).catch( ( error ) => {
        console.log( error );
    });
};

const getDebts = function(req, res) {
    stadisticsDao.getDebts().then( ( success ) => {
        res.send(success.toString());
    }).catch( ( error ) => {
        console.log( error );
    });
};

module.exports.loans = loans
module.exports.defaulter = defaulter;
module.exports.getDebts = getDebts;