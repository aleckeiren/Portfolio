/**
 * "StAuth10222: I Alec Pasion, 000811377 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else."
 */
const express = require('express');
var router = express.Router()
const UsersModel = require('../models/users.js');
const ArticlesModel = require('../models/articles.js')
const fs = require('fs');
// Display the editors page
router.get("/", async function(req, res)
{
  let reqString ="\n" + new Date() + ", /editors" + req.path + ", " + req.ip + ", " + JSON.stringify(req.query) + ", " + JSON.stringify(req.body) 
  fs.appendFile("log.txt", reqString, (err) => {
    if (err) {
      console.log(err);
    }
    else {
    }
  });
  users = await UsersModel.getAllUsers();
  articles = await ArticlesModel.getAllArticles();
  req.TPL.users = users;
  req.TPL.articles = articles;
  res.render("editors", req.TPL);
});
router.get("/userdelete/:username", async function(req, res)
{
  let reqString ="\n" + new Date() + ", /editors" + req.path + ", " + req.ip + ", " + JSON.stringify(req.query) + ", " + JSON.stringify(req.body) 
  fs.appendFile("log.txt", reqString, (err) => {
    if (err) {
      console.log(err);
    }
    else {
    }
  });
  await UsersModel.deleteUser(req.params.username);
  // req.TPL.users = users;
  users = await UsersModel.getAllUsers();
  articles = await ArticlesModel.getAllArticles();
  req.TPL.users = users;
  req.TPL.articles = articles;
  res.render("editors", req.TPL);
});

router.get("/articledelete/:title", async function(req, res)
{
  let reqString ="\n" + new Date() + ", /editors" + req.path + ", " + req.ip + ", " + JSON.stringify(req.query) + ", " + JSON.stringify(req.body) 
  fs.appendFile("log.txt", reqString, (err) => {
    if (err) {
      console.log(err);
    }
    else {
    }
  });
  await ArticlesModel.deleteArticle(req.params.title);
  // req.TPL.users = users;
  users = await UsersModel.getAllUsers();
  articles = await ArticlesModel.getAllArticles();
  req.TPL.users = users;
  req.TPL.articles = articles;
  res.render("editors", req.TPL);
});

module.exports = router;
