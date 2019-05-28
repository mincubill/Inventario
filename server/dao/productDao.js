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

const getProductsByStorage = function(product){
    let query = "SELECT * FROM PRODUCT WHERE PRODUCT.STORE = ? ";
    return new Promise((resolve, reject) => {
        con.query(query, [product.storage],(error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            let keys = Object.keys(result[0]);
           
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


