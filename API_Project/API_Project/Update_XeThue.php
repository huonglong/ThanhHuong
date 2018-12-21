<?php
 include 'DBConfig.php';
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  
  $id = $obj["id"];
  $CMND=$obj["SoCMND"];
  $TenXe= $obj["TenXe"];
  $BienSo = $obj["BienSo"];
  $HoTenKH = $obj["HoTenKH"];
  $NgayThue = $obj["NgayThue"];
  $HinhThucThue = $obj["HinhThucThue"];
  $SoGioThue =$obj["SoGioThue"];
  $GiaThue= $obj["GiaThue"];
  $TongTienDuKien = $obj["TongTienDuKien"];
  
  $Sql_Query = "UPDATE `XeThue` SET `SoCMND`= '$CMND',`TenXe`= '$TenXe' ,`BienSo`= '$BienSo' ,
  `HoTenKH`= '$HoTenKH',`NgayThue`= '$NgayThue',`HinhThucThue`= '$HinhThucThue',`SoGioThue`= '$SoGioThue`' ,
  `GiaThue`='$GiaThue',`TongTienDuKien`= '$TongTienDuKien' WHERE id = '$id'";
 
 if(mysqli_query($con,$Sql_Query)){
	 $MSG = 'Sửa dữ liệu thành công!' ;

	 $json = json_encode($MSG);
	 echo $json ; 
 }
 else{
	echo 'Wrong';
 }
 mysqli_close($con);
 
?>