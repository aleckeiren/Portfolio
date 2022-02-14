<!-- 
"StAuth10065: I Alec Pasion, 000811377 certify that this material is my original work. 
No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else." 
-->
<!DOCTYPE html>
<html>
<head>
  <title>Error</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <style>
    .container{
      min-width: 40%;
      padding: 3em !important;
    }
    .row {
      margin-top: 1em;
    }
    h4 {
      text-align: center;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container shadow p-3 mb-5 bg-white rounded" style="margin-top:3em">
    <h4 class="text-danger">Error </h4>
    <div style="text-align: center;">
        <h5>An error has occured.</h5>
        <h6>Please go back to the previous page and try again.</h6>
    </div>
    <div class="row">
      <div class="col-2" style="text-align: end;">Time:</div>
      <div class="col-10"><?php echo $error['time'] ?></div>
    </div>
    <div class="row">
      <div class="col-2" style="text-align: end;">SQL Query:</div>
      <div class="col-10"><?php echo $error['sql'] ?></div>
    </div>
    <div class="row">
      <div class="col-2" style="text-align: end;">SQL Error:</div>
      <div class="col-10"> <?php echo $error['mysqlerror']?></div>
    </div>
  </div>
</body>
</html>