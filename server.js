//set requirements
var express = require("express");
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
var app = express();

//scraper function
app.get('/web-scrape', function(req, res){

  //setting url to scrape from
  url = 'http://www.imdb.com/title/tt1219827/';
  //making request from url
  request(url, function(err, res, html){
    if(!err){
      //using cheerio to parse the html returned from the page
      var $ = cheerio.load(html);

      //setting variables to target
      var title, release, rating;
      var json = { title: "", release: "", rating: "" };

      //locating title and release and sending it to cheerio
      $('.title_wrapper').filter(function() {
        //grabbing some data
        var data = $(this);

        //found the title location on the page
        title = data.children().first().text().trim();

        //found the release location on the page
        release = data.children().last().children().last().text().trim();

        //sending our info to our variables
        json.title = title;
        json.release = release;
      })

      //locating the rating and sending it to cheerio
      $('.ratingValue').filter(function() {
        var data = $(this);

        //found the rating location on the page (hint: it's seperate from the other info);
        rating = data.children().first().children().first().text();

        //sending it to our release variable
        json.rating = rating;
      })
    }

    //let's write this stuff down and go home!
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      if(err) throw err;
      console.log(json);
      console.log("File successfully written. It's located in the output.json file.");
    })
  });

})

//port declaration
app.listen('5000');
//port confirmation
console.log('Server is now up and running on localhost:5000');

exports = module.exports = app;


//thanks to the following article: https://scotch.io/tutorials/scraping-the-web-with-node-js

//to start it up, use "node server.js"
