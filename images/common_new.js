// JavaScript Document
//console.log处理
if (typeof console == "undefined") {
    this.console = { log: function (msg) { alert(msg); } };
};
 
// common.js
var server_host = '/';
var rankhelp_doc = '/help/rankhelp.html';
var isIE = navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1 && (navigator.appName !== "Oprea");
var isIE7 = (isIE && window.XMLHttpRequest) ? true: false;
var isIE6 = (isIE && !window.XMLHttpRequest && window.ActiveXObject) ? true: false;
var isFirefox = navigator.userAgent.indexOf('Firefox') == -1 ? false: true;
var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
var is_alert= true;

var divTop,
divLeft,
divWidth,
divHeight,
docHeight,
docWidth,
objTimer,
secI;
if ((window.location.href.indexOf(".jsyun.cc") != -1))
 {
    server_host = "http://www.jsyun.cc/";
}

//打开企业QQ
function OpenQQ()
{
	window.open('http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODA2MTk0Nl8zMjQ3NzRfNDAwNjY2MTQyOV8yXw', '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');	

	//window.open('http://b.qq.com/webc.htm?new=0&sid=4006661429&eid=218808P8z8p8x8q808Q8x&o=&q=7', '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');		
	  if(arguments.length==0){ 
			try
			{
				var s_url = "http://cps.miicp.com/ajaxsem.aspx?buy=now&sel=10&href="+escape(window.location.href)+"&ref="+escape(document.referrer)+"&rnd="+Math.random();		
				document.getElementById('icps').src=s_url;	
			}catch (e){ }
	  }
	  if(arguments.length==1){
	  	var s_url = "http://cps.miicp.com/ajaxsem.aspx?buy=now&sel="+arguments[0]+"&href="+escape(window.location.href)+"&ref="+escape(document.referrer)+"&rnd="+Math.random();		
				document.getElementById('icps').src=s_url;	
	  }
}


//查询数组大小
if (!Array.prototype.push) {
    Array.prototype.push = function() {
        var startLength = this.length;
        for (var i = 0; i < arguments.length; i++)
        this[startLength + i] = arguments[i];
        return this.length;
    }
}
//封装类
function $()
 {
    var obj = new Array();
    for (var i = 0, j = arguments.length; i < j; i++)
    {
        ele = arguments[i];
        if (typeof ele == 'object')
        return ele;
        if (typeof ele == 'string')
        ele = document.getElementById(ele) ? document.getElementById(ele) : document.getElementsByTagName(ele).length > 0 ? document.getElementsByTagName(ele) : false;
        if (j == 1)
        return ele;
        obj.push(ele);
    }
    return obj;
}

Object.extend = function(oFrom, oTo)
 {
    for (property in oFrom)
    {
        oTo[property] = oFrom[property];
    };
    return oTo;
};
var Events = new Object();
Events.addEvent = function(oTarget, sEventType, fnLister)
 {
    if (oTarget.addEventListener)
    {
        oTarget.addEventListener(sEventType, fnLister, false);
    }
    else if (oTarget.attachEvent)
    {
        oTarget.attachEvent("on" + sEventType, fnLister);
    }
    else
    {
        oTarget["on" + sEventType] = fnLister;
    };
};
Events.removeEvent = function(oTarget, sEventType, fnLister)
 {
    if (oTarget.removeEventListener)
    {
        oTarget.removeEventListener(sEventType, fnLister, false);
    }
    else if (oTarget.detachEvent)
    {
        oTarget.detachEvent("on" + sEventType, fnLister);
    }
    else
    {
        oTarget["on" + sEventType] = null;
    };
};
Events.formatEvent = function(oEvent){
    if (isIE && isWin){
        oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode: 0;
        oEvent.eventPhase = 2;
        oEvent.isChar = (oEvent.charCode > 0);
        oEvent.pageX = oEvent.cleintX + (document.body.scrollLeft || document.documentElement.scrollLeft);
        oEvent.pageY = oEvent.cleintY + (document.body.scrollTop || document.documentElement.scrollTop);
        oEvent.preventDefalt = function() {
            this.returnValue = false;
        };
        if (this.type == "mouseout")
        {
            oEvent.relatedTarget = oEvent.toElement;
        }
        else if (this.type == "mouseover")
        {
            oEvent.relatedTarget = oEvent.fromElement;
        };
        oEvent.target = oEvent.srcElement;
        oEvent.time = (new Date()).getTime();
    };
    return oEvent;
};
Events.getEvent = function()
 {
    if (window.event){
      return this.formatEvent(window.event);
    }else{
      return Event.getEvent.caller.arguments[0];
    };
};


String.prototype.trim = function()
 {
    var res = /^\s*/;
    var value = this;
    value = value.replace(res, '');
    res = /\s*$/;
    return value.replace(res, '');
};

function setCookie(name, value, expire, pre)
 {
    if (!expire){
        expire = 5000;
    };
    
    if (pre){
        name = 'js_' + name;
    };
    
    var expiry = new Date();
    expiry.setTime(expiry.getTime() + expire);
    document.cookie = name + '=' + value + ';expires=' + expiry.toGMTString() + ';path=/;domain=.';
};
function getCookie(name, pre)
 {
    if (pre)
    name = 'js_' + name;
    var r = new RegExp("(\\b)" + name + "=([^;]*)(;|$)");
    var m = document.cookie.match(r);
    var res = !m ? "": decodeURIComponent(m[2]);
    var result = stripscript(res);
    return result;

};

/****************XSS过滤********************/
function stripscript(s)
 {
    var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    //格式 RegExp("[在中间定义特殊过滤字符]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');

    }
    return rs;
};

/**********************************************/
function check_point(sValue)
 {
    var re = /^[\s0-9a-zA-Z\u0391-\uFFE5]+$/gi;
    if (!re.test(sValue))
    return false;
    else
    return true;
};
function show_error(sIdName)
 {
    if (sIdName)
    var oObj = $(sIdName);
    oObj.style.display = "block";
};
function hide_error(sIdName)
 {
    if (sIdName)
    var oObj = $(sIdName);
    oObj.style.display = "none";
};
function show_cat_err(sStr, sIdName)
 {
    var oObj = $(sIdName);
    show_error(sIdName);
    oObj.innerHTML = sStr;
};
jsPage = function(iNums, iPrePage, iCurpage, fnCallBack, sInnerId)
 {
    _this = this;
    this.iNums = Math.ceil(iNums);
    this.iPrePage = Math.ceil(iPrePage);
    this.iCurPage = Math.ceil(iCurpage);
    this.fnCallBack = fnCallBack;
    this.sInnerId = sInnerId;
    this.sPageDivClass = 'pages';
    this.sPrevClass = 'prev';
    this.sNextClass = 'next';
    this.sFirstClass = 'first';
    this.sLastClass = 'last';
    if (this.iNums <= this.iPrePage)
    {
        return false;
    };
    this.setPageDivClass = function(css)
    {
        this.sPageDivClass = css;
    };
    this.setPrevClass = function(css)
    {
        this.sPrevClass = css;
    };
    this.setNextClass = function(css)
    {
        this.sNextClass = css;
    };
    this.multi = function(i)
    {
        if (i)
        this.iCurPage = Math.ceil(i);
        var sHtmlPage = '';
        if (this.iNums < this.iPrePage)
        sHtmlPage = '';
        else
        {
            var iPages = Math.ceil(this.iNums / this.iPrePage);
            if (!this.iCurPage || this.iCurPage < 1)
            this.iCurPage = 1;
            if (this.iCurPage > iPages)
            this.iCurPage = iPages;
            var iFrom = 1;
            var iTo = 1;
            if (iPages < 10)
            {
                iFrom = 1;
                iTo = iPages;
            }
            else
            {
                iFrom = this.iCurPage - 4;
                iTo = iFrom + 10 - 1;
                if (iFrom < 1)
                {
                    iTo = this.iCurPage - iFrom + 1;
                    iFrom = 1;
                    if (iTo - iFrom < 10)
                    iTo = 10;
                }
                else if (iTo > iPages)
                {
                    iFrom = iPages - 10 + 1;
                    iTo = iPages;
                }
            };
            sHtmlPage = this.iCurPage - 4 > 1 && iPages > 10 ? '<a href="#" class="' + this.sFirstClass + '" onclick="_this.fnCallBack(1);_this.multi(1);return false;">1 ...</a>': '';
            sHtmlPage += this.iCurPage > 1 ? '<a href="void(0)" class="' + this.sPrevClass + '" onclick="_this.fnCallBack(' + (this.iCurPage - 1) + ');_this.multi(' + (this.iCurPage - 1) + ');return false;">&lsaquo;&lsaquo;</a>': '';
            for (var i = iFrom; i <= iTo; i++)
            {
                sHtmlPage += i == this.iCurPage ? '<strong>' + i + '</strong>': '<a href="#" onclick="_this.fnCallBack(' + i + ');_this.multi(' + i + ');return false;">' + i + '</a>';
            };
            sHtmlPage += this.iCurPage < iPages ? '<a href="#" class="' + this.sNextClass + '" onclick="_this.fnCallBack(' + (this.iCurPage + 1) + ');_this.multi(' + (this.iCurPage + 1) + ');return false;">&rsaquo;&rsaquo;</a>': '';
            sHtmlPage += iTo < iPages ? '<a href="#" class="' + this.sLastClass + '" onclick="_this.fnCallBack(' + iPages + ');_this.multi(' + iPages + ');return false;">... ' + iPages + '</a>': '';
            sHtmlPage = sHtmlPage ? '<div class="' + this.sPageDivClass + '"><em>&nbsp;' + this.iNums + '&nbsp;</em>' + sHtmlPage + '</div>': '';
        };
        if (this.sInnerId && document.getElementById(sInnerId))
        document.getElementById(sInnerId).innerHTML = sHtmlPage;
        else
        return sHtmlPage;
    };
};



function smallwindow() {};



function copyToClipboard(txt, str) {
    if (window.clipboardData) {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", txt);
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = txt;
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch(e) {
            alert("你使用的FF浏览器,复制功能被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip)
        return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans)
        return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = txt;
        str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip)
        return false;
        clip.setData(trans, null, clipid.kGlobalClipboard);
    }
    str = str ? str: '招聘地址';
    alert(str + "已经复制到粘贴板，您可以直接点粘贴发给您的好友！");
};
function SetHome(obj, url) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(url);
    } catch(e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch(e) {
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            };
        } else {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将'" + url + "'设置为首页。");
        };
    };
};
function addfavorite(url, title)
 {
    try
    {
        window.external.addFavorite(url, title);
    }
    catch(e)
    {
        try
        {
            window.sidebar.addPanel(title, url, "");
        }
        catch(e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    };
};
Object.extend(Array.prototype, {
    shift: function() {
        var result = this[0];
        for (var i = 0; i < this.length - 1; i++)
        this[i] = this[i + 1];
        this.length--;
        return result;
    }
});
function mb_strlen(str)
 {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3: 2) : 1;
    };
    return len;
};

function slideLine(ul, delay, speed, lh, stepvalue) {
    var slideBox = (typeof ul == 'string') ? document.getElementById(ul) : ul;
    var slideBox2 = (typeof ul == 'string') ? document.getElementById(ul) : ul;
    for (var i = 0; i < slideBox2.childNodes.length; i++) {
        if (slideBox2.childNodes[i].nodeType == 1) {
            if (slideBox2.childNodes[i].tagName == "UL")
            slideBox2 = slideBox2.childNodes[i];
            break;
        }
    };
    var delay = delay || 1000,
    speed = speed || 0,
    lh = lh || 1,
    stepvalue = stepvalue || 2;
    var tid = null,
    pause = false;
    var start = function() {
        tid = setInterval(slide, speed);
    };
    function slide()
    {
        if (pause) return;
        slideBox.scrollTop += stepvalue;
        if (slideBox.scrollTop % lh == 0) {
            clearInterval(tid);
            slideBox2.appendChild(slideBox2.getElementsByTagName('li')[0]);
            slideBox.scrollTop = 0;
            setTimeout(start, delay);
        };
    };
    slideBox.onmouseover = function() {
        pause = true;
    };
    slideBox.onmouseout = function() {
        pause = false;
    };
    setTimeout(start, delay);
};
function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
};
function get_historyCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
};

function clearHistoty() {
    wlink = null;
    set_historyCookie("history_info", wlink, 1);
    $("history").innerHTML = "暂无浏览纪录！";
    $("history").className = "now_none";
    $("clshistoty").style.display = "none";
};
function loadPng(o)
 {
    if (isIE6)
    {
        try {
            var img = o;
            var imgName = o.src.toUpperCase();
            if (imgName.substring(imgName.length - 3, imgName.length) == "PNG")
            {
                var imgID = (img.id) ? "id='" + img.id + "' ": "";
                var imgClass = (img.className) ? "class='" + img.className + "' ": "";
                var imgTitle = (img.title) ? "title='" + img.title + "' ": "title='" + img.alt + "' ";
                var imgStyle = "display:inline-block;" + img.style.cssText;
                if (img.align == "left") imgStyle = "float:left;" + imgStyle;
                if (img.align == "right") imgStyle = "float:right;" + imgStyle;
                if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
                var strNewHTML = "<span " + imgID + imgClass + imgTitle + " style=\"" + imgStyle + ";" + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + img.src + "\', sizingMethod='image');width:1px;\"></span>";
                img.outerHTML = strNewHTML;
            };
        }
        catch(e) {};
    };
};
function updateDiv_SC(id)
 {
    
    return false;
};
function closeDiv_SC()
 {
    $("select_city").style.display = "none";
    if (isIE6)
    {
        var oSelect = document.getElementsByTagName('select');
        for (var i = 0, j = oSelect.length; i < j; i++)
        {
            oSelect[i].style.visibility = 'visible';
        };
    };
};

function load_online_zx()
 {
    var stmnGAP1 = document.documentElement.clientHeight - parseInt($("ionline_zx").offsetHeight, 10) - 100;
    var stmnGAP2 = document.documentElement.clientHeight - parseInt($("ionline_zx").offsetHeight, 10);
    var stmnActivateSpeed = 200;
    var stmnScrollSpeed = 10;
    var stmnTimer;
    var stmnStartPoint,
    stmnEndPoint,
    stmnRefreshTimer;
    stmnStartPoint = parseInt($('ionline_zx').style.top, 10);
    stmnEndPoint = document.documentElement.scrollTop + stmnGAP2;
    if (stmnEndPoint < stmnGAP1)
    {
        stmnEndPoint = stmnGAP1;
        stmnRefreshTimer = stmnActivateSpeed;
    };
    if (stmnStartPoint != stmnEndPoint)
    {
        stmnScrollAmount = Math.ceil(Math.abs(stmnEndPoint - stmnStartPoint) / 15);
        $('ionline_zx').style.top = parseInt($('ionline_zx').style.top, 10) + ((stmnEndPoint < stmnStartPoint) ? -stmnScrollAmount: stmnScrollAmount);
        stmnRefreshTimer = stmnScrollSpeed;
    };
    stmnTimer = setTimeout("load_online_zx();", stmnRefreshTimer);
};
function online_zx_oper(str)
 {
    if (str == 'over')
    {
        $('izhixun_con').style.display = '';
        $('izhixun_bar').style.display = 'none';
    }
    else if (str == 'out')
    {
        if (!$('izhixun_con').contains(event.toElement))
        {
            $('izhixun_con').style.display = 'none';
            $('izhixun_bar').style.display = '';
        }
    };
};

function Integral2money(num)
 {
    return num;
};

function goTopEx()
 {
    var createDiv = document.createElement("div");
    createDiv.id = "goTopBtn";
    createDiv.style.display = "none";
    createDiv.innerHTML = '<a href="/feedback/" target="_blank" class="feed"></a> <a href="javascript:" id="goTopBtna" style="width:50px;margin-top:121px;height:50px; float:left;"></a>';
    document.body.appendChild(createDiv);
    var obj = document.getElementById("goTopBtn");
    function getScrollTop() {
        return document.documentElement.scrollTop + document.body.scrollTop;
    };
    function setScrollTop(value) {
        document.body.scrollTop = document.documentElement.scrollTop = value;
    };
    window.onscroll = function() {
        getScrollTop() > 0 ? obj.style.display = "": obj.style.display = "none";
        var top = document.documentElement.scrollTop + document.body.scrollTop;
        if (isIE6) obj.style.top = top + 77 + "px";
    };
    $('goTopBtna').onclick = function() {
        //var goTop=setInterval(scrollMove,2); function scrollMove(){setScrollTop(getScrollTop()/2.1);if(getScrollTop()<1)clearInterval(goTop);}
        document.documentElement.scrollTop = document.body.scrollTop = 0;

    };

};
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;

};

var return_ad = '';

//window_box  弹窗
var windowBoxOriginHight;
!function(){
    jq.fn.windowBox = function(settings){
        settings=jq.extend({},jq.windowBox.defaults,settings);
        var bType = checkBrowser();
         var box = {};
         box.fn = {};
         box.fn.con =  jq('.window_box');
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
        jq('body').append(box.fn.confirmStr);
        windowBoxOriginHight = 0;
       resizeWindowBox(); 

        box.fn.pos = [];
        var oldDocWidth = document.documentElement.clientWidth;
        box.fn.pos.push(oldDocWidth);
   
        if(bType.version == "6"  ){

            jq("html").css("overflow-y","visible");
            jq("body").css("overflow-y","hidden");
        }else if(bType.version == "7" || bType.version == "8"){
            jq("html").css("overflow-y","hidden");
            jq("body").css("overflow-y","hidden");
        }else{
            jq("body").css("overflow-y","hidden");
        };
         
        jq("body").css({"height":"100%"});
        var newDocWidth = document.documentElement.clientWidth;
        box.fn.pos.push(newDocWidth);
        var box_left = box.fn.pos[1] - box.fn.pos[0];

        jq('body').css('margin-right',''+box_left+'px');
        if(bType.name == "msie" && bType.version == "6"){
        var h = jq(window).scrollTop();
        jq('.translucence_layer').css({"top":h + "px", "height" : box.fn.wHeight + "px"});
        };
        jq('.window_box_btn_cancle').click(function(){
            jq('.window_box').remove();
            jq('.translucence_layer').remove();
            var cb =  checkBrowser();
            if(cb.version == "6"){
               jq("html").css("overflow-y","scroll");
               jq("body").css("overflow-y","visible");
            }else if(cb.version == "7" && jq('#st_pid').length != 1){
               jq("html").css("overflow-y","scroll");
               jq("body").css("overflow-y","visible");
            }else if(cb.version == "8" && jq('#st_pid').length != 1){
                jq("html").css("overflow-y","scroll");
                jq('body').css('overflow-y','visible');
            }else{
               jq("body").css("overflow-y","inherit"); 
            };
            
            jq('body').css('margin-right','0');
            
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
         jq(window).bind("resize",function() {
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
            jq('.window_box').css({
                left: box.fn.style.l,
                top: box.fn.style.t,
                width: box.fn.style.w,
                height: box.fn.style.h
            });
            if (box.fn.height == null) {
                box.fn.height = jq('.window_box').height();
                box.fn.top = box.fn.wScrollHeight + ( box.fn.wHeight > box.fn.height ? ( box.fn.wHeight - box.fn.height):0) / 2;
                jq('.window_box').css({
                    "height": "auto",
                    "top": box.fn.top
                });
            };
            windowBoxOriginHight = windowBoxOriginHight ? windowBoxOriginHight : jq('.window_box').height();
            var wbcHeight,wbcStyle;
            wbcHeight = windowBoxOriginHight > box.fn.wHeight ? box.fn.wHeight: windowBoxOriginHight;
            if(settings.showTitle === "block"){
                wbcHeight = wbcHeight - jq('.window_box_title').height();
            }
            wbcStyle = 'height:' + wbcHeight + 'px;';
            wbcStyle += windowBoxOriginHight > box.fn.wHeight ? 'overflow-y:scroll;':'';
            if(windowBoxOriginHight > box.fn.wHeight) {
                jq('.window_box_container').attr('style', wbcStyle); 
            }
        }
    };
   
    // 默认值
        jq.windowBox={defaults:{
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
		jq('.window_box').remove();
		jq('.translucence_layer').remove();
        var cb =  checkBrowser();
		 if(cb.version == "6"){
               jq("html").css("overflow-y","scroll");
               jq("body").css("overflow-y","visible");
            }else if(cb.version == "7" && jq('#st_pid').length != 1){
               jq("html").css("overflow-y","scroll");
               jq("body").css("overflow-y","visible");
            }else if(cb.version == "8" && jq('#st_pid').length != 1){
                jq("html").css("overflow-y","scroll");
                jq('body').css('overflow-y','visible');
            }else{
               jq("body").css("overflow-y","inherit"); 
            };
		jq('body').css('margin-right','0');
	    windowBoxOriginHight = 0;
};

 // 轮换图组件
!function(jq){
    jq.fn.slider=function(settings,t){
        if(!this.length){returnFalse()};
        settings=jq.extend({},jq.slider.defaults,settings);
        var obj=this;
        var scroller={};
        scroller.fn={};
        scroller.li = obj.find('li');
        scroller.sliderName = jq('.'+settings.sliderName+'');
        scroller.onNum = 0;
        scroller.auto = settings.auto;
        scroller.itemSum = scroller.li.length;
        scroller.bLeftBtn= obj.parent('div').find('a.bLeft');
        scroller.bRightBtn=obj.parent('div').find('a.bRight');
        scroller.bLeftBtnPer = settings.bLeft;
        scroller.bRightBtnPer = settings.bRight;
        scroller.moveSlider = settings.moveSlider;
        scroller.times = settings.time;
        scroller.opacity = settings.opacity;
        scroller.colorCout = 0;
        
        if(settings.fontLi) {
          scroller.font = jq('.slider_font');
          scroller.fontLi  =jq('.slider_font').find('li');
          scroller.font.find('li[class="'+settings.play+'"]').css("opacity","1");
        };
        /*if(!scroller.opacity && scroller.moveSlider){
            obj.css('left','-'+scroller.li.width()+'px')
          }*/
          if(settings.bgColor != "" && settings.bgLayer !="" && settings.bgColor.length == scroller.itemSum ){
                jq('.'+settings.bgLayer+'').css('background',''+settings.bgColor[0]+'');
              
          };
         // 方法：开始
        scroller.fn.on=function(){

          //alert("342")
          scroller.fn.off();
          scroller.fn.removeControl();
          scroller.fn.addControl();

          
          if(!scroller.auto){return;};
          scroller.run=setTimeout(function(){
            scroller.fn.goto(settings.direction);
          },scroller.times);
        };
        // 方法：停止
        scroller.fn.off=function(){
          if(typeof(scroller.run)!=="undefined"){clearTimeout(scroller.run);};
        };
        // 方法：增加控制
        scroller.fn.addControl=function(){
          if(scroller.bLeftBtnPer&&scroller.bLeftBtn.length){
            scroller.bLeftBtn.bind("click",function(){
              scroller.fn.goto("bLeft");
            });
          };
          if(scroller.bRightBtnPer&&scroller.bRightBtn.length){
            scroller.bRightBtn.bind("click",function(){
              scroller.fn.goto("bRight");
            });
          };
        };
        // 方法：解除控制
        scroller.fn.removeControl=function(){
          if(scroller.bLeftBtn.length){scroller.bLeftBtn.unbind("click");};
          if(scroller.bRightBtn.length){scroller.bRightBtn.unbind("click");};
        };

        //有轮播标记
        if(settings.markSlider && !scroller.moveSlider) {
          scroller.markLi  =obj.siblings('.'+settings.markClass+'').find('li');
          // 方法：点击轮播标记切换
          scroller.markLi.mouseenter(function(){
              scroller.fn.off();
              scroller.markNum = scroller.markLi.index(jq(this));
              scroller.li.addClass(''+settings.play+'').stop(1,1).css({
                opacity:"1",
                filter:"alpha(opacity=100)",
                display:"none"
              },settings.speed);
              scroller.li.eq(scroller.markNum-1).stop(1,1).css("opacity",'0.5').addClass(''+settings.play+'').css("display",'block').animate({opacity:"0"},settings.speed,function(){
              	jq(this).css('display','none');
              }); 
              scroller.li.eq(scroller.markNum).stop(1,1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed); 
              scroller.markLi.removeClass(''+settings.markLiClass+'');
              jq(this).addClass(''+settings.markLiClass+'');
              scroller.fn.on();
          });    
        }else if(settings.markSlider && scroller.moveSlider){
          scroller.markLi  =obj.siblings('.'+settings.markClass+'').find('li');
          scroller.markLi.on(settings.markEvent,function() {
				scroller.markNum = scroller.markLi.index(jq(this));
				scroller.li.removeClass(''+settings.play+'');
				scroller.li.eq(scroller.markNum+1).addClass(''+settings.play+'');
				scroller.markLi.removeClass(''+settings.markLiClass+'');
				obj.animate({
					left:'-'+(scroller.markNum+1)*scroller.li.width()+'px'
				});
				jq(this).addClass(''+settings.markLiClass+'');  
		  });	
		 
		  /*scroller.markLi.click(function(){
            scroller.markNum = scroller.markLi.index(jq(this));
            scroller.li.removeClass(''+settings.play+'');
            scroller.li.eq(scroller.markNum+1).addClass(''+settings.play+'');
            scroller.markLi.removeClass(''+settings.markLiClass+'');
            obj.animate({
            	left:'-'+(scroller.markNum+1)*scroller.li.width()+'px'
            });
            jq(this).addClass(''+settings.markLiClass+'');

          });*/
        };
        scroller.li.hover(function(){
    			scroller.fn.off();
    	},function(){
    		scroller.fn.on();
            scroller.colorCout == 1
    	});
        // 方法：滚动
        scroller.fn.goto=function(d){
          scroller.fn.off();
          if(settings.bLeft && settings.bRight){
            scroller.fn.removeControl();
          };
          
          obj.stop(true);
          if(!scroller.moveSlider){
          	 scroller.onCurNum = scroller.li.index(obj.find('li[class=""]'))  ;//play 位置
          }else{
          	 scroller.onCurNum = scroller.li.index(obj.find('li[class="'+settings.play+'"]'))  ;//play 位置	
          };
         
          if(scroller.opacity && !scroller.moveSlider){
          	scroller.li.eq(scroller.onCurNum).addClass(''+settings.play+'').stop(1, 1).animate({
    	      opacity:"0",
    	      filter:"alpha(opacity=0)"
    	    },settings.speed,function(){
              	jq(this).css({display:"none",opacity:"1"});
            });
          	//console.log(scroller.onCurNum)
          
           /*scroller.li.eq(scroller.onCurNum).css("opacity",'0.5').removeClass(''+settings.play+'').animate({
    	      opacity:"0",
    	      filter:"alpha(opacity=0)"
    	    },settings.speed,function(){
              	jq(this).css("display","none");
            });*/
          };
          
          if(settings.fontLi){
            scroller.fontLi.addClass(''+settings.play+'').stop(1, 1).animate({
              opacity:"0",
              filter:"alpha(opacity=0)"
            },0,function(){
                jq(this).css({display:"none",opacity:"1"});
            });;
          };
          switch(d){

            case "bRight":
    		//滑动
    		if(scroller.moveSlider && (scroller.onCurNum+1) == scroller.itemSum){//5
    			scroller.totalWidth = scroller.itemSum * scroller.li.width();
    			obj.css('left','-'+scroller.li.width()+'px');
    			obj.animate({left:'-'+2*scroller.li.width()+'px'});
    			scroller.li.removeClass(''+settings.play+'');
    			scroller.li.eq(2).addClass(''+settings.play+'');
    			if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(1).addClass(''+settings.markLiClass+'');}

    		}else if(scroller.moveSlider && scroller.onCurNum == 1){
    			obj.animate({left:'-'+2*scroller.li.width()+'px'});
    			scroller.li.removeClass(''+settings.play+'');
    			scroller.li.eq(2).addClass(''+settings.play+'');
    			if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(1).addClass(''+settings.markLiClass+'');}
    		}else if(scroller.moveSlider && scroller.onCurNum != scroller.itemSum){//1-4
    			obj.animate({
    			 left:'-'+(scroller.onCurNum+1)*scroller.li.width()+'px'
    			});
    			scroller.li.removeClass(''+settings.play+'');
    			scroller.li.eq(scroller.onCurNum+1).addClass(''+settings.play+'');
                
				/*if(settings.markSlider && (scroller.onCurNum+2) == scroller.itemSum){
                	scroller.markLi.removeClass(''+settings.markLiClass+'').eq(0).addClass(''+settings.markLiClass+'');
                }else{
                	scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.onCurNum).addClass(''+settings.markLiClass+'');
                }*/
				if(settings.markSlider) {
					if((scroller.onCurNum+2) == scroller.itemSum){
						scroller.markLi.removeClass(''+settings.markLiClass+'').eq(0).addClass(''+settings.markLiClass+'');
					}else{
						scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.onCurNum).addClass(''+settings.markLiClass+'');
					}	
				}
    		}
    		//渐隐
    		if(((scroller.onCurNum+1) == scroller.itemSum) && !scroller.moveSlider ){
                if(settings.bgColor != "" && settings.bgLayer !="" && settings.bgColor.length == scroller.itemSum && settings.bgColor != false){
                    jq('.'+settings.bgLayer+'').css('background',''+settings.bgColor[0]+'');
                };
    			jq('.'+settings.numClass+'').html("<em>1</em> / "  + scroller.itemSum);
                scroller.li.eq(0).stop(1, 1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed); 
                if(settings.fontLi) scroller.fontLi.eq(0).removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed); 

    			//sisi
    			if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(0).addClass(''+settings.markLiClass+'');}
    			//sisi
                

    		}else if(((scroller.onCurNum+1) != scroller.itemSum) && !scroller.moveSlider ){
                if(settings.bgColor != "" && settings.bgLayer !="" && settings.bgColor.length == scroller.itemSum && settings.bgColor != false){
                    jq('.'+settings.bgLayer+'').css('background',''+settings.bgColor[scroller.onCurNum+1]+'');
                }; 
    			jq('.'+settings.numClass+'').html("<em>"+( scroller.onCurNum + 2)+"</em> / "  + scroller.itemSum);

    			scroller.li.eq(scroller.onCurNum+1).stop(1, 1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed);


    			if(settings.fontLi) scroller.fontLi.eq(scroller.onCurNum+1).removeClass(''+settings.play+'').css("opacity",'1').animate({opacity:"1"},settings.speed,function(){
    				jq(this).css('display','block');
                
    		});

    		//sisi
    		if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.onCurNum+1).addClass(''+settings.markLiClass+'');}  
    		//sisi
    		};
            break;
            case "bLeft":
            //滑动
    		if(scroller.moveSlider && scroller.onCurNum == 0){//0
    			scroller.totalWidth = scroller.itemSum * scroller.li.width();
    			obj.css('left','-'+(scroller.itemSum-2)*scroller.li.width()+'px');
    			obj.animate({left:'-'+(scroller.itemSum-3)*scroller.li.width()+'px'});
    			scroller.li.removeClass(''+settings.play+'');
    			scroller.li.eq(scroller.onCurNum-3).addClass(''+settings.play+'');
                if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.onCurNum-2).addClass(''+settings.markLiClass+'');};
                
    		}else if(scroller.moveSlider && scroller.onCurNum == 1){
    			obj.animate({left:'0px'});
    			scroller.li.removeClass(''+settings.play+'');
    			scroller.li.eq(0).addClass(''+settings.play+'');
                if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.onCurNum+2).addClass(''+settings.markLiClass+'');};
                
    		}else if(scroller.moveSlider && scroller.onCurNum != scroller.itemSum){//1-4
    			obj.animate({
    			 left:'-'+(scroller.onCurNum-1)*scroller.li.width()+'px'
    			});
    			scroller.li.removeClass(''+settings.play+'');
    			scroller.li.eq(scroller.onCurNum-1).addClass(''+settings.play+'');
                if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.onCurNum-2).addClass(''+settings.markLiClass+'');}
                
    		};
    		//渐隐
    		if(scroller.onCurNum == 0  && !scroller.moveSlider ){
                if(settings.bgColor != "" && settings.bgLayer !="" && settings.bgColor.length == scroller.itemSum && settings.bgColor != false){
                      jq('.'+settings.bgLayer+'').css('background',''+settings.bgColor[scroller.itemSum-1]+'');
                  };
    			scroller.li.eq(scroller.itemSum-1).stop(1, 1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed,function(){
    				jq(this).css('display','block');
    			});

    			if(settings.fontLi) scroller.li.eq(scroller.itemSum-1).removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed); 
    			jq('.'+settings.numClass+'').html("<em>"+scroller.itemSum+"</em> / "  + scroller.itemSum);

    			//sisi
    			if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.itemSum-1).addClass(''+settings.markLiClass+'');};
    			//sisi
                

    		}else if(scroller.onCurNum != 0  && !scroller.moveSlider ){
                if(settings.bgColor != "" && settings.bgLayer !="" && settings.bgColor.length == scroller.itemSum && settings.bgColor != false){
                    jq('.'+settings.bgLayer+'').css('background',''+settings.bgColor[scroller.onCurNum-1]+'');
                };
           		scroller.li.eq(scroller.onCurNum-1).stop(1, 1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed);

    			if(settings.fontLi) scroller.fontLi.eq(scroller.onCurNum-1).removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed);  
    			jq('.'+settings.numClass+'').html("<em>"+( scroller.onCurNum )+"</em> / "  + scroller.itemSum);

    			//sisi
    			if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.onCurNum-1).addClass(''+settings.markLiClass+'');};
    			//sisi
                
    		}
    		break;

          }
          obj.queue(function(){
            if(settings.bLeft && settings.bRight ){
            	 scroller.fn.removeControl();
                 scroller.fn.addControl();
            };
            if(scroller.auto){
    	        scroller.run=setTimeout(function(){
    	             scroller.fn.goto(settings.direction);
    	       },scroller.times);
            };
           
            
            jq(this).dequeue();
          });
        };
            
        scroller.fn.on();
  };

  // 默认值
  jq.slider={defaults:{
      speed:800,      // 滚动速度
      time:4000,      // 自动滚动间隔时间
      play:"on",         //选中样式
      num:true,        //是否出现总数
      numClass:"slider_num" ,    // 总数显示区域
      auto:true,
      bLeft:true,                 //左控
      bRight:true ,            //右控
      direction:"bRight",  // 顺序
      fontLi:true,             //是否开启描述
      addControl:false,
      moveSlider:false,
      opacity:true,
      bgColor:false,
      //sisi
      markSlider:true,           //是否有轮播标记
      markClass:"slider_mark",       //轮播结构
      markLiClass:"mark_dot_on",        //轮播当前态class
	  markEvent:"click"//点击跳转
      //sisi
  }};
}(jQuery);
function returnFalse(){
    return false;
};
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


//判断是否安装Flash插件
function IsFlashEnabled() {
   var obj = checkBrowser(),
   	   re = false;
   if(obj.name == "msie" && obj.version == 6) {
	   try{
			//IE
			var swf1 = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
	   }catch(e){
		   try{
				//FireFox,Chrome
				var swf2=navigator.plugins["Shockwave Flash"];
				if(swf2==undefined){
					re = true;
				};
			}catch(ee){
			   re = true;
			}
		};
  };
  return re;//false启用 true未启用
} 


//设置初始UL宽度
(function(jq) {
	jq.fn.setWidth = function(margin) {
		var ul = jq(this),
			len = ul.find("li").length,
			w = ul.find("li").width() + margin,
			wAll = len*w;
				
		ul.css("width",wAll+"px");
	};
})(jQuery);

//图片切换
(function(jq) {
	jq.fn.slideTxq = function(settings) {
		var defaults = {
			derect:"left",//默认方向
			margin:13,
			leftBtn:".slide_l",
			rightBtn:".slide_r",
			time:500,//滑动一张时间
			num:5,//大于这个数滑动
			btnWrap:false//btn位置
		};
		settings = jq.extend(defaults,settings);
		var par = jq(this).parent(),
			ul = par.find("ul:eq(0)"),
			len = ul.find("li").length,
			w = ul.find("li").width() + settings.margin,
			btnL = par.nextAll(settings.leftBtn),
			btnR = par.nextAll(settings.rightBtn),
			that = jq(this),
			on_index = 0;
			
			
		if(settings.btnWrap) {
			btnL = par.find(settings.leftBtn);
			btnR = par.find(settings.rightBtn);	
		};

		jq(this).setWidth(settings.margin);
		if(settings.num < len) {
			jq(btnR).click(function() {
				if(!jq(that).is(":animated")) {
					ul.animate({"margin-left":"-"+w+"px"},settings.time,function() {
						ul.find("li:first").appendTo(ul);
						ul.css("margin-left",0);
					});
				};
			});
			jq(btnL).click(function() {
				if(!jq(that).is(":animated")) {
					ul.find("li:last").prependTo(ul).parent().css("margin-left",-w+"px");	
					ul.animate({"margin-left":"+="+w+"px"},settings.time);	
				};
			});	
		};
	};
})(jQuery);

//大的TAB切换
(function(jq) {
    jq.fn.tabToggle = function(settings) {
        var defaults = {
            target1: 'li',
            togClass: 'on',
            toggleDiv: false,
            fold: false,
            togDivObj: ''
        };

        var settings = jq.fn.extend({}, defaults, settings),
            li = jq(this).find(settings.target1),
            len = li.length,
            that = jq(this);

        li.click(function() {           
            if(!settings.fold) {
                jq(this).addClass(settings.togClass).siblings().removeClass(settings.togClass);
                if(settings.toggleDiv) {//需要切换DIV
                    var idx = li.index(jq(this)),
                        div = jq(settings.togDivObj);
                    div.hide().eq(idx).show();
                }
            } else {
                jq(this).toggleClass(settings.togClass).siblings('dd').toggle();
            }
        });
    };
})(jQuery);


//lazyload frame
(function($,window){var $window=$(window);$.fn.lazyload=function(options){var elements=this;var $container;var settings={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:window,data_attribute:"original",skip_invisible:true,appear:null,load:null};function update(){var counter=0;elements.each(function(){var $this=$(this);if(settings.skip_invisible&&!$this.is(":visible")){return};if($.abovethetop(this,settings)||$.leftofbegin(this,settings)){}else if(!$.belowthefold(this,settings)&&!$.rightoffold(this,settings)){$this.trigger("appear")}else{if(++counter>settings.failure_limit){return false}}})};if(options){if(undefined!==options.failurelimit){options.failure_limit=options.failurelimit;delete options.failurelimit};if(undefined!==options.effectspeed){options.effect_speed=options.effectspeed;delete options.effectspeed};$.extend(settings,options)};$container=(settings.container===undefined||settings.container===window)?$window:$(settings.container);if(0===settings.event.indexOf("scroll")){$container.bind(settings.event,function(event){return update()})};this.each(function(){var self=this;var $self=$(self);self.loaded=false;$self.one("appear",function(){if(!this.loaded){if(settings.appear){var elements_left=elements.length;settings.appear.call(self,elements_left,settings)};$("<img />").bind("load",function(){$self.hide().attr("src",$self.data(settings.data_attribute))[settings.effect](settings.effect_speed);self.loaded=true;var temp=$.grep(elements,function(element){return!element.loaded});elements=$(temp);if(settings.load){var elements_left=elements.length;settings.load.call(self,elements_left,settings)}}).attr("src",$self.data(settings.data_attribute))}});if(0!==settings.event.indexOf("scroll")){$self.bind(settings.event,function(event){if(!self.loaded){$self.trigger("appear")}})}});$window.bind("resize",function(event){update()});update();return this};$.belowthefold=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=$window.height()+$window.scrollTop()}else{fold=$(settings.container).offset().top+$(settings.container).height()};return fold<=$(element).offset().top-settings.threshold};$.rightoffold=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=$window.width()+$window.scrollLeft()}else{fold=$(settings.container).offset().left+$(settings.container).width()};return fold<=$(element).offset().left-settings.threshold};$.abovethetop=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=$window.scrollTop()}else{fold=$(settings.container).offset().top};return fold>=$(element).offset().top+settings.threshold+$(element).height()};$.leftofbegin=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=$window.scrollLeft()}else{fold=$(settings.container).offset().left};return fold>=$(element).offset().left+settings.threshold+$(element).width()};$.inviewport=function(element,settings){return!$.rightofscreen(element,settings)&&!$.leftofscreen(element,settings)&&!$.belowthefold(element,settings)&&!$.abovethetop(element,settings)};$.extend($.expr[':'],{"below-the-fold":function(a){return $.belowthefold(a,{threshold:0})},"above-the-top":function(a){return!$.belowthefold(a,{threshold:0})},"right-of-screen":function(a){return $.rightoffold(a,{threshold:0})},"left-of-screen":function(a){return!$.rightoffold(a,{threshold:0})},"in-viewport":function(a){return!$.inviewport(a,{threshold:0})},"above-the-fold":function(a){return!$.belowthefold(a,{threshold:0})},"right-of-fold":function(a){return $.rightoffold(a,{threshold:0})},"left-of-fold":function(a){return!$.rightoffold(a,{threshold:0})}})})(jQuery,window);




//ie6兼容position:fixed
//使用注意：在需要固定的元素上加上 tag='floatNavigator' 属性
function fixedPositionCompatibility() {
//判断是否ie6浏览器
if (isIE6) {
  var navigators = jq("[tag='floatNavigator']");
  if (!navigators.length) return;
  //判断每个浮层是靠顶部固定还是底部固定
  jq.each(navigators, function() {
    this.top = jq(this).css("top");
    this.bottom = jq(this).css("bottom");
    this.isTop = this.top == "auto" ? false : true;
    if(!this.isTop){
      this.bottom = 0;
    }
  });

  jq(window).bind("scroll", function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    jq.each(navigators, function() {
      var value = this.isTop ? scrollTop + parseInt(this.top) + "px" : scrollTop + jq(window).height() - jq(this).outerHeight() - parseInt(this.bottom) + "px";
      jq(this).css("top", value);
    });
  });
}
}




function showvideo(sid) {
        jQuery("#vedio_iframe").css("display", "block");
        jQuery("#grayfix").css({ "width": document.documentElement.scrollWidth + "px", "height": document.documentElement.scrollHeight + "px", "display": "block" });
        jQuery("#iframe_video").attr("src", "/video/video_msg.aspx?id="+sid);
}

function closevideo(a) {
        document.getElementById("grayfix").style.display = "none";
        jQuery("#" + a).css("display", "none");
        jQuery("#iframe_video").attr("src", "");
}

function setAboutNav(id) {
	jQuery("#about"+id).addClass("about_sidebar_cur");
	jQuery("#abtop"+id).addClass("about_nav_cur");
}
//标签切换组件
!function(jq){
    jq.fn.tabSelect = function(settings){
       if(!this.length){returnFalse();};
       settings=jq.extend({},jq.slider.defaults,settings);
       var tabS = {},
           obj = this;
       tabS.fn = {};
       tabS.fn.curr = settings.play;
       obj.find('li').mouseenter(function(){
          jq(this).parent().find('li').removeClass(''+tabS.fn.curr+'');
          jq(this).addClass(''+tabS.fn.curr+'');
          var n = jq(this).parent().find('li').index(jq(this));
          jq(this).parent().siblings('div').hide();
          jq(this).parent().siblings('div').eq(n).show();
          if(jq(this).parent().attr('v') != '1'){
              jq("img.lazy1").lazyload({
                    
              });
          };
          jq(this).parent().attr('v','1');

        });
    };
    jq.tabSelect = {defaults:{
       play:"on"  //选中样式

    }};
} (jQuery);

// 多行滚动
(function(jq){
		jq.fn.extend({
				Scroll:function(opt,callback){
					if(!opt) var opt={};
					var _this=this.eq(0).find("ul:first");
					var lineH=_this.find("li:first").height(), 
					line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10), 
					speed=opt.speed?parseInt(opt.speed,10):1000, //卷动速度，数值越大，速度越慢（毫秒）
					timer=opt.timer?parseInt(opt.timer,10):5000; //滚动的时间间隔（毫秒）
					if(line==0) line=1;
					var upHeight=0-line*lineH;
					scrollUp=function(){
						_this.animate({
						marginTop:upHeight
						},speed,function(){
						for(i=1;i<=line;i++){
						_this.find("li:first").appendTo(_this);
						}
						_this.css({marginTop:0});
						});
					}
					_this.hover(function(){
						clearInterval(timerID);
					},function(){
						timerID=setInterval("scrollUp()",timer);
					}).mouseout();
			}       
		})
})(jQuery);
	

	  //快捷登录回调
function submitDataCallback(Obj){
        jq.each(Obj,function(i,n){
            if(login_mobile){
                //用户登录情况下
                if(n.code!=-1){
                    //弹出成功框
                    clearKJLogin();
                    getLayer(jq('#mj-submitteS'));
                }else{
                    //弹出失败框
                    getLayer(jq('#mj-submitteF'));
                }
            }else{
                //用户未登录情况下
                if(n.code==1){
                    //用户不存在
                    clearKJLogin();
                    getLogin(_buyTitle,tel,0);
                }else if(n.code==2){
                    //用户存在
                    clearKJLogin();
                    getLogin(_login,tel,1);
                }else{
                    //弹出失败框
                    getLayer(jq('#mj-submitteF'));
                }
          }
        });
}

//手机号码验证正则
var mobilereg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d\d\d\d\d\d\d\d$/i;
    //邮箱验证正则
var emailreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    
 
	
var ftime = 60;
var timeFlows;
//验证码时间显示			
function SetReTime() {
    if (ftime > 0) {
        ftime--;
        jq("#dl_fsmm").html("（" + ftime + "秒后）重发");
    }
    else {
        ftime = 60;
        clearInterval(timeFlows);
        jq("#dl_wjmm").show();
        jq("#dl_fsmm").hide();
        //jq("#s_sms_nick_srand").text("");
    }
}

//隐藏提示信息
function hideTip(num){
			if(jq(".reg-tip22").attr('flag')==num){
			    jq(".mj-eed").hide();
			}
}

//判断中英文
function isChineseOrEng(temp)
{
	var regExp = /^[(\u4e00-\u9fa5)A-Za-z]+$/;
	if(temp=='姓氏'){
		return true;
	}
	if(regExp.test(temp))
			return false;
	 return true;
}
				
				//清空快捷登录
function clearKJLogin(){
		jq('#buyName').val('');
		jq('#buyMoblie').val('');
		jq('#buyNeed').val('');
}
function clearMSG()
{
	jq(".mj-inpuVs").html("");
}

function dw(s_in)
{
	document.write(s_in);
}

//placeholder兼容  
jQuery('[placeholder]').focus(function() {
       var input = jQuery(this);
       if (input.val() == input.attr('placeholder')) {
         input.val('');
         input.removeClass('placeholder');
         }
         }).blur(function() {
         var input = jQuery(this);
         if (input.val() == '' || input.val() == input.attr('placeholder')) {
         input.addClass('placeholder');
         input.val(input.attr('placeholder'));
         }
         }).blur().parents('form').submit(function() {
         jQuery(this).find('[placeholder]').each(function() {
         var input = jQuery(this);
         if (input.val() == input.attr('placeholder')) {
         input.val('');
         }
         })
});