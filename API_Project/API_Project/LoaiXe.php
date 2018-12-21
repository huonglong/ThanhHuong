<?php
	include 'DBConfig.php';
	$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName); 
    $arrayLoaiXe = array();

    //Tao class chua du lieu
    class loaiXe{
        var $idLoaiXe;
        var $tenLoai;
        var $soLuong;
        var $hinhAnh;

        //Contructor
        function loaiXe($id, $name, $quatity, $image){
            $this->idLoaiXe = $id;
            $this->tenLoai = $name;
            $this->soLuong = $quatity;
            $this->hinhAnh = $image;
        }
	}

    $sql = "SELECT * FROM LoaiXe";
    $query = $conn->query($sql);

    while($row = mysqli_fetch_array($query)){
        array_push($arrayLoaiXe, new LoaiXe($row["MaLoai"], $row["TenLoai"], $row["SoLuong"], $row["HinhAnh"]));
    }
    echo json_encode($arrayLoaiXe);
?>