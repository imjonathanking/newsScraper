var cheerio = require("cheerio");

var axios = require("axios");

function scraper(callback){
    console.log("inside scrape");

    axios.get("https://www.charlotteobserver.com/news/local/").then(function(response){
        var $ = cheerio.load(response.data);

        var results = [];

        $("article.card").find("a.image-link-macro").each(function(i, element){
            articleTitle = $(element).attr("title");
            articleLink = $(element).attr("href");

            article = {
                title: articleTitle,
                link: articleLink
            }

            results.push(article);
        })

        // Callback on array of article objects
        callback(results);

    })
}

module.exports = scraper;