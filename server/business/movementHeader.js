const movementHeaderDao = require("../dao/movementHeaderDao.js");
const movementBodyDao = require("../dao/movementBodyDao.js");
const userDao = require("../dao/userDao.js");
const productDao = require("../dao/productDao.js");
const mailer = require("../business/mailer");

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
                    movementBodyDao.createMovementBody(movementBody).then((success) => {
                        
                    }).catch((error) => {
                        console.log(error);
                    });  
               });
               let user = 
               {
                    rut : movementHeader.user
               };
               userDao.getUserByRut(user).then((success) => {
                   let mail = {
                       mail: success.MAIL,
                       name: success.NAME,
                       code: zfill(movementHeaderId,9)
                   }
                    mailer.sendEmail(mail);
               }).catch((error) => {

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
        res.send(success);
    }).catch((error) => {
        console.log(error);
    });
};

const getMovementHeadersByUser = function(req, res){
    let user = parseInt(req.body.user);
    movementHeaderDao.getMovementHeadersByUser(user).then((success) => {
        res.send(success);
    }).catch((error) => {
        console.log(error);
    });
};

const getMovementHeaderById = function(req, res){
    let idMovementHeader = parseInt(req.body.idMovementHeader);
    movementHeaderDao.getMovementHeaderById(idMovementHeader).then((success) => {
        res.send(success);
    }).catch((error) => {
        console.log(error);
    });
};

const getMovementHeaderWithDebt = function(req, res){
    movementHeaderDao.getMovementHeaderWithDebt().then((success) => {
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};


let  zfill = function (number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}
module.exports.createMovementHeader = createMovementHeader;
module.exports.changeStatusMovementHeader = changeStatusMovementHeader;
module.exports.getMovementHeaders = getMovementHeaders;
module.exports.getMovementHeadersByUser = getMovementHeadersByUser;
module.exports.getMovementHeaderById = getMovementHeaderById;
module.exports.getMovementHeaderWithDebt = getMovementHeaderWithDebt;
