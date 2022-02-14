<?php
/**
 * Alec Pasion, 000811377
 * Created: December 8, 2020
 * script to register user
 */
include "connect.php";

$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
$username = filter_input(INPUT_POST,"username",FILTER_SANITIZE_SPECIAL_CHARS);
$password = filter_input(INPUT_POST,"password",FILTER_SANITIZE_SPECIAL_CHARS);

$sameEmail = 0;
$sameUser = 0;
$hash= password_hash($password, PASSWORD_DEFAULT);

$stmt = $dbh->prepare("SELECT username,email FROM accounts WHERE email = :name");
$stmt->execute([ 'name' => $email ]);
if ($stmt->num_rows > 0) {
    $sameEmail = 1;
}
$stmt = $dbh->prepare("SELECT id, password FROM accounts WHERE username = :name");
$stmt->execute([ 'name' => $username ]);

if ($stmt->num_rows > 0) {
    $sameUser = 1;
}

if($sameUser == 0 && $sameEmail == 0){
    $stmt = $dbh->prepare("INSERT INTO accounts (username, password, email) VALUES (:name, :password, :address)");
    $stmt->execute([ 'name' => $username , 'password' => $hash, 'address' => $email]);

}else{
    header("Location: ../register.html");
    die();
}
header("Location: ../index.php");
die();