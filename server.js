//set requirements
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

      //locating title and release and sending it to cheerio
      $('.header').filter(function(){
        //grabbing some data
        var data = $(this);

        //found the title location on the page
        title = data.children().first().text();

        //found the release location on the page
        release = data.children().last().children().text();

        //sending our info to our variables
        json.title = title;
        json.release = release;
      })

      //locating the rating and sending it to cheerio
      $('.star-box-giga-star').filter(function(){
        var data = $(this);

        //found the rating location on the page (hint: it's seperate from the other info);
        rating = data.text();

        //sending it to our release variable
        json.rating = rating;
      })
    }

    //let's write this stuff down and go home!
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log("File successfully written. It's located in the project folder.");
    })
    res.send('Sorry..no UI. This is just a console app.')
  });

})

//port declaration
app.listen('8081');
//port confirmation
console.log('Server is now up and running on port:8081.');

exports = module.exports = app;
