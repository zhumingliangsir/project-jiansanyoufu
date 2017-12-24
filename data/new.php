<?php
//分页向客户端输出所有产品信息
//以json格式
//{
//  recordCount:36, //满足条件总的记录数
//	pageSize:8,    //页面大小，一页最多保存记录数
//	pageCount:5,    //页面数量
//	pageNum:3;      //当前显示行号
//	data:[{},{},{}] //当前页面中的记录数据
//}
//1:修改输出格式 json
header("content-type:application/json;charset=utf-8");
//2:获取客户端提交的要显示页号 pageNum
@$pno = $_REQUEST['pageNum'];
//3:如果出错或者没有页号显示第1页
if($pno===null){
	$pno = 1;     //客户端提交要显示页号
}else{          //客户端提交页号,默认字符串
  $pno = intval($pno);//字符串解析为整数
}
//4:连接数据库设置编码
require("init.php");
//5:创建数组-->要输出给客户端的数据
$output = [
   'recordCount'=>0,  //总记录数
	 'pageSize'=>5,     //页面大小
	 'pageCount'=>0,    //总页数
	 'pageNum'=>$pno,   //当前页
	 'data'=>null       //当前页中数据
];
//6:查询总的记录数
$sql = "SELECT COUNT(*) FROM huaxiazixun_new";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
$output['recordCount']=intval($row[0]);
//7:计算总的页数  ceil向上取整
$output['pageCount']=ceil($output['recordCount']/$output['pageSize']);
//8:计算出{当前页}中的{记录}行
$start = ($output['pageNum']-1)*$output['pageSize'];
$count = $output['pageSize'];
$sql = "SELECT * FROM huaxiazixun_new LIMIT";
$sql .= " $start,$count";
$result = mysqli_query($conn,$sql);
$output['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);
//9:输出
echo json_encode($output);



