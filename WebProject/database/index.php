<?php
  if(isset($_POST['YOURURLBUTTON'])){
    $url = mysqli_real_escape_string($conn, $_POST['YOURURLINPUTFROMSEARCH']);
    getURLInfo($url, $conn);
  }
?>