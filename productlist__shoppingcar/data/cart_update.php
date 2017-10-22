<?php
/**接收客户端提交的购物车详情记录编号(did)和购买数量(count)，更新到数据库，返回succ或err**/
header('Content-Type: text/html');

$conn=mysqli_connect('localhost','root','','app_tcimoltp');
mysqli_set_charset($conn,'utf8');

$count = $_REQUEST['count'];
$did = $_REQUEST['did'];


//SQL1: 设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);

//SQL2：数据库更新语句
$sql = "UPDATE im_cart_detail SET count='$count' WHERE did='$did'";
$result = mysqli_query($conn,$sql);

if($result){
	echo 'succ';
}else {
	echo 'sqlerr';
}