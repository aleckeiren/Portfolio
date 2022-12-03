/**
 * "StAuth10222: I Alec Pasion, 000811377 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else."
 */
const express = require('express');
var router = express.Router()
const ArticlesModel = require('../models/articles.js')
const fs = require('fs');
// Display the articles page
router.get("/", async function(req, res)
{
  let reqString ="\n" + new Date() + ", /articles" + req.path + ", " + req.ip + ", " + JSON.stringify(req.query) + ", " + JSON.stringify(req.body) 
  fs.appendFile("log.txt", reqString, (err) => {
    if (err) {
      console.log(err);
    }
    else {
    }
  });
  // Retrieve all of the articles using the model method, display the page
  const results = await ArticlesModel.getAllArticles();
  req.TPL.articles = results;
  res.render("articles", req.TPL);

});

module.exports = router;
