 const   app = require("express")(),
        bodyParser = require("body-parser"),
        router = require("./app/router.js"),
        middleware = require("./app/middleware.js"),
        PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
middleware(app);
router(app);
console.log("/***************** localhost:"+PORT.toString()+" (web service inventario citt) **********************\\");
app.listen(PORT);

