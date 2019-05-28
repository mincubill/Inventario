const productDao = require("../dao/productDao.js");

const createProduct = function(req, res){
    let product = {
        name: req.body.name,
        description: req.body.description,
        stock: req.body.stock,
        price: req.body.price,
        store: req.body.store
    };
    productDao.createProduct(product).then((success) => {
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const updateProduct = function(req, res){
    let product = 
    {
        id: parseInt(req.body.id),
        name: req.body.name,
        description: req.body.description,
        stock: req.body.stock,
        price: req.body.price,
        store: req.body.store
    };
    productDao.updateProduct(product).then((success) => {
        console.log(success.toString());
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const updateStatusProduct = function(req, res){
    let product = 
    {
        id: parseInt(req.body.id),
        status: parseInt(req.body.status)
    };
    productDao.updateStatusProduct(product).then((success) => {
        console.log(success.toString());
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const updateStockProduct = function(req, res){
    let product = 
    {
        id: parseInt(req.body.id),
        stock: parseInt(req.body.stock)
    };
    productDao.updateStockProduct(product).then((success) => {
        console.log(success.toString());
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const getProducts = function(req, res){
    productDao.getProducts().then((success) => {
        console.log(success.toString());
        res.send(success);
    }).catch((error) => {
        console.log(error);
    });
};

const getProductsByStorage = function(req, res){
    let product = 
    {
        storage : parseInt(req.body.storage)
    }
    productDao.getProductsByStorage(product).then((success) => {
        console.log(success.toString());
        res.send(success);
    }).catch((error) => {
        console.log(error);
    });
};

module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.updateStatusProduct = updateStatusProduct;
module.exports.updateStockProduct = updateStockProduct;
module.exports.getProducts = getProducts;
module.exports.getProductsByStorage = getProductsByStorage;


