const con = require("../dao/connection.js");

const createProduct = function(product) {
    let query = "select FN_CREATE_PRODUCT(?,?,?,?,?)";
    return new Promise((resolve, reject) => {
        con.query(query, [product.name, product.description, product.stock, 
                          product.price, product.store], (error, result, fields) => {
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

const updateProduct = function(product){
    let query = "select FN_UPDATE_PRODUCT(?,?,?,?,?)";
    return new Promise((resolve, reject) => {
        con.query(query, [product.id,product.name,product.description,product.price,product.store], (error, result, fields) => {
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

const updateStatusProduct = function(product){
    let query = "select FN_UPDATE_STATUS_PRODUCT(?,?)";
    return new Promise((resolve, reject) => {
        con.query(query, [product.id, product.status], (error, result, fields) => {
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

const updateStockProduct = function(product){
    let query = "select FN_UPDATE_STOCK_PRODUCT(?,?)";
    return new Promise((resolve, reject) => {
        con.query(query, [product.id,product.stock], (error, result, fields) => {
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

const updateAvailableStockProducts = function(product){
    let query = "UPDATE PRODUCT SET PRODUCT.AVAILABLESTOCK = PRODUCT.AVAILABLESTOCK + ? WHERE PRODUCT.ID = ? ";
    return new Promise((resolve, reject) => {
        con.query(query, [product.quantity,product.id],(error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            resolve(result); 
        });
    });
};

const getProducts = function(){
    let query = "SELECT * FROM PRODUCT";
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

const getProductById = function(product){
    let query = "SELECT * FROM PRODUCT WHERE PRODUCT.ID = ?";
    return new Promise((resolve, reject) => {
        con.query(query,[product.id], (error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            resolve(JSON.parse(JSON.stringify(result))); 
        });
    });
};


const getProductsByStorage = function( storage ){
    let query = "SELECT * FROM PRODUCT WHERE PRODUCT.STORE = ? and product.STATUS = 1";
    return new Promise((resolve, reject) => {
        con.query(query, [storage],(error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            resolve(result); 
        });
    });
};

const getProductsByStorageStats = function ( storage ) {
    let query = "select product.ID, product.NAME, product.STOCK, product.AVAILABLESTOCK, movement.BORROWED from (select movement_body.PRODUCT_M as producto, sum(movement_body.QUANTITY) as BORROWED from movement_body join movement_header on movement_body.HEADER = movement_header.ID where movement_header.STATUS = 0 group by movement_body.PRODUCT_M) as movement RIGHT join (select product.ID as ID, product.NAME as NAME, product.STOCK as STOCK, product.AVAILABLESTOCK as AVAILABLESTOCK, product.STATUS as STATUS, product.STORE as STORE from product) as product on movement.producto = product.ID where product.STORE = ? and product.STATUS = 1";
    return new Promise( (resolve, reject) => {
        con.query(query, [storage], (error, result, fields) => {
            if(error) {
                console.log(error);
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const getProductsByStats = function ( storage ) {
    let query = "select product.ID, product.NAME, product.STOCK, product.AVAILABLESTOCK, movement.BORROWED from (select movement_body.PRODUCT_M as producto, sum(movement_body.QUANTITY) as BORROWED from movement_body join movement_header on movement_body.HEADER = movement_header.ID where movement_header.STATUS = 0 group by movement_body.PRODUCT_M) as movement RIGHT join (select product.ID as ID, product.NAME as NAME, product.STOCK as STOCK, product.AVAILABLESTOCK as AVAILABLESTOCK, product.STATUS as STATUS, product.STORE as STORE from product) as product on movement.producto = product.ID where product.STATUS = 1";
    return new Promise( (resolve, reject) => {
        con.query(query, [storage], (error, result, fields) => {
            if(error) {
                console.log(error);
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const getProductsWithLowStock = function(){
    let query = "SELECT * FROM PRODUCT where stock < 5";
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
}

const getProductsWithLowStockByStorage = function( storage ){
    let query = "SELECT * FROM PRODUCT WHERE PRODUCT.STORE = ? and product.STATUS = 1 and product.STOCK < 5";
    return new Promise((resolve, reject) => {
        con.query(query, [storage],(error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            resolve(result); 
        });
    });
}

module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.updateStatusProduct = updateStatusProduct;
module.exports.updateStockProduct = updateStockProduct;
module.exports.getProducts = getProducts;
module.exports.getProductsByStorage = getProductsByStorage;
module.exports.getProductsByStorageStats = getProductsByStorageStats;
module.exports.getProductById = getProductById;
module.exports.updateAvailableStockProducts = updateAvailableStockProducts;
module.exports.getProductsWithLowStock = getProductsWithLowStock;
module.exports.getProductsWithLowStockByStorage = getProductsWithLowStockByStorage;
module.exports.getProductsByStats = getProductsByStats;

