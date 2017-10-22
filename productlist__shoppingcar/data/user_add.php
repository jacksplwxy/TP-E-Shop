<?php
/**
*接收客户端提交的新用户信息，保存入数据库，返回 {"msg": "succ", "uid": 3} 或 {"msg":"err", "sql":"INSERT...."}
*/
header('Content-Type: application/json;charset=UTF-8');

//接收并处理客户端提交的请求数据
$uname = $_REQUEST['uname'];
$upwd = $_REQUEST['upwd'];
$email = $_REQUEST['email'];
$homepage = $_REQUEST['homepage'];
$age = $_REQUEST['age'];

$conn=mysqli_connect('localhost','root','','app_tcimoltp');
mysqli_set_charset($conn,'utf8');

//提交SQL
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "INSERT INTO im_user VALUES(NULL,'$uname','$upwd','$email','$homepage','$age')";
$result = mysqli_query($conn,$sql);

//创建要输出给客户端的数据
$output = [];
if($result){    //执行成功
    $output['msg'] = 'succ';
    $output['uid'] = mysqli_insert_id($conn);
}else {         //执行失败
    $output['msg'] = 'err';
    $output['sql'] = $sql;
}


//把数据编码为JSON字符串
echo json_encode($output);







