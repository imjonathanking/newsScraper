var storeArticles = require("../backend_javascript/storeArticles");
var db = require("../models");

function htmlRoutes(app){
    app.get("/", function(req, res){
        // Scrapes news site, sends articles to mongo databse
        storeArticles();
        res.render("home");
    })
}

module.exports = htmlRoutes;