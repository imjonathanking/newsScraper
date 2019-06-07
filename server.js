//Requiring dependencies------------------------------------------------------------------------||
const port = process.env.PORT || 3000;

var path = require("path");

var express = require("express");

var app = express();

var handlebars = require("express-handlebars");
// ---------------------------------------------------------------------------------------------||

//Middlware-------------------------------------------------------------------------------------||

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("app/public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var viewsPath = path.join(__dirname, '/app/views');  
app.set('views', viewsPath);  
// ---------------------------------------------------------------------------------------------||

// Routing--------------------------------------------------------------------------------------||

var htmlRoutes = require("./app/routes/html-routes");
htmlRoutes(app);
var apiRoutes = require("./app/routes/api-routes");
apiRoutes(app);

// ---------------------------------------------------------------------------------------------||


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});