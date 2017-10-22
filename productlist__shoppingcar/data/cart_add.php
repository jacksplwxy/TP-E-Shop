<?php
header('Content-Type: text/plain');
$link=mysqli_connect('localhost','root','','app_tcimoltp');
mysqli_set_charset($link,'utf8');
@$uname=$_REQUEST['uname'];
@$pid=$_REQUEST['pid'];
if(!$uname||!$pid){
	echo "fail";
	return;
}
//根据用户名编号查找用户编号
$sql="select uid from im_user where uname='$uname'";
$result=mysqli_query($link,$sql);
$uid=mysqli_fetch_assoc($result); 


#var_dump($uid);
//根据用户编号查找购物车编号
$sql="select cid from im_cart where userId='$uid[uid]'";
$result=mysqli_query($link,$sql);
$cid=mysqli_fetch_assoc($result);
//若用户编号没有对应的购物车编号，则执行添加语句生成购物车，得到购物车编号
if(!$cid){
	$sql="insert into im_cart values(null,'$uid[uid]')";
	$result=mysqli_query($link,$sql);
	$cid=mysqli_insert_id($link);
}
#var_dump($cid);
//根据购物车编号和产品编号，到详情表查询是否有该记录
$sql="select count from im_cart_detail where carId='$cid[cid]' and productId='$pid'";
#var_dump($cid[cid]);
#var_dump($pid);
$result=mysqli_query($link,$sql);
$res=mysqli_fetch_assoc($result);
#var_dump($res);

if($res){//若详情表中已有该商品记录，则执行更新，购买数量+1
	#echo 'succ';
	$sql="update im_cart_detail set count=count+1 where carId='$cid[cid]' and productId='$pid'";
	mysqli_query($link,$sql);
}else{//若详情表中没有该商品记录，则执行插入，购物数量为1
	#echo 'err';
	$sql="insert into im_cart_detail values(null,'$cid[cid]','$pid',1)";
	mysqli_query($link,$sql);
	}
echo "succ";