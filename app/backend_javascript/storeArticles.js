// Mongoose npm package
var mongoose = require("mongoose");

var mongodb = process.env.MONGODB_URI

// Setting up connection to Mongoose
mongoose.connect(mongodb || "mongodb://localhost/articleScraper", { useNewUrlParser: true });

console.log("---------------------------------------------------------------------")
console.log(mongodb);

// Article.js and Comment.js
var db = require("../models");

// Scrapes Charlotte Observer, and allows a callback on the results
var scraper = require("./scraper");

var mongoFunctions = {
    storeArticles: function(){
        scraper(function(allArticles){
            allArticles.forEach(function(thisArticle){
                // We want to target any objects in the database that have the same title as 
                // the object we are about to add. 
                // If there is an already existing object with the same title, it will not add
                // the new object.  If there is not already an object with the same title, it 
                // will add the current object
        
                var query = {"title": thisArticle.title};
        
                db.Article.findOneAndUpdate(query, thisArticle, {upsert: true}, function(err, doc){
                    if(err){
                        console.log(err);
                    }
                })
            })
        })
    },
    findAll: function(cb){
        db.Article.find({}, function(err, docs){
            cb(docs);
        })
    }
}

module.exports = mongoFunctions;