var mongoFunctions = require("../backend_javascript/storeArticles");

function htmlRoutes(app){
    app.get("/", function(req, res){
        // Scrapes news site, sends articles to mongo databse
        mongoFunctions.storeArticles();
        res.render("home");
    })
}

module.exports = htmlRoutes;