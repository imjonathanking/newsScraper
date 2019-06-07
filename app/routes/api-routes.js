var mongoFunctions = require("../backend_javascript/storeArticles");


function apiRoutes(app){
    app.get("/api/allArticles", function(req, res){
        mongoFunctions.findAll(function(response){
            res.json(response);
            console.log("Response: ---------------------------------------------------")
            console.log(response);
        })
    })

    // app.post("/api/addComment/:id", function(req, res){
    //     console.log("-------------------------------------------");
    //     console.log("inside /api/addComment")

    //     mongoId = req.params.id;
    //     comment = req.body;
    //     console.log(comment);
    //     console.log("mongo id: " + mongoId);

    //     db.Article.create(comment)
    //     .then(function(dbComment){
    //         return db.Article.findOneAndUpdate({ _id: mongoId }, { comment: dbComment._id }, { new: true });
    //     })
    //     .then(function(dbArticle){
    //         res.json(dbArticle);
    //     })
    //     .catch(function(err){
    //         res.json(err);
    //     })
    // })
}

module.exports = apiRoutes;