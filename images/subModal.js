/** 
 * SUBMODAL v1.6
 * Used for displaying DHTML only popups instead of using buggy modal windows.
 *
 * By Subimage LLC
 * http://www.subimage.com
 *
 * Contributions by:
 * 	Eric Angel - tab index code
 * 	Scott - hiding/showing selects for IE users
 *	Todd Huss - inserting modal dynamically and anchor classes
 *
 * Up to date code can be found at http://submodal.googlecode.com
 */
// Popup code

var gPopupMask = null;
var gPopupContainer = null;
var gPopFrame = null;
var gReturnFunc;
var gPopupIsShown = false;

var gDefaultPage = "http://www.jsyun.cc/gb_js/popuploading.html";
var gHideSelects = false;
var gReturnVal = null;

var gTabIndexes = new Array();
// Pre-defined list of tags we want to disable/enable tabbing into
var gTabbableTags = new Array("A","BUTTON","TEXTAREA","INPUT","IFRAME");	
var subModal_parent=false;

// If using Mozilla or Firefox, use Tab-key trap.
if (!document.all) {
	document.onkeypress = keyDownHandler;
}

/**
 * Initializes popup code on load.	
 */
function initPopUp() {

	// Add the HTML to the body
	theBody = document.getElementsByTagName('BODY')[0];
	popmask = document.createElement('div');
	popmask.id = 'popupMask';
	popcont = document.createElement('div');
	popcont.id = 'popupContainer';
	popcont.innerHTML = '' +
		'<div id="popupInner">' +
			'<div id="popupTitleBar">' +
				'<div id="popupTitle"></div>' +
				'<div id="popupControls">' +
					'<span onclick="hidePopWin(true);" id="popCloseBox" style="background:url(http://static.jsyun.cc/static/images/new_yz_jl_bg.png) no-repeat 0 -297px;width:32px;height:32px;display:block;"></span> ' +
				'</div>' +
			'</div>' +
			'<iframe src="'+ gDefaultPage +'" style="width:100%;height:100%;background-color:transparent;" scrolling="auto" frameborder="0" allowtransparency="true" id="popupFrame" name="popupFrame" width="100%" height="100%"></iframe>' +
		'</div>';
	theBody.appendChild(popmask);
	theBody.appendChild(popcont);
	
	gPopupMask = document.getElementById("popupMask");
	gPopupContainer = document.getElementById("popupContainer");
	gPopFrame = document.getElementById("popupFrame");	
	
	// check to see if this is IE version 6 or lower. hide select boxes if so
	// maybe they'll fix this in version 7?
	var brsVersion = parseInt(window.navigator.appVersion.charAt(0), 10);
	if (brsVersion <= 6 && window.navigator.userAgent.indexOf("MSIE") > -1) {
		gHideSelects = true;
	}
	
	// Add onclick handlers to 'a' elements of class submodal or submodal-width-height
	var elms = document.getElementsByTagName('a');
	for (i = 0; i < elms.length; i++) {
		if (elms[i].className.indexOf("submodal") == 0) { 
			// var onclick = 'function (){showPopWin(\''+elms[i].href+'\','+width+', '+height+', null);return false;};';
			// elms[i].onclick = eval(onclick);
			elms[i].onclick = function(){
				// default width and height
				var width = 400;
				var height = 200;
				// Parse out optional width and height from className
				params = this.className.split('-');
				if (params.length == 3) {
					width = parseInt(params[1]);
					height = parseInt(params[2]);
				}
				showPopWin(this.href,width,height,null); return false;
			}
		}
	}
}
//addEvent(window, "load", initPopUp);
jQuery(function() {
	initPopUp();
});

 /**
	* @argument width - int in pixels
	* @argument height - int in pixels
	* @argument url - url to display
	* @argument returnFunc - function to call when returning true from the window.
	* @argument showCloseBox - show the close box - default true
	*/
function showPopWin(url, width, height, returnFunc, showCloseBox) {
	// show or hide the window close widget
	if (showCloseBox == null || showCloseBox == true) {
		document.getElementById("popCloseBox").style.display = "block";
	} else {
		document.getElementById("popCloseBox").style.display = "none";
	}
	
	if(url.search('pop_login.php')>0){
		width=627;
		height=388;
	}
	if(url.search('reg_new.php')>0){
		width=630;
		height=560;
	}
	
	gPopupIsShown = true;
	disableTabIndexes();
	gPopupMask.style.display = "block";
	gPopupContainer.style.display = "block";
	// calculate where to place the window on screen
	centerPopWin(width, height);
	
	var titleBarHeight = parseInt(document.getElementById("popupTitleBar").offsetHeight, 10);


	gPopupContainer.style.width = width + "px";
	gPopupContainer.style.height = (height+titleBarHeight) + "px";
	
	setMaskSize();

	// need to set the width of the iframe to the title bar width because of the dropshadow
	// some oddness was occuring and causing the frame to poke outside the border in IE6
	gPopFrame.style.width = parseInt(document.getElementById("popupTitleBar").offsetWidth, 10) + "px";
	gPopFrame.style.height = (height) + "px";
	
	// set the url
	gPopFrame.src = url;
	
	gReturnFunc = returnFunc;
	// for IE
	if (gHideSelects == true) {
		hideSelectBoxes();
	}
	
	window.setTimeout("setPopTitle();", 600);
}

//
var gi = 0;
function centerPopWin(width, height) {
	if (gPopupIsShown == true) {
		if (width == null || isNaN(width)) {
			width = gPopupContainer.offsetWidth;
		}
		if (height == null) {
			height = gPopupContainer.offsetHeight;
		}
		
		//var theBody = document.documentElement;
		var theBody = document.getElementsByTagName("BODY")[0];
		//theBody.style.overflow = "hidden";
		var scTop = parseInt(getScrollTop(),10);
		var scLeft = parseInt(theBody.scrollLeft,10);
	
		setMaskSize();
		
		var titleBarHeight = parseInt(document.getElementById("popupTitleBar").offsetHeight, 10);
		
		var fullHeight = getViewportHeight();
		var fullWidth = getViewportWidth();
		
		gPopupContainer.style.top = (scTop + ((fullHeight - (height+titleBarHeight)) / 2)) + "px";
		gPopupContainer.style.left =  (scLeft + ((fullWidth - width) / 2)) + "px";
	}
}
addEvent(window, "resize", centerPopWin);
addEvent(window, "scroll", centerPopWin);
window.onscroll = centerPopWin;


/**
 * Sets the size of the popup mask.
 *
 */
function setMaskSize() {
	var theBody = document.getElementsByTagName("BODY")[0];
			
	var fullHeight = getViewportHeight();
	var fullWidth = getViewportWidth();
	
	// Determine what's bigger, scrollHeight or fullHeight / width
	if (fullHeight > theBody.scrollHeight) {
		popHeight = fullHeight;
	} else {
		popHeight = theBody.scrollHeight;
	}
	
	if (fullWidth > theBody.scrollWidth) {
		popWidth = fullWidth;
	} else {
		popWidth = theBody.scrollWidth;
	}
	
	gPopupMask.style.height = popHeight + "px";
	gPopupMask.style.width = "100%";
}

/**
 * @argument callReturnFunc - bool - determines if we call the return function specified
 * @argument returnVal - anything - return value 
 */
function hidePopWin(callReturnFunc) {

	
}

try{	
	/*
	    var username    = getCookie('cookie_user_name_remember');
			
			function createUserNav() {
				  var str_havel='';
	        //用户身份
	        var ind = 'yz';
	        var uid = getCookie('user_uid');	
	        str_havel='<div rel="nofollow" class="col_l htr_username_box"><a href="javascript:;" class="htr_username"><p class="ect">'+username+'</p><i class="triangle_down"></i></a><ul class="user_memu" style="display:none"><li><a href="/account/">个人中心</a></li>';
	        if(ind=='yz'){
	            str_havel += '<li><a href="/account/accountcenter/identitymessage.aspx" id="userbar-myinfo" class="">帐号设置</a></li>'; 
	        }else if(ind=='zs'){ 
	            str_havel += '<li><a href="#">公司主页</a></li>';  
	            str_havel += '<li><a href="/account/accountcenter/identitymessage.aspx" >帐号设置</a></li>'; 
	        };
	        str_havel += '<li><a href="/logout/">退出</a></li></ul></div>';
					
	        var labelObj = jQuery('#nav_user_data');
	                labelObj.html(str_havel);
	
	                labelObj.children('div').hover(function() {
	                    jQuery(this).toggleClass('on');
	                    jQuery(this).children('ul').toggle();
	                    jQuery(this).children('a').find('i.triangle_down').toggleClass('triangle_up');
	                });    
	    };
	    if(typeof(username)!='undefined'&&username!=""&&username!="deleted"){
	        createUserNav();
	    };
		*/
		/*        
	        jQuery.ajax({ 
	            async:true, 
	            type:"GET",      
	            dataType: 'jsonp',      
	            url:"/api/fun/get_message_count.aspx", 
	            data:{ind:ind,uid:uid}, 
	            async: false, 
	            success:function(data) {  
	            	
	                if(data.status=="1") { 
	                    str_havel += data.message;
	                } 
	        
	            }    
	        });     
	  */   
	}catch(e){}
		
/**
 * Sets the popup title based on the title of the html document it contains.
 * Uses a timeout to keep checking until the title is valid.
 */
function setPopTitle() {
	return;
	if (window.frames["popupFrame"].document.title == null) {
		window.setTimeout("setPopTitle();", 10);
	} else {
		document.getElementById("popupTitle").innerHTML = window.frames["popupFrame"].document.title;
	}
}

// Tab key trap. iff popup is shown and key was [TAB], suppress it.
// @argument e - event - keyboard event that caused this function to be called.
function keyDownHandler(e) {
    if (gPopupIsShown && e.keyCode == 9)  return false;
}

// For IE.  Go through predefined tags and disable tabbing into them.
function disableTabIndexes() {
	if (document.all) {
		var i = 0;
		for (var j = 0; j < gTabbableTags.length; j++) {
			var tagElements = document.getElementsByTagName(gTabbableTags[j]);
			for (var k = 0 ; k < tagElements.length; k++) {
				gTabIndexes[i] = tagElements[k].tabIndex;
				tagElements[k].tabIndex="-1";
				i++;
			}
		}
	}
}

// For IE. Restore tab-indexes.
function restoreTabIndexes() {
	if (document.all) {
		var i = 0;
		for (var j = 0; j < gTabbableTags.length; j++) {
			var tagElements = document.getElementsByTagName(gTabbableTags[j]);
			for (var k = 0 ; k < tagElements.length; k++) {
				tagElements[k].tabIndex = gTabIndexes[i];
				tagElements[k].tabEnabled = true;
				i++;
			}
		}
	}
}


/**
 * Hides all drop down form select boxes on the screen so they do not appear above the mask layer.
 * IE has a problem with wanted select form tags to always be the topmost z-index or layer
 *
 * Thanks for the code Scott!
 */
function hideSelectBoxes() {
  var x = document.getElementsByTagName("SELECT");

  for (i=0;x && i < x.length; i++) {
    x[i].style.visibility = "hidden";
  }
}

/**
 * Makes all drop down form select boxes on the screen visible so they do not 
 * reappear after the dialog is closed.
 * 
 * IE has a problem with wanting select form tags to always be the 
 * topmost z-index or layer.
 */
function displaySelectBoxes() {
  var x = document.getElementsByTagName("SELECT");

  for (i=0;x && i < x.length; i++){
    x[i].style.visibility = "visible";
  }
}
function addEvent(obj, evType, fn){
 if (obj.addEventListener){
    obj.addEventListener(evType, fn, false);
    return true;
 } else if (obj.attachEvent){
    var r = obj.attachEvent("on"+evType, fn);
    return r;
 } else {
    return false;
 }
}
function removeEvent(obj, evType, fn, useCapture){
  if (obj.removeEventListener){
    obj.removeEventListener(evType, fn, useCapture);
    return true;
  } else if (obj.detachEvent){
    var r = obj.detachEvent("on"+evType, fn);
    return r;
  } else {
    alert("Handler could not be removed");
  }
}
function getViewportHeight() {
	if (window.innerHeight!=window.undefined) return window.innerHeight;
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
	if (document.body) return document.body.clientHeight; 

	return window.undefined; 
}
function getViewportWidth() {
	var offset = 17;
	var width = null;
	if (window.innerWidth!=window.undefined) return window.innerWidth; 
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientWidth; 
	if (document.body) return document.body.clientWidth; 
}

function getScrollTop() {
	if (self.pageYOffset)
	{
		return self.pageYOffset;
	}
	else if (document.documentElement && document.documentElement.scrollTop)
	{
		return document.documentElement.scrollTop;
	}
	else if (document.body)
	{
		return document.body.scrollTop;
	}
}
function getScrollLeft() {
	if (self.pageXOffset)
	{
		return self.pageXOffset;
	}
	else if (document.documentElement && document.documentElement.scrollLeft)
	{
		return document.documentElement.scrollLeft;
	}
	else if (document.body)
	{
		return document.body.scrollLeft;
	}
}

function setNavBar(s_id)
{
	jQuery('#top'+s_id).addClass("current");
}
function setNavBarLeft(s_id)
{
	jQuery('#case'+s_id).addClass("current_title");
}
function setNavZiZhiBar(s_id)
{
	jQuery('#jz'+s_id).addClass("jzon");
}
function setNavJRBar(s_id)
{
	jQuery('#jr'+s_id).addClass("current");
}

function onshow()
{
	alert("ddcdcc");	
}

function AddClick(i_cid)
{
	new Image().src="/operate.aspx?sel=4&cid="+i_cid;
}

function getToDay(){
	   var now = new Date();
	   var nowYear = now.getFullYear();
	   var nowMonth = now.getMonth();
	   var nowDate = now.getDate();
	   newdate = new Date(nowYear,nowMonth,nowDate);
	   nowMonth = doHandleMonth(nowMonth + 1);
	   nowDate = doHandleMonth(nowDate);
	   return nowMonth+"月"+nowDate+"日";
}	
function doHandleMonth(month){
	   if(month.toString().length == 1){
	    month = "0" + month;
	   }
	   return month;
}
function getYesterDay(){
	   var newtimems=newdate.getTime()-(24*60*60*1000);
	   var yesd = new Date(newtimems);
	   var yesYear = yesd.getFullYear();
	   var yesMonth = yesd.getMonth();
	   var yesDate = yesd.getDate();
	   yesMonth = doHandleMonth(yesMonth + 1);
	   yesDate = doHandleMonth(yesDate);
	   return yesYear+"-"+yesMonth+"-"+yesDate;
}