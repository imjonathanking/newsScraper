var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    text: {
        type: String,
        required: true
    }
})

// Creating a Comment model using the Comment Schema
var Comment = mongoose.model("Comment", CommentSchema);

// Exporting the Comment model
module.exports = Comment;