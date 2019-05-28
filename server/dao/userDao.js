const con = require("../dao/connection.js");

const login = function(user){
    let query = "select FN_LOGIN(?,?)";
    return new Promise((resolve, reject) => {
        con.query(query, [user.userName,user.pass], (error, result, fields) => {
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


const createUser = function(user){
    let query = "select FN_CREATE_USER(?,?,?,?,?,?,?,?,?)";
    return new Promise((resolve, reject) => {
        con.query(query, [user.rut,user.name,user,lastName,user.userName,user.mail,user.career,user.phone,user.address,user.pass], (error, result, fields) => {
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

const updateUser = function(user){
    let query = "select FN_UPDATE_USER(?,?,?,?,?,?,?,?,?)";
    return new Promise((resolve, reject) => {
        con.query(query, [user.rut,user.name,user.userName,user.mail,user.career,user.phone,user.address,user.pass], (error, result, fields) => {
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

const updateStatusUser = function(user){
    let query = "select FN_UPDATE_STATUS_USER(?,?)";
    return new Promise((resolve, reject) => {
        con.query(query, [user.rut,user.status], (error, result, fields) => {
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


const updatePrivilegeUser = function(user){
    let query = "select FN_UPDATE_PRIVILEGE_USER(?,?)";
    return new Promise((resolve, reject) => {
        con.query(query, [user.rut,user.type], (error, result, fields) => {
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

const getUserByRut = function(user){
    let query = "SELECT * FROM USERS WHERE USERS.RUT = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [user.rut], (error, result, fields) => {
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

const getUsers = function(){
    let query = "SELECT * FROM USERS";
    return new Promise((resolve, reject) => {
        con.query(query, (error, result, fields) => {
            if(error){
                console.log(error);
                reject(error);
                return;
            }
            resolve(result[0]); 
        });
    });
};

module.exports.login = login;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.updateStatusUser = updateStatusUser;
module.exports.updatePrivilegeUser = updatePrivilegeUser;
module.exports.getUserByRut = getUserByRut;
module.exports.getUsers = getUsers;

