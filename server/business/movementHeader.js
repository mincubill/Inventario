const movementHeaderDao = require("../dao/movementHeaderDao.js");
const movementBodyDao = require("../dao/movementBodyDao.js");
const productDao = require("../dao/productDao.js");

const createMovementHeader = function(req, res){
    let movementHeader = 
    {
        dateBegin: req.body.dateBegin,
        description: req.body.description,
        days: parseInt(req.body.days),
        user: parseInt(req.body.user)
    };
    movementHeaderDao.createMovementHeader(movementHeader).then((success) => {
        if (success == 1)
        {
            movementHeaderDao.getLatestId().then((success) => {
                let movementHeaderId = success;
                let products = req.body.products;
                products.forEach(p => {
                    let movementBody = 
                    {
                        product : p.proId,
                        header: movementHeaderId,
                        quantity: p.quantity
                    }
                    console.log(movementBody);
                    movementBodyDao.createMovementBody(movementBody).then((success) => {
                        
                    }).catch((error) => {
                        console.log(error);
                    });
                   
               });
            }).catch((error) => {
                console.log(error);
            });

        }

        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const changeStatusMovementHeader = function(req, res){
    let movementHeader = 
    {
        id: parseInt(req.body.id),
        status: parseInt(req.body.status)
    };
    console.log(movementHeader)
    movementHeaderDao.changeStatusMovementHeader(movementHeader).then((success) => {
        let movementBody = 
        {
            header: parseInt(req.body.id)
        };
        if(parseInt(req.body.status) == 1)
        {
           
            movementBodyDao.getMovementBodysByHeader(movementBody).then((success) => {
                let movementBodys = success;
                movementBodys.forEach(p => {
                    let product= 
                    {
                        id: p.PRODUCT_M
                    };
                    productDao.getProductById(product).then((success) => {
                            let product = 
                            {
                                id: success[0].ID,
                                quantity: p.QUANTITY
                            };
                            productDao.updateAvailableStockProducts(product).then((success) => {

                            }).catch((error) => {
                                console.log(error);
                            });
                    }).catch((error) => {
                        console.log(error);
                    });
                    
                });
            }).catch((error) => {
                console.log(error);
            });
        }
        else
        {
            movementBodyDao.getMovementBodysByHeader(movementBody).then((success) => {
                let movementBodys = success;
                movementBodys.forEach(p => {
                    let product = 
                    {
                        id: p.PRODUCT_M
                    };
                    productDao.getProductById(product).then((success) => {
                            let product = 
                            {
                                id: success[0].ID,
                                quantity: -p.QUANTITY
                            }
                            productDao.updateAvailableStockProducts(product).then((success) => {

                            }).catch((error) => {
                                console.log(error);
                            });
                    }).catch((error) => {
                        console.log(error);
                    });
                    
                });
                
            }).catch((error) => {
                console.log(error);
            });
        }
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const getMovementHeaders = function(req, res){
    movementHeaderDao.getMovementHeaders().then((success) => {
        console.log(success.toString());
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const getMovementHeadersByUser = function(req, res){
    let movementHeader = 
    {
        user: parserInt(req.body.user),
    };
    movementHeaderDao.getMovementHeadersByUser(movementHeader).then((success) => {
        console.log(success.toString());
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const getMovementHeaderById = function(req, res){
    let movementHeader = 
    {
        id: parserInt(req.body.id),
    };
    movementHeaderDao.getMovementHeaderById(movementHeader).then((success) => {
        console.log(success.toString());
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const getMovementHeaderWithDebt = function(req, res){
    movementHeaderDao.getMovementHeaderWithDebt().then((success) => {
        console.log(success.toString());
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

module.exports.createMovementHeader = createMovementHeader;
module.exports.changeStatusMovementHeader = changeStatusMovementHeader;
module.exports.getMovementHeaders = getMovementHeaders;
module.exports.getMovementHeadersByUser = getMovementHeadersByUser;
module.exports.getMovementHeaderById = getMovementHeaderById;
module.exports.getMovementHeaderWithDebt = getMovementHeaderWithDebt;
