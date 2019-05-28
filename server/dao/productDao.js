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
    let query = "select FN_UPDATE_PRODUCT(?,?,?,?,?,?)";
    return new Promise((resolve, reject) => {
        con.query(query, [product.id,product.name,product.description,product.stock,product.price,product.store], (error, result, fields) => {
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
        con.query(query, [product.id,product.status], (error, result, fields) => {
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

const getProductsByStorage = function( storage ){
    let query = "SELECT * FROM PRODUCT WHERE PRODUCT.STORE = ? ";
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
    let query = "select product.ID, product.NAME as NAME, product.STOCK as STOCK, product.STOCK - sum(movement_body.CANT) as AVAILABLE, sum(movement_body.CANT) as BORROWED from product left join movement_body on movement_body.PRODUCT_M = product.ID join movement_header on movement_header.ID = movement_body.HEADER where movement_header.STATUS = 0 and product.STORE = ? group by product.NAME, product.STOCK";
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

module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.updateStatusProduct = updateStatusProduct;
module.exports.updateStockProduct = updateStockProduct;
module.exports.getProducts = getProducts;
module.exports.getProductsByStorage = getProductsByStorage;
module.exports.getProductsByStorageStats = getProductsByStorageStats;


