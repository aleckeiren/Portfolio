/**
 * "StAuth10222: I Alec Pasion, 000811377 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else."
 */
const express = require('express');
var router = express.Router()
const UsersModel = require('../models/users.js');
const fs = require('fs');
// Displays the login page
router.get("/", async function(req, res)
{
  let reqString ="\n" + new Date() + ", /login" + req.path + ", " + req.ip + ", " + JSON.stringify(req.query) + ", " + JSON.stringify(req.body) 
  fs.appendFile("log.txt", reqString, (err) => {
    if (err) {
      console.log(err);
    }
    else {
    }
  });
  // if we had an error during form submit, display it, clear it from session
  req.TPL.login_error = req.session.login_error;
  req.TPL.show_register = false;
  req.TPL.show_login = true;
  req.TPL.show_successful = false;
  req.session.login_error = "";

  // render the login page
  res.render("login", req.TPL);
});
router.get("/register", async function(req, res)
{
  let reqString ="\n" + new Date() + ", /login" + req.path + ", " + req.ip + ", " + JSON.stringify(req.query) + ", " + JSON.stringify(req.body) 
  fs.appendFile("log.txt", reqString, (err) => {
    if (err) {
      console.log(err);
    }
    else {
    }
  });
  // if we had an error during form submit, display it, clear it from session
  req.TPL.show_register = true;
  req.TPL.show_login = false;
  req.TPL.show_successful = false;
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";
  // render the login page
  res.render("login", req.TPL);
});


// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/attemptlogin", async function(req, res)
{
  const result = await UsersModel.loginUser(req.body.username,req.body.password);
  let reqString ="\n" + new Date() + ", /login" + req.path + ", " + req.ip + ", " + JSON.stringify(req.query) + ", " + JSON.stringify(req.body) 
  fs.appendFile("log.txt", reqString, (err) => {
    if (err) {
      console.log(err);
    }
    else {
    }
  });
  // is the username and password OK?
  if (result != false)
  {
    req.session.username = req.body.username;
    req.session.level = result;
    if(result == "member"){
      res.redirect("/members");
    }else{
      res.redirect("/editors")
    }
  }
  else
  {
    // if we have an error, reload the login page with an error
    req.session.login_error = "Invalid username and/or password!";
    res.redirect("/login");
  }

});
router.post("/createnewaccount", async function(req, res)
{
  await UsersModel.createUser(req.body.username,req.body.password,"member");
  let reqString ="\n" + new Date() + ", /login" + req.path + ", " + req.ip + ", " + JSON.stringify(req.query) + ", " + JSON.stringify(req.body) 
  fs.appendFile("log.txt", reqString, (err) => {
    if (err) {
      console.log(err);
    }
    else {
    }
  });
  req.TPL.show_register = true;
  req.TPL.show_login = false;
  req.TPL.show_successful = true;
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";
  res.render("login", req.TPL);
});

// Logout a user
// - Destroys the session key username that is used to determine if a user
// is logged in, re-directs them to the home page.
router.get("/logout", async function(req, res)
{
  let reqString ="\n" + new Date() + ", /login" + req.path + ", " + req.ip + ", " + JSON.stringify(req.query) + ", " + JSON.stringify(req.body) 
  fs.appendFile("log.txt", reqString, (err) => {
    if (err) {
      console.log(err);
    }
    else {
    }
  });
  delete(req.session.level);
  delete(req.session.username);
  res.redirect("/home");
});

module.exports = router;
