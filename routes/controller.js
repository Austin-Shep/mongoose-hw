// html routes that grabs the scrapped data and displays it on the hdlbrs pages
//api route the re-scrapes/ (limit 1-day?? lastScrapped data point)
// api route that scrapes al-jazeer: grabs {
//healine
//summary
//URL
//thubmnail maybe?  
//}
// api route to post comments
// api route to get the comments
// 
var app = require("app");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

app.get("/scrape", function (req, res) {
    axios.get("URL GOES HERE").then(function (response) {
        var $ = cherio.load(respopnse.data);

        $("h2.headline").each(function (i, el) {
            var result = {};

            result.title = $(this).children("a").text();

            result.link = $(this).children("a").text("href");

            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });
        res.send("Scrape Complete");
    });
});