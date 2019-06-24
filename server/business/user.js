const userDao = require("../dao/userDao.js");

const login = function(req, res){
    let user = 
    {
        userName: req.body.username,
        pass: req.body.password
    };
    userDao.login(user.userName, user.pass).then((success) => {
        res.send(success);
    }).catch((error) => {
        console.log(error);
    });
};


const createUser = function(req, res){
    let user = 
    {
        rut: parseInt(req.body.rut),
        name: req.body.name,
        lastName: req.body.lastName,
        userName: req.body.userName,
        mail: req.body.mail,
        type: req.body.type,
        career: req.body.career,
        phone: req.body.phone,
        address: req.body.address,
        pass: req.body.pass
    };
    userDao.createUser(user).then((success) => {
        console.log(success.toString());
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const updateUser = function(req, res){
    let user = 
    {
        rut: parseInt(req.body.rut),
        name: req.body.name,
        lastName: req.body.lastName,
        userName: req.body.userName,
        mail: req.body.mail,
        type: req.body.type,
        career: req.body.career,
        phone: req.body.phone,
        address: req.body.address,
        pass: req.body.pass
    };
    userDao.updateUser(user).then((success) => {
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const updateStatusUser = function(req, res){
    let user = 
    {
        rut: parseInt(req.body.rut),
        status: paseInt(req.body.status),
    };
    userDao.updateStatusUser(user).then((success) => {
        console.log(success.toString());
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const updatePrivilegeUser = function(req, res){
    let user = 
    {
        rut: parseInt(req.body.rut),
        type: paseInt(req.body.type),
    };
    userDao.updatePrivilegeUser(user).then((success) => {
        console.log(success.toString());
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const getUserByRut = function(req, res){
    let user = 
    {
        rut: parseInt(req.body.rut),
    };
    userDao.getUserByRut(user).then((success) => {
        res.send(success);
    }).catch((error) => {
        console.log(error);
    });
};


const getUsers = function(req, res){
    userDao.getUsers().then((success) => {
        console.log(success.toString());
        res.send(success.toString());
    }).catch((error) => {
        console.log(error);
    });
};

const getCareers = function( req, res ) {
    userDao.getCareers().then( ( success ) => {
        res.send( success );
    }).catch( ( error ) => {
        console.log( error );
    });
};


module.exports.login = login;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.updateStatusUser = updateStatusUser;
module.exports.updatePrivilegeUser = updatePrivilegeUser;
module.exports.getUserByRut = getUserByRut;
module.exports.getUsers = getUsers;
module.exports.getCareers = getCareers;
