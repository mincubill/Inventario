const movementBodyDao = require("../dao/movementBodyDao.js");

const createMovementBody = function(req, res){
    let movementBody = 
    {
        header: parseInt(req.body.header),
        product: parseInt(req.body.product)   
    };
    movementBodyDao.createMovementBody(movementBody).then((success) => {
        console.log(success.toString());
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const getMovementBodys = function(req, res){
    movementBodyDao.getMovementBodys().then((success) => {
        console.log(success.toString());
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const getMovementBodysByHeader = function(req, res){
    let movementBody =
    {
        header: parseInt(req.body.header)
    }
    movementBodyDao.getMovementBodysByHeader(movementBody).then((success) => {
        console.log(success.toString());
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};




module.exports.createMovementBody = createMovementBody;
module.exports.getMovementBodysByHeader = getMovementBodysByHeader;
module.exports.getMovementBodys = getMovementBodys;
