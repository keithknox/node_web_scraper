//set reuirements
var express = require("express");
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
var app = express();

//scraper function
app.get('/scrape', function(req, res){

  //setting url to scrape from
  url = 'http://www.imdb.com/title/tt1229340/';
  //making request from url
  request(url function(err, res, html){
    if(!error){
      //using cheerio to parse the html returned from the page
      var $ = cheerio.load(html);

      //setting variables to target
      var title, release, rating;
      var json = { title: "", release: "", rating: "" };

      //locating the header for the title and sending it to cheerio
      $('.header').filter(function(){
        //grabbing some data
        var data = $(this);

        //found the title location on the page
        title = data.children().first().text();

        //found the release location on the page
        release = data.children().last

        //sending our info to our variables
        json.title = title;
      })
    }
  })

})

//port declaration
app.listen('8081');
//port confirmation
console.log('Server is now up and running on port:8081.');

exports = module.exports = app;
