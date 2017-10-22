<?php
header('Content-Type: text/plain');
$link=mysqli_connect('localhost','root','','app_tcimoltp');
mysqli_set_charset($link,'utf8');
$uname=$_REQUEST['uname'];
$upwd=$_REQUEST['upwd'];
$sql="select uname,upwd from im_user where uname='$uname' and upwd='$upwd'";
$result=mysqli_query($link,$sql);
$res=mysqli_fetch_assoc($result);
#var_dump($res);
if($res){echo 'ok';}
else {echo 'err';}
