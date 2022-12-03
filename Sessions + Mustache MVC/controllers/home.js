/**
 * "StAuth10222: I Alec Pasion, 000811377 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else."
 */
const express = require('express');
var router = express.Router()
const fs = require('fs');
// Display the home page
router.get("/", async function(req, res)
{
  let reqString ="\n" + new Date() + ", /home" + req.path + ", " + req.ip + ", " + JSON.stringify(req.query) + ", " + JSON.stringify(req.body) 
  fs.appendFile("log.txt", reqString, (err) => {
    if (err) {
      console.log(err);
    }
    else {
    }
  });
  res.render("home", req.TPL);
});

module.exports = router;
