// html routes that grabs the scrapped data and displays it on the hdlbrs pages
//api route the re-scrapes/ (limit 1-day?? lastScrapped data point)
// api route that scrapes: grabs {
//healine-
//summary-
//URL-
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
    axios.get("https://www.nytimes.com/section/world?action=click&module=Well&pgtype=Homepage").then(function (response) {
        var $ = cherio.load(response.data);

        $("div.story-body").each(function (i, el) {
            var result = {};
            //scrape the headline and link
            var title = $(this).children("h2.headline");
            result.title = title.children("a").text();
            result.link = title.children("a").text("href");
            result.summary = $(this).children("p.summary").text();

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
//home
app.get("/", function (req, res) {
    db.Article.find({}).then(function (result) {
        res.render("index", { Article: result })
    });
});
//rendering the indv article on template
app.get("article/:id", function (req, res) {
    db.Article.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (data) {
        res.render("article", { article: response })
    });
});

app.post("article/:id", function (req, res) {
    db.Comments.save(req.body).then(
        function (comment) {
            return db.ArticlefindByIdAndUpdate(
                { _id: req.params.id },
                { comment: comment._id },
                { new: true }
            )
        }).then(function (result) {
            res.json(result)
        })
})