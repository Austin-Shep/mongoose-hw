var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


var PORT = process.env.PORT || 3030;
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes
require("./routes/controller")(app);

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/newscrapper'

mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function () {
    console.log(`App running on port ${PORT}`);
});

module.exports = app;