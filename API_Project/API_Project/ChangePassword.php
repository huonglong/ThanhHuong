<?php
 include 'DBConfig.php';
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 if ($conn->connect_error) { 
 die("Connection failed: " . $conn->connect_error);
} 
 $json = file_get_contents('php://input');
 $obj = json_decode($json,true);
 $username =$obj["username"];
 $password =$obj["password"];
 $Sql_Query = "UPDATE `Users` SET `password`= '$password' WHERE username = '$username'";
 
 if(mysqli_query($con,$Sql_Query)){
	 $MSG = 'Thay đổi mật khẩu thành công' ;
	 $json = json_encode($MSG);
	 echo $json ; 
 } else{
	echo 'Wrong';
 
 }
 mysqli_close($con);
?>