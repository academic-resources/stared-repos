<?php

$para = 'ignacioromanherrera@gmail.com';
$asunto = 'Consulta desde web';
$mailheader = "From: ".$_POST["email"]."\r\n";
$mailheader .= "Reply-To: ".$_POST["email"]."\r\n";
$mailheader .= "Content-type: text/html; charset=utf-8\r\n";
$MSSAGE_BODY = "Nombre: ".$_POST["name"]."\n";
$MSSAGE_BODY .= "\n<br>Email: ".$_POST["email"]."\n";
$MSSAGE_BODY .= "\n<br>Mensaje: ".n12br($_POST["message"])."\n";


mail($para, $asunto, $MESSAGE_BODY, $mailheader) or die("Error!");

header('Location: index.html')

?>
