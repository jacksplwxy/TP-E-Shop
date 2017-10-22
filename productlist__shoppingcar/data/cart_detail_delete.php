<?php
/**接收客户端提交的购物车详情记录编号(did)，从数据库中删除该记录，返回succ或err**/
header('Content-Type: text/html');

$did = $_REQUEST['did'];

//连接数据库
$conn=mysqli_connect('localhost','root','','app_tcimoltp');
mysqli_set_charset($conn,'utf8');

//SQL1: 设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);

//SQL2：数据库更新语句
$sql="delete  from im_cart_detail where did='$did'";
$result=mysqli_query($conn,$sql);

if($result){
	echo 'succ';
}else {
	echo 'sqlerr';
}