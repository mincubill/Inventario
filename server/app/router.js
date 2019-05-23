const user = require("../business/user");
const product = require("../business/product");
const movementHeader = require("../business/movementHeader");
const movementBody = require("../business/movementBody");


module.exports = function(app)
{
    app.get("/", (req, res) => {
        res.send("Bienvenido a Webservice del Inventario citt");
    });

    
}