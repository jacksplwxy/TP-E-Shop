<?php//分页功能 
header('Content-Type: application/json');
$link=mysqli_connect('localhost','root','','app_tcimoltp');
mysqli_set_charset($link,'utf8');
$pageNum=$_REQUEST['pageNum'];
/*将要向客户端输出的对象*////////////////////
$pager=[
	'recordCount'=>0,//总记录
	'pageSize'=>8,//页面大小
	'pageCount'=>0,//总页数
	'pageNum'=>intval($pageNum),//当前页码
	'data'=>null
];
/**////////////////////////////////////
//获取总记录数,计算总页数
$sql="select count(*) from im_product";
$result=mysqli_query($link,$sql);
$row=mysqli_fetch_assoc($result);
$pager['recordCount']=intval($row['count(*)']);//把字符串解析成整数
$pager['pageCount']=ceil(($pager['recordCount'])/($pager['pageSize']));
//获取当前指定页中的记录
$start=($pager['pageNum']-1)*$pager['pageSize'];
$count=$pager['pageSize'];
$sql="select * from im_product LIMIT $start,$count";
$result=mysqli_query($link,$sql);
//读取所有产品的记录
$pager['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($pager);
