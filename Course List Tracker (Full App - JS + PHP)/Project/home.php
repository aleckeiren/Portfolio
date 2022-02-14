<?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
	header('Location: index.html');
	exit;
}
$session_value=(isset($_SESSION['name']))?$_SESSION['name']:'';
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Course</title>
		<script type="text/javascript">
    		var useraccount='<?php echo $session_value;?>';
		</script>
		<link rel="stylesheet" href="style/home.css">
		<script src="js/script.js"></script>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	</head>
	<body class="loggedin">
		<nav class="navtop">
			<div>
				<h1><a href="home.php">Courses</a></h1>
				<a href="server/logout.php">Logout <i class="fas fa-door-open"></i></a>
			</div>
		</nav>
		<div class="content" id="content">
			<p id="welcome">Welcome back, <?=$session_value?>!</p>
			<form action="server/addcourse.php" method="post" autocomplete="off" id="courseform">
                <input hidden type='text' name="username" placeholder="Username" id="username" value="<?=$_SESSION['name']?>">
				<input type="text" name="course" placeholder="Course" id="Course" required>
				<input type="text" name="professor" placeholder="Professor" id="professor" required><br>
				<input type="submit" value="Add course" id="submit">
			</form>
			<p id="error" hidden></p>
			<h2>Your Courses</h2>
		</div>
	</body>
</html>