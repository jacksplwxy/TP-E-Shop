<?php
header('Content-Type: application/json');
$conn=mysqli_connect('localhost','root','','app_tcimoltp');
mysqli_set_charset($conn,'utf8');
$uname=$_REQUEST['uname'];
//根据用户名查找用户编号,再根据用户编号查找购物车编号
$sql="select cid from im_cart where userId=(select uid from im_user where uname='$uname')";
#$sql="select uid from im_user where uname='$uname'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$cid=$row['cid'];
#var_dump($uid);
//根据用户编号查找购物车编号
#$sql="select cid from im_cart where userId='$uid[uid]'";
#$result=mysqli_query($conn,$sql);
#$cid=mysqli_fetch_assoc($result);
#var_dump($cid);
//根据购物车编号到im_product里查找所有该购物车编号下的产品
$sql="select did,carId,productId,count,pname,price,pic from im_cart_detail,im_product where carId='$cid' and productId=pid";//跨表查询
$result=mysqli_query($conn,$sql);
$cartlist=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($cartlist); 


