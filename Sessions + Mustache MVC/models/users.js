/**
 * "StAuth10222: I Alec Pasion, 000811377 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else."
 */
var sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function startup()
{
  db = await sqlite.open({
    filename: 'database.db',
    driver: sqlite3.Database
  });
}

startup();

// Return all of the articles
async function getAllUsers()
{
  const results = db.all("SELECT * FROM USERS");
  return results;
}

async function loginUser(username,password)
{
  const result = await db.get("SELECT * FROM Users WHERE username = '" + username + "'");
  if(result){
    if(result.password == password){
      return result.level;
    }
  }
  return false;
}

// Create a new article given a title, content and username
async function createUser(username,password,level)
{ 
  await db.run("INSERT INTO Users VALUES (?,?,?)",
               [username, password, level]);
}

async function deleteUser(username)
{ 
  await db.run("DELETE FROM Users WHERE username = '" + username + "'")
}

module.exports = {getAllUsers
                 ,loginUser,createUser,deleteUser};
