<?php
/**
 * Alec Pasion, 000811377
 * Created: December 8, 2020
 * script to authenticate user
 */
include "connect.php";
session_start();

$username = filter_input(INPUT_POST,"username",FILTER_SANITIZE_SPECIAL_CHARS);
$password = filter_input(INPUT_POST,"password",FILTER_SANITIZE_SPECIAL_CHARS);
$stmt = $dbh->prepare("SELECT id, password FROM accounts WHERE username = :name");
$stmt->execute([ 'name' => $username ]);

while ($row = $stmt->fetch()) {
    if (password_verify ($password , $row['password'])){
        session_regenerate_id();
        $_SESSION['loggedin'] = true;
		$_SESSION['name'] = $username;
		$_SESSION['id'] = $id;
        header("Location: ../home.php");
    }else{
        header("Location: ../index.php");
    }
}