/**********************************************************
 * 登录相关的全局设置
 * author：cth
 * 
 **********************************************************/

var HOSTCRM 	= 'http://crm.*.com/';
var crmkey		= 'sPu1lcLLxSOfg1aOb4g7haxnPZ';
var CRMNAME		= 'crm_name';
var CRMSESSID	= 'crm_sessid';
//------------------------------------------------------------- 


var HOST = 'http://my.jinsan.cn';//处理域名
var configUrl = '';//配置信息
var classid = 'nav_user_data';
var config = new Array();
var uckeystr = 'my_ukey';
var ucnamestr = 'my_nickname';
var ucmobile = 'my_mobile';
var validTime = 36000;
var isDelay = false;
var ucConfig = {
    //设置配置
    setConfig: function (time, key1, key2, islag) {
        exturl = '';
        isfun = isExitsFunction('zzGetCookie');
        if (isfun) {
            stsid = zzGetCookie('sid');
            starea = zzGetCookie('area');
            exturl = '&sid=' + stsid + '&area=' + starea;
        }
        cUrl = '&timestamp=' + time + '&nonceStr=' + key1 + '&signature=' + key2 + exturl;
        configUrl = cUrl;
        isDelay = islag ? true : false;
        //crm.verifyCrmLog();
    },
    //获取配置
    getConfigUrl: function () {
        return configUrl;
    },
    //把需要提交的数据设置成URL连接
    setPostUrl: function (data) {
        var url = '';
        newArray = data;
        for (var k in newArray) {
            url += '&' + k + '=' + newArray[k];
        }
        crm_ucname = getCookie(CRMNAME);
        coUrl = crm_ucname ? '' : ucConfig.getConfigUrl();
        return url + coUrl;
    },
    //设置登录信息
    setLogInHtml: function () {

        nickname = getCookie(ucnamestr);
        var logHtml = "<div rel=\"nofollow\" class=\"col_l htr_username_box\"><a href=\"javascript:;\" class=\"htr_username\">" +
                        "<p class=\"ect\">" + nickname + "</p><i class=\"triangle_down\"></i></a>" +
                        "<ul class=\"user_memu\" style=\"display:none\">" +
                        "<li><a href=\"" + HOST + "/account/index\">个人中心</a></li>";
        logHtml += "<li><a href=\"" + HOST + "/account/usercenter\" id=\"userbar-myinfo\" class=\"\">帐号设置</a></li>";
        logHtml += "<li><a href='javascript:void' id='user-mj-logexit'>退出</a></li></ul></div>";
        return logHtml;
    },
    setLogIn: function (string) {
        setLoginMsg(string);
        jQuery('#' + classid).children('div').hover(function () {
            jQuery(this).toggleClass('on');
            jQuery(this).children('ul').toggle();
            jQuery(this).children('a').find('i.triangle_down').toggleClass('triangle_up');
        });
    }
};

function setLoginMsg(string) {
    jQuery('#' + classid).html(string);
}

var ucUser = {
    //验证是否登录
    verifyLog: function () {

        ukey = getCookie(uckeystr);
        nickname = getCookie(ucnamestr);
        url = ucConfig.setPostUrl();
        var ObjJsonp = '';
        jQuery.ajax({
            type: "GET",
            url: HOST + "/sso/verifyLog?" + url,
            dataType: "jsonp",
            jsonp: 'callback',
            complete: function (xhr, status) {
                verifyLogCallback(ObjJsonp);
            },
            error: function (msg) { },
            success: function (json) {
                jQuery.each(json, function (i, n) {
                    if (n.ukey) {
                        addUserCook(n.ukey, n.nickname, n.usermobile);
                        ucLoginTemp.setLoginTemp();
                    } else {
                        //设置显示
                        var loginMsg = "<a href=\"" + HOST + "/login\"  class=\"htr_login\">登录</a>" +
                                       "<a href=\"" + HOST + "/register\" class=\"htr_reg\">注册</a>";
                        
                        setLoginMsg(loginMsg);
                        delteUserCook();

                    }
                });
                ObjJsonp = json;
            }
        });
    },
    /**
	* 验证用户是否存在
	* @author	
	* @since	2016/3/01
	* @param    array||string	$data  	 数据包或账户(数据包必须包含tel字段)
	* @return	void
	*/
    exist: function (data) {
        account = isArray(data) ? data['tel'] : data;
        url = ucConfig.setPostUrl();
        var ObjJsonp = '';
        jQuery.ajax({
            type: "GET",
            url: HOST + "/sso/verifyUser?" + url,
            dataType: "jsonp",
            jsonp: 'callback',
            data: { 'account': account },
            complete: function (xhr, status) {
                existCallback(ObjJsonp, data);
            },
            error: function (msg) { },
            success: function (json) {
                ObjJsonp = json;
            }
        });
    },
    //退出
    logexit: function (isload) {
        isload = isload ? 1 : 0;
        var ObjJsonp = '';
        url = ucConfig.setPostUrl();
        jQuery.ajax({
            type: "GET",
            url: HOST + "/sso/logout?" + url,
            dataType: "jsonp",
            jsonp: 'callback',
            complete: function (xhr, status) {
                logexitCallback(ObjJsonp);
            },
            error: function (msg) {

            },
            success: function (json) {
                delteUserCook();
                if (isload == 1) {
                    window.location.reload();
                }
                ObjJsonp = json;
            }
        });
    }
};

jQuery(document).ready(function () {
	ucUser.verifyLog();

  //退出
	jQuery(document).on('click', "#user-mj-logexit", function () {
	    ucUser.logexit(1);
	    return false;
	});
});

function getJsId() {
    num = Math.round(Math.random() * 1000000) + Math.round(Math.random() * 10);
    return num;
}

sjid = '?'+getJsId();




document.write("<scr" + "ipt type=\"text/javascript\" charset=\"utf-8\" src=\"" + HOST + "/static/scripts/sso/tool.js" + sjid + "\"></scr" + "ipt>");//工具函数

//登录
document.write("<scr" + "ipt type=\"text/javascript\" charset=\"utf-8\" src=\"" + HOST + "/static/scripts/sso/userlog.js" + sjid + "\"></scr" + "ipt>");
document.write("<scr" + "ipt type=\"text/javascript\" charset=\"utf-8\" src=\"" + HOST + "/static/scripts/sso/usernetwork.js" + sjid + "\"></scr" + "ipt>");
document.write("<scr" + "ipt type=\"text/javascript\" charset=\"utf-8\" src=\"" + HOST + "/static/scripts/sso/usercallback.js" + sjid + "\"></scr" + "ipt>");

