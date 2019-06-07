console.log("inside logic.js");

function getAllArticles(){
    $.getJSON("/api/allArticles", function(data){
        renderArticles(data);
        console.log(data);
    })
}

function renderArticles(allArticles){
    allArticles.forEach(function(thisArticle){
        console.log(thisArticle);

        articleDiv = $("<div>").addClass("article-div");
        articleTitle = $("<div>").addClass("article-title").text(thisArticle.title + "...");

        actionDiv = $("<div>").addClass("userAction");
        articleLink = $("<a>").attr("href", thisArticle.link).text("Link to full article...");
        addComment = $("<button>").addClass("addComment").attr("mongo-id", thisArticle._id).text("Add comment");
        actionDiv.append(articleLink, addComment);

        commentDiv = $("<div>").addClass("commentDiv").attr("mongo-id", thisArticle._id);


        articleDiv.append(articleTitle, actionDiv, commentDiv);

        $("#allArticles").append(articleDiv);
    })
    // All articles have been rendered.
    // Allow user to add comments on articles
    allowComments();
}

function allowComments(){
    $(".addComment").on("click", function(){
        // Pulling the mongo id from the article that the user is trying to comment on
        articleId = $(this).attr("mongo-id");
        console.log(articleId);
        commentDiv = $(`.commentDiv[mongo-id='${articleId}']`);
        
        renderCommentArea(commentDiv, articleId);  

        allowSubmitComment();
    })
}

function renderCommentArea(commentDiv, mongoId){
    commentForm = $("<form>").addClass("comment-form");
    inputField = $("<input>")
    .addClass("comment-input")
    .attr("mongo-id", mongoId);

    commentSubmit = $("<button>")
    .attr("type", "submit")
    .attr("mongo-id", mongoId)
    .text("Submit")
    .addClass("submit-comment");

    commentForm.append(inputField, commentSubmit);

    commentDiv.append(commentForm);
}

function allowSubmitComment(){
    $(".submit-comment").on("click", function(event){
        event.preventDefault();

        // Capture the mongo id of comment's submit button
        mongoId = $(this).attr("mongo-id");

        // Find the text in the input field associated with submit button
        thisCommentText = $(`.comment-input[mongo-id='${mongoId}']`).val();

        addCommentToDatabase(thisCommentText, mongoId);
    })
}

function addCommentToDatabase(comment, mongoId){
    $.ajax({
        method: "POST",
        url: "/api/addComment/" + mongoId,
        data: {
            text: comment
        }
    })
    .then(function(data){
        console.log(data);
    })
    .catch(function(err){
        if(err){
            console.log(err);
        }
    })
}

getAllArticles();