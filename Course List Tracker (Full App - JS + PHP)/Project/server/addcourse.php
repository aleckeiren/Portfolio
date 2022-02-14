<?php
/**
 * Alec Pasion, 000811377
 * Created: December 8, 2020
 * form function when adding a course to the database
 */

include "connect.php";

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
$course = filter_input(INPUT_POST, "course", FILTER_SANITIZE_SPECIAL_CHARS);
$professor= filter_input(INPUT_POST, "professor", FILTER_SANITIZE_SPECIAL_CHARS);

$lowCase = strtolower($course);

$sameCourse = 0;

$stmt = $dbh->prepare("SELECT course, professor FROM courses WHERE LOWER(course) LIKE LOWER (:name)");
$stmt->execute([ 'name' => $lowCase ]);
if ($stmt->num_rows > 0) {
    $sameCourse = 1;
}
if($sameCourse == 0){
    $command = "INSERT into courses (account, course, professor) VALUES (:account, :course, :name)";
    $stmt = $dbh->prepare($command);
    $stmt->execute([ 'account' => $username , 'course' => $course, 'name' => $professor]);
}

header("Location: ../home.php");
die();