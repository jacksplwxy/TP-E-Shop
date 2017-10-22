<?php
header('Content-Type: text/html');
$conn=mysqli_connect('localhost','root','','app_tcimoltp');
mysqli_set_charset($conn,'utf8');
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$kw = $_REQUEST['kw'];
$sql = "SELECT pname FROM im_product WHERE pname LIKE '%$kw%'";
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_all($result);

//[ ['XXXX'],['YYYY'] ]
for($i=0; $i<count($list); $i++){
	$pname = $list[$i][0];
	echo "<li>$pname</li>";
}
