<?php
/**
 * Alec Pasion, 000811377
 * Created: December 8, 2020
 * Script for ajax request of the courses items in the database
 */

include "connect.php";
include "listitem.php";
session_start();
$username = $_SESSION['name'];

// Prepare and execute the DB query
$command= "SELECT id, course, professor FROM courses WHERE account = :name";
$stmt = $dbh->prepare($command);
$stmt->execute([ 'name' => $username ]);

// Fill an array with User objects based on the results.
$itemlist = [];
while ($row = $stmt->fetch()) {
    $item = new listitem($row["course"], $row["professor"], $row["id"]);
    array_push($itemlist, $item);
}

// Write the json encoded array to the HTTP Response
echo json_encode($itemlist);
