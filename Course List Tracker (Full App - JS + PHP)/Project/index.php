<?php 
session_start();
if(isset($_SESSION['name'])&&!empty($_SESSION['name'])){
header("Location: home.php");
exit();
}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Login</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
        <link href="style/style.css" rel="stylesheet" type="text/css">
	</head>
	<body>
		<div class="loginArea">
			<h1>Login</h1>
			<form action="server/authenticate.php" method="post">
				<label for="username">
					<i class="fas fa-user"></i>
				</label>
				<input type="text" name="username" placeholder="Username" id="username" required>
				<label for="password">
					<i class="fas fa-lock"></i>
				</label>
				<input type="password" name="password" placeholder="Password" id="password" required>
				<a href="register.html">Not a member? Register</a>
				<input type="submit" value="Login">
			</form>
		</div>
	</body>
</html>