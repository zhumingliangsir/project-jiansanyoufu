/**********************************************************
 * 登录前设置
 * author：cth
 * 
 **********************************************************/
var downtime  	= 60;//倒计时(单位s)
var issend		= 0;
var isLoginhtml	= '';//是否加载过登录页面
var isDomain 	= true;
var newcopy		= new Array();
var copyArr		= new Array();
var ukey		= '';
var popupObj	= '';
copyArr['dl_account'] 	= '账号登录';
copyArr['dl_kaccount'] 	= '快捷登录';
copyArr['dl_uname'] 	= '请输入邮箱或手机号';
copyArr['dl_upass'] 	= '请输入密码（6-20位数字，字母或符号）';
copyArr['dl_msg'] 		= '验证即注册，未注册将自动创建账号';
copyArr['dl_mobile'] 	= '请输入手机号码';
copyArr['dl_mcode'] 	= '请输入手机验证码';
//有登陆页面
var ucLoginTemp = {
    //设置登录
    setLoginTemp: function (copy) {

        url = ucConfig.setPostUrl();
        newcopy = copy;
        ukey = getCookie(uckeystr);
        nickname = getCookie(ucnamestr); //alert(nickname);
        //isLoad = jQuery('#user-mj-login').length;
        logHtml = ucConfig.setLogInHtml();
        if (!ukey) {
            ucLoginTemp.getLogHtml(copy);
        }
        ucConfig.setLogIn(logHtml);
    },
    //获取登录页面
    getLogHtml: function (copy) {
        url = ucConfig.setPostUrl();
        if (!isLoginhtml) {
            $.ajax({
                type: "GET",
                url: HOST + "/login/getLogHtml/?" + url,
                dataType: "jsonp",
                jsonp: 'callback',
                complete: function (xhr, status) {
                    popUp(popupObj, true);
                },
                error: function (msg) {
                    //alert('验证失败');	
                },
                success: function (json) {
                    $.each(json, function (i, n) {
                        if (n.contents) {
                            $('body').append(n.contents);
                            isLoginhtml = n.contents;
                            setInitCopy(copy);
                            popupObj = $('.user-mj-loginM');
                        }
                    });
                }
            });
        } else {
            logNum = $('.user-mj-loginM').length;
            if (logNum == 0) {
                $('body').append(isLoginhtml);
            }
        }
    },
    //验证中心是否登录
    verifyLog: function () {
        ukey = getCookie(uckeystr);
        nickname = getCookie(ucnamestr);
        url = ucConfig.setPostUrl();
        $.ajax({
            type: "GET",
            url: HOST + "/api/verifyLog.aspx?" + url,
            dataType: "jsonp",
            jsonp: 'callback',
            error: function (msg) {
                //alert('验证失败');
            },
            success: function (json) {
                $.each(json, function (i, n) {
                    if (n.ukey) {
                        addUserCook(n.ukey, n.nickname, n.usermobile);
                        ucLoginTemp.setLoginTemp();
                    } else {
                        delteUserCook();
                    }
                });
            }
        });
    }
};

//验证用户
function verifyUser(){
	userstr = $.trim($('#uemail').val());
	type    = getUserType(userstr);
	if(type==0){
		$('#eTips').val()
	}
}
//倒计时(发送密码)
function setSendPowtime(val) {
    if (!val) {
        countdown = downtime;
    } else {
        countdown--;
    }
    if (countdown > 0) {
        issend = 1;
        $('#user-ms-sent').html(countdown + '秒后重新获取');
        setTimeout(function () {
            setSendPowtime(countdown);
        }, 1000);
    } else {
        issend = 0;
        $('#user-ms-sent').html('发送密码');
    }
    //console.log(countdown);
}
