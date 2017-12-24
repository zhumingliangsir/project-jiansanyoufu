	//每页加载
	var b_close=0;
	jQuery(document).ready(function() {
					setInterval(autoplay,8000);
	});
	function autoplay(){
				if(b_close==0)
				{
					jQuery(".tanbox").stop().fadeIn();
		  	}
	}
	jQuery("i").click(function(){
		  		closeM(1);
	});
	function closeM(b)
	{
			    jQuery(".tanbox").fadeOut();
					if(b==1)
					{
							b_close=1;
					}
	}
		
  function clearInputM()
  {
      	jQuery('#sub_tel').val('');
      	jQuery('#sub_ject').val('');
  }
  
var ftime = 60;
var timeFlows;
//验证码时间显示			
function SetReTime() {
    if (ftime > 0) {
        ftime--;
        jQuery("#dl_fsmm").html("（" + ftime + "秒后）重发");
    }
    else {
        ftime = 60;
        clearInterval(timeFlows);
        jQuery("#dl_wjmm").show();
        jQuery("#dl_fsmm").hide();
    }
}
function clearMSG()
{
	jQuery(".mj-inpuVs").html("");
}

// 浏览器判断
function checkBrowser(){
   var u = window.navigator.userAgent.toLocaleLowerCase(),
    msie = /(msie) ([\d.]+)/,
    chrome = /(chrome)\/([\d.]+)/,
    firefox = /(firefox)\/([\d.]+)/,
    safari = /(safari)\/([\d.]+)/,
    opera = /(opera)\/([\d.]+)/,
    ie11 = /(trident)\/([\d.]+)/,
    b = u.match(msie)||u.match(chrome)||u.match(firefox)||u.match(safari)||u.match(opera)||u.match(ie11);
    return {name: b[1], version: parseInt(b[2])};
};
  //window_box  弹窗
var windowBoxOriginHight;
!function(){
    jQuery.fn.windowBox = function(settings){
        settings=jQuery.extend({},jQuery.windowBox.defaults,settings);
        var bType = checkBrowser();
         var box = {};
         box.fn = {};
         box.fn.con =  jQuery('.window_box');
         box.fn.con.length = box.fn.con.length;
         if(box.fn.con.length == 1)
            return false;
         box.fn.windowType = checkBrowser();
         box.fn.wbcStr =  settings.wbcStr;
         box.fn.title = settings.title;
         box.fn.littleTitle = settings.littleTitle;
         
        if(settings.cancleBtn && settings.confirmBtn){
             box.fn.btn = '<div class="window_box_btn"><input onclick=saveCollection() type="button" value="保存" class="window_box_btn_save"><input onclick=window_box_close(this) type="button" value="取消"   class="window_box_btn_cancle"></div>';
         }else if(settings.cancleBtn && !settings.confirmBtn){
              box.fn.btn = '<div class="window_box_btn"><input onclick=window_box_close(this) type="button" value="取消"  class="window_box_btn_cancle"></div>';
        }else if(!settings.cancleBtn && settings.confirmBtn){
              box.fn.btn = '<div class="window_box_btn"><input onclick=saveCollection() type="button" value="保存" class="window_box_btn_save"></div>';
        }else{
             box.fn.btn = '';
        };

        box.fn.confirmStr = '<div class="window_box " style="position:absolute; z-index:9999;overflow:hidden"><div class="window_box_title" style="display:'+settings.showTitle+'"><span>'+box.fn.title+'</span><em>'+box.fn.littleTitle+'</em><a href="javascript:void(0)" class="window_box_close" onClick="javascript:'+settings.closeFn+'(this)"></a></div><div class="window_box_container '+settings.moreClass+'">'+box.fn.wbcStr+''+box.fn.btn+'</div></div><div class="translucence_layer" ><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);"></iframe></div>';
        jQuery('body').append(box.fn.confirmStr);
        windowBoxOriginHight = 0;
       resizeWindowBox(); 

        box.fn.pos = [];
        var oldDocWidth = document.documentElement.clientWidth;
        box.fn.pos.push(oldDocWidth);
   
        if(bType.version == "6"  ){

            jQuery("html").css("overflow-y","visible");
            jQuery("body").css("overflow-y","hidden");
        }else if(bType.version == "7" || bType.version == "8"){
            jQuery("html").css("overflow-y","hidden");
            jQuery("body").css("overflow-y","hidden");
        }else{
            jQuery("body").css("overflow-y","hidden");
        };
         
        jQuery("body").css({"height":"100%"});
        var newDocWidth = document.documentElement.clientWidth;
        box.fn.pos.push(newDocWidth);
        var box_left = box.fn.pos[1] - box.fn.pos[0];

        jQuery('body').css('margin-right',''+box_left+'px');
        if(bType.name == "msie" && bType.version == "6"){
        var h = jQuery(window).scrollTop();
        jQuery('.translucence_layer').css({"top":h + "px", "height" : box.fn.wHeight + "px"});
        };
        jQuery('.window_box_btn_cancle').click(function(){
            jQuery('.window_box').remove();
            jQuery('.translucence_layer').remove();
            var cb =  checkBrowser();
            if(cb.version == "6"){
               jQuery("html").css("overflow-y","scroll");
               jQuery("body").css("overflow-y","visible");
            }else if(cb.version == "7" && jQuery('#st_pid').length != 1){
               jQuery("html").css("overflow-y","scroll");
               jQuery("body").css("overflow-y","visible");
            }else if(cb.version == "8" && jQuery('#st_pid').length != 1){
                jQuery("html").css("overflow-y","scroll");
                jQuery('body').css('overflow-y','visible');
            }else{
               jQuery("body").css("overflow-y","inherit"); 
            };
            
            jQuery('body').css('margin-right','0');
            
        });
        if(typeof(settings.callback) == "function")
            settings.callback();
        if(settings.closeTime != "") {
            //setTimeout('window_box_close()',settings.closeTime);
            setTimeout(function() {
                var myfn = eval(settings.closeFn)
                myfn();
            }, settings.closeTime);
        }
        //自适应处理
         jQuery(window).bind("resize",function() {
            resizeWindowBox(); 
        });

        /*高度自适应*/
        function resizeWindowBox() {
            box.fn.wHeight = document.documentElement.clientHeight;
            box.fn.wWidth = document.documentElement.clientWidth;
            box.fn.wScrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
            box.fn.wScrollWidth = document.documentElement.scrollLeft || document.body.scrollLeft;
            if (settings.width != "auto") {
                box.fn.left = box.fn.wScrollWidth + (box.fn.wWidth - settings.width) / 2;
                box.fn.width = settings.width;
            } else {
                box.fn.width = box.fn.con.width();
                box.fn.left =  box.fn.wScrollWidth + (box.fn.wWidth - box.fn.width) / 2;
            };
            if (settings.height != "auto") {
                box.fn.top = box.fn.wScrollHeight + ((box.fn.wHeight - settings.height) / 2);
                box.fn.height = settings.height;
            } else {
                box.fn.height = null;
                box.fn.top = box.fn.wScrollHeight + ((box.fn.wHeight - box.fn.height) / 2);
            };
            box.fn.style = {
                l: box.fn.left,
                t: box.fn.top,
                w: box.fn.width,
                h: box.fn.height
            };
            jQuery('.window_box').css({
                left: box.fn.style.l,
                top: box.fn.style.t,
                width: box.fn.style.w,
                height: box.fn.style.h
            });
            if (box.fn.height == null) {
                box.fn.height = jQuery('.window_box').height();
                box.fn.top = box.fn.wScrollHeight + ( box.fn.wHeight > box.fn.height ? ( box.fn.wHeight - box.fn.height):0) / 2;
                jQuery('.window_box').css({
                    "height": "auto",
                    "top": box.fn.top
                });
            };
            windowBoxOriginHight = windowBoxOriginHight ? windowBoxOriginHight : jQuery('.window_box').height();
            var wbcHeight,wbcStyle;
            wbcHeight = windowBoxOriginHight > box.fn.wHeight ? box.fn.wHeight: windowBoxOriginHight;
            if(settings.showTitle === "block"){
                wbcHeight = wbcHeight - jQuery('.window_box_title').height();
            }
            wbcStyle = 'height:' + wbcHeight + 'px;';
            wbcStyle += windowBoxOriginHight > box.fn.wHeight ? 'overflow-y:scroll;':'';
            if(windowBoxOriginHight > box.fn.wHeight) {
                jQuery('.window_box_container').attr('style', wbcStyle); 
            }
        }
    };
   
    // 默认值
        jQuery.windowBox={defaults:{
            width:'auto',
            height:'auto',
            transLayer:true,//是否出现透明背景层
            type:"window_box",//弹框类型
            wbcStr:"",//字符串
            title:"弹窗",//大标题
            littleTitle:"",//小标题
            closeTime:"",//自动关闭时间
            callback:"",
            closeFn:"window_box_close",//点击关闭执行的函数
            showTitle:"block",//显示title
            moreClass:""//container上另加的class
        }}; 
}(jQuery);
function window_box_close(obj){
		jQuery('.window_box').remove();
		jQuery('.translucence_layer').remove();
        var cb =  checkBrowser();
		 if(cb.version == "6"){
               jQuery("html").css("overflow-y","scroll");
               jQuery("body").css("overflow-y","visible");
            }else if(cb.version == "7" && jQuery('#st_pid').length != 1){
               jQuery("html").css("overflow-y","scroll");
               jQuery("body").css("overflow-y","visible");
            }else if(cb.version == "8" && jQuery('#st_pid').length != 1){
                jQuery("html").css("overflow-y","scroll");
                jQuery('body').css('overflow-y','visible');
            }else{
               jQuery("body").css("overflow-y","inherit"); 
            };
		jQuery('body').css('margin-right','0');
	    windowBoxOriginHight = 0;
};