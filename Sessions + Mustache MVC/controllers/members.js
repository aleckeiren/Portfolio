/**
 * "StAuth10222: I Alec Pasion, 000811377 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else."
 */
const express = require('express');
var router = express.Router();
const ArticlesModel = require('../models/articles.js');
const fs = require('fs');
// Display the members page
router.get("/", function(req, res)
{
  let reqString ="\n" + new Date() + ", /members" + req.path + ", " + req.ip + ", " + JSON.stringify(req.query) + ", " + JSON.stringify(req.body) 
  fs.appendFile("log.txt", reqString, (err) => {
    if (err) {
      console.log(err);
    }
    else {
    }
  });
  res.render("members", req.TPL);
});

// Create an article if the form has been submitted
router.post("/create", async function(req, res)
{
  let reqString ="\n" + new Date() + ", /members" + req.path + ", " + req.ip + ", " + JSON.stringify(req.query) + ", " + JSON.stringify(req.body) 
  fs.appendFile("log.txt", reqString, (err) => {
    if (err) {
      console.log(err);
    }
    else {
    }
  });
  // Create the article using the model method, pass req.body as a parameter
  // since it contains the title and content data... the author is hardcoded
  // to "bob" for now, this should be whichever user is logged-in
  await ArticlesModel.createArticle(req.body,req.session.username);

  req.TPL.message = "Article successfully created!";
  res.render("members", req.TPL);

});

module.exports = router;
