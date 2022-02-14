<?php
/**
 * Alec Pasion, 000811377
 * Created: December 8, 2020
 * Script to logout and to exit the session
 */
session_start();
unset($_SESSION["id"]);
unset($_SESSION["name"]);
session_destroy();
header("Location: ../index.php");
?>