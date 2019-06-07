var storeArticles = require("../backend_javascript/storeArticles");
var db = require("../models");

// Mongoose npm package
var mongoose = require("mongoose");
var mongodb = process.env.MONGODB_URI

// Setting up connection to Mongoose
mongoose.connect(mongodb || "mongodb://localhost/articleScraper", { useNewUrlParser: true });

function htmlRoutes(app){
    app.get("/", function(req, res){
        // Scrapes news site, sends articles to mongo databse
        storeArticles();
        res.render("home");
    })
}

module.exports = htmlRoutes;