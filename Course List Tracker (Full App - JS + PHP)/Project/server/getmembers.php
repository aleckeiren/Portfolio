<?php
/**
 * Alec Pasion, 000811377
 * Created: December 8, 2020
 * Script for ajax request of the list of members
 */

include "connect.php";
include "member.php";

// Prepare and execute the DB query
$command = "SELECT username, email FROM accounts";
$stmt = $dbh->prepare($command);
$success = $stmt->execute();

// Fill an array with User objects based on the results.
$memberlist = [];
while ($row = $stmt->fetch()) {
    $item = new member($row["username"], $row["email"]);
    array_push($memberlist, $item);
}

// Write the json encoded array to the HTTP Response
echo json_encode($memberlist);
