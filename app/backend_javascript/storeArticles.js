// Mongoose npm package
var mongoose = require("mongoose");

mongodb = process.env.MONGODB_URI

console.log(mongodb);

// Setting up connection to Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/articleScraper", { useNewUrlParser: true });


// Article.js and Comment.js
var db = require("../models");

// Scrapes Charlotte Observer, and allows a callback on the results
var scraper = require("./scraper");

function storeArticles(){
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
}

module.exports = storeArticles;