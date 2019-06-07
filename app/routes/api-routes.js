var db = require("../models");

// Mongoose npm package
var mongoose = require("mongoose");
var mongodb = process.env.MONGODB_URI

// Setting up connection to Mongoose
mongoose.connect(mongodb || "mongodb://localhost/articleScraper", { useNewUrlParser: true });

function apiRoutes(app){
    app.get("/api/allArticles", function(req, res){
        db.Article.find({}, function(err, docs){
            res.json(docs);
        })
    })

    app.post("/api/addComment/:id", function(req, res){
        console.log("-------------------------------------------");
        console.log("inside /api/addComment")

        mongoId = req.params.id;
        comment = req.body;
        console.log(comment);
        console.log("mongo id: " + mongoId);

        db.Article.create(comment)
        .then(function(dbComment){
            return db.Article.findOneAndUpdate({ _id: mongoId }, { comment: dbComment._id }, { new: true });
        })
        .then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err){
            res.json(err);
        })
    })
}

module.exports = apiRoutes;