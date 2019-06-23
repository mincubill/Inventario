const user = require("../business/user");
const product = require("../business/product");
const movementHeader = require("../business/movementHeader");
const movementBody = require("../business/movementBody");
const stadistics = require("../business/stadistics");


module.exports = function(app)
{
    app.get("/", (req, res) => {
        res.send("[{Bienvenido a Webservice del Inventario citt}]");
    });

    app.post("/login", (req, res) => {
        user.login(req, res);
    });

    app.post("/createUser", (req, res) => {
        user.createUser(req, res);
    });

    app.post("/updateUser", (req, res) => {
        user.updateUser(req, res);
    });

    app.post("/updateStatusUser", (req, res) => {
        user.updateStatusUser(req, res);
    });

    app.post("/updatePrivilegeUser", (req, res) => {
        user.updatePrivilegeUser(req, res);
    });

    app.get("/getUsers", (req, res) => {
        user.getUsers(req, res);
    });

    app.post("/getUserByRut", (req, res) => {
        user.getUserByRut(req, res);
    });

    app.post("/createProduct", (req, res) => {
        product.createProduct(req, res);
    });

    app.post("/updateProduct", (req, res) => {
        product.updateProduct(req, res);
    });

    app.post("/updateStatusProduct", (req, res) => {
        product.updateStatusProduct(req, res);
    });

    app.post("/updateStockProduct", (req, res) => {
        product.updateStockProduct(req, res);
    });

    app.get("/getProducts", (req, res) => {
        product.getProducts(req, res);
    });

    app.post("/getProductsByStorage", (req, res) => {
        product.getProductsByStorage(req, res);
    });

    app.post("/getProductsByStorageStats", (req, res) => {
        product.getProductsByStorageStats(req, res);
    });

    app.post("/createMovementHeader", (req, res) => {
        movementHeader.createMovementHeader(req, res);
    });

    app.post("/changeStatusMovementHeader", (req, res) => {
        movementHeader.changeStatusMovementHeader(req, res);
    });

    app.get("/getMovementHeaders", (req, res) => {
        movementHeader.getMovementHeaders(req, res);
    });

    app.post("/getMovementHeadersByUser", (req, res) => {
        movementHeader.getMovementHeadersByUser(req, res);
    });

    app.post("/getMovementHeaderById", (req, res) => {
        movementHeader.getMovementHeaderById(req, res);
    });

    app.get("/getMovementHeaderWithDebt", (req, res) => {
        movementHeader.getMovementHeaderWithDebt(req, res);
    });

    app.post("/createMovementBody", (req, res) => {
        movementBody.createMovementBody(req, res);
    });
    
    app.get("/getMovementBodys", (req, res) => {
        movementBody.getMovementBodys(req, res);
    });

    app.post("/getMovementBodysByHeader", (req, res) => {
        movementBody.getMovementBodysByHeader(req, res);
    });

    app.get("/loans", (req, res) => {
        stadistics.loans(req, res);
    });

    app.get("/defaulter", (req, res) => {
        stadistics.defaulter(req, res);
    });

    
}