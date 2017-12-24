
$("#header").load("data/header.php");
$("#footer").load("data/footer.php",function(){

	$(".nav_box").on("mouseenter","li",function(e){
		$(this).children().eq(1).addClass("nav_sub_hover");console.log(e.target)
	}).on("mouseleave","li",function(){$(this).children().eq(1).removeClass("nav_sub_hover")})
//对于三级菜单的描述
	$("#xkzx").mouseenter(function(){
		console.log(2)
		$("#dxyw").addClass("main_permission_hover")
	})
		.mouseleave(function(){
			$("#dxyw").removeClass("main_permission_hover")
		});
});
//对于nav二级菜单的描述
//动画
//对轮播广告的描述

+function(){
	var imgs=[
		"imag/111_banner.jpg",
		"imag/222_banner.png",
		"imag/333_banner.jpg",
		"imag/444_banner.png"
	];
	//获得id为slider的容器的宽作为每个LI的宽
	var LIWIDTH=parseFloat($("#slider").css("width"));
	//保存id为imgs和id为indexs的ul
	var $ulImgs=$("#imgs"),$ulIdxs=$("#indexs");
	var n=0;//定义n保存当前正在显示的图片下标
	var SPEED=500;//定义speed保存自动轮播的速度
	var WAIT=2000;//定义WAIT保存自动轮播间的等待时间
	var canAuto=true;//定义标记变量标记能否自动轮播
	+function(){//初始化$ulImgs和$ulIdxs的内容
		//遍历imgs数组,生成html代码片段
		for(var i=0,htmlImgs="",htmlIdxs="";
			i<imgs.length;
			i++){
			htmlImgs+="<li class='banner_scorllli'><img src='"+imgs[i]+"'></li>";
			htmlIdxs+="<li></li>";
		}
		//将代码片段填充到ul中
		$ulImgs.html(htmlImgs);
		$ulIdxs.html(htmlIdxs);
		$("#imgs li").css({
			"width":LIWIDTH
		});
		//修改$ulImgs的宽
		$ulImgs.css("width",LIWIDTH*(imgs.length+1));
		//复制$ulImgs的第一个元素，再追加到结尾
		$ulImgs.append(
			$ulImgs.children(":first").clone()
		);
	}();
	function autoMove(){//启动自动轮播
		//将当前图片的下标+1
		n++;
		//延迟WAIT毫秒,再启动动画,将$ulImgs的left移动到-n*LIWIDTH的位置
		$ulImgs.delay(WAIT).animate({
			left:-n*LIWIDTH
		},SPEED,function(){//动画结束后
			//如果是最后一张(n等于imgs的length)
			if(n==imgs.length){
				n=0;//将n改回0
				$ulImgs.css("left",0);//将$ulImgs的left归0
			}
			//设置$ulIdxs中n位置的li为hover，清除其它hover
			$ulIdxs
				.children(":eq("+n+")").addClass("hover")
				.siblings().removeClass("hover");
			//如果可以自动轮播时,才启动
			if(canAuto) autoMove();//再次启动自动轮播
		});
	};
	autoMove();
	//实现手动轮播
	//为$ulIdxs添加鼠标进入事件委托,只允许li响应
	$ulIdxs.on("mouseover","li",function(){
		//停止&ulImgs上的一切动画
		$ulImgs.stop(true);
		//修改n为当前li的下标:
		n=$("#indexs>li").index(this);
		//让$ulImgs移动到-n*LIWIDTH的位置
		$ulImgs.animate({
			left:-n*LIWIDTH
		},SPEED,function(){
			//设置$ulIdxs中n位置的li为hover，清除其它hover
			$ulIdxs
				.children(":eq("+n+")").addClass("hover")
				.siblings().removeClass("hover");
		});
	});//10分钟休息, 15分钟练习
	//鼠标进入slider区域，修改标记禁止继续自动轮播
	$("#slider").mouseenter(function(){
		canAuto=false;
	}).mouseleave(function(){//鼠标离开,重启自动轮播
		canAuto=true;//修改标记允许继续自动轮播
		n--;//让n退回前一个下标
		autoMove();
	});
}();
//对悬浮的菜单加上js样式
//实现的功能是无论点哪一个 z-index 都会变成 100
$("#banner_content").on("mouseenter","div",function(){
	//获取当前元素的下标
	var a=$(this).index();
	$("#banner_center").css("z-index",100).children().eq(a).css("display","block").siblings().css("display","none")
});
$("#banner_list").mouseleave(function(){
	$("#banner_center").css("z-index",0)
});
//三级餐单的描述
$("#container1_left").on("mouseenter","li",function(){
	var a=$(this).index();
	$("#container1_right").children().eq(a).css("display","block").siblings().css("display","none")
});



+function(){
var arr=[
{name:"陈* (187****1051)",data:"游戏版号1"},
{name:"陈* (187****1051)",data:"游戏版号2"},
{name:"陈* (187****1051)",data:"游戏版号3"},
{name:"陈* (187****1051)",data:"游戏版号4"},
{name:"陈* (187****1051)",data:"游戏版号5"},
{name:"陈* (187****1051)",data:"游戏版号6"}
	];

var  $ul=$("#scroll_bar")
function aMove(){
	var result="";
	for(i=0;i<arr.length;i++){
	result+=
		`<li><i></i>${arr[i].name}<p>${arr[i].data}</p></li>`
}
	$ul.html(result);

	var SPEED=800;
	var WAIT=600;
	$ul.delay(WAIT).animate({
		marginTop:-94
	},SPEED,function(){
		//当前动画结束后,再原数组中删除在末尾追加就
		var newArr=arr.splice(0,2);
		arr=arr.concat(newArr);
		$ul.css({
			marginTop:0
		});
		aMove()
	})
}
aMove();
}()





$("#index_tsfw04").on("click","li",function(){
var i=$(this).index();
	$(this).removeClass("index_tsfw04liA").addClass("index_tsfw04liB").siblings().removeClass("index_tsfw04liB").addClass("index_tsfw04liA")
	$("#index_tsfw10").children().eq(i).css("display","block").siblings().css("display","none")
});

$("#index_tsfw04").on("click","li",function(){
	var i=$(this).index();
	$(this).removeClass("index_tsfw04liA").addClass("index_tsfw04liB").siblings().removeClass("index_tsfw04liB").addClass("index_tsfw04liA")
	$("#index_tsfw10").children().eq(i).css("display","block").siblings().css("display","none")
});


//登录和注册









