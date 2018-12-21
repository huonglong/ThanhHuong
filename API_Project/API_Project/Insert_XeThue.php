<?php
 include 'DBConfig.php';
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 $json = file_get_contents('php://input');
  $obj = json_decode($json,true);
  
  $CMND=$obj["SoCMND"];
  $TenXe= $obj["TenXe"];
  $BienSo = $obj["BienSo"];
  $HoTenKH = $obj["HoTenKH"];
  $NgayThue = $obj["NgayThue"];
  $HinhThucThue = $obj["HinhThucThue"];
  $SoGioThue =$obj["SoGioThue"];
  $GiaThue= $obj["GiaThue"];
  $TongTienDuKien = $obj["TongTienDuKien"];
  
  $Sql_Query = "INSERT INTO XeThue (`SoCMND`, `TenXe`, `BienSo`, `HoTenKH`, `NgayThue`,  `HinhThucThue`, `SoGioThue`, `GiaThue`, `TongTienDuKien`)
  VALUES ('$CMND','$TenXe','$BienSo', '$HoTenKH', '$NgayThue', '$HinhThucThue', '$SoGioThue', '$GiaThue', '$TongTienDuKien')";
 
 if(mysqli_query($con,$Sql_Query)){
 $MSG = 'Thêm dữ liệu thành công!' ;

 $json = json_encode($MSG);
 echo $json ; 
 }
 else{
 
 echo 'Wrong';
 
 }
 mysqli_close($con);
 
?>