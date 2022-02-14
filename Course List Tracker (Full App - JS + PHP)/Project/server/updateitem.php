<?php
/**
 * Alec Pasion, 000811377
 * Created:December 8, 2020
 * script to update an item
 */

include "connect.php";

$id = filter_input(INPUT_POST, "id", FILTER_SANITIZE_NUMBER_INT);
$course = filter_input(INPUT_POST, "course", FILTER_SANITIZE_SPECIAL_CHARS);
$professor= filter_input(INPUT_POST, "professor", FILTER_SANITIZE_SPECIAL_CHARS);

$lowCase = strtolower($course);


if($course != "" && $professor !=""){
    $stmt = $dbh->prepare("UPDATE courses SET course = :course, professor = :name WHERE id = :id");
    $stmt->execute([ 'course' => $course, 'name' => $professor, 'id' => $id]);
}
else{
    $stmt = $dbh->prepare("DELETE FROM courses WHERE id = :id");
    $stmt->execute(['id' => $id]);
}

header("Location: ../home.php");
die();