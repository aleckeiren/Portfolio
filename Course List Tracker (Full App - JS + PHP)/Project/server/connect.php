<?php
/**
 * Alec Pasion, 000811377
 * Created: November 26, 2020
 * Script to establish a connection to the database
 */
try {
    $dbh = new PDO(
        "mysql:host=localhost;dbname=project",
        "root",
        ""
    );
} catch (Exception $e) {
    die("ERROR: Couldn't connect. {$e->getMessage()}");
}
