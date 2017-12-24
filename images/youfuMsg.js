//手机号码验证正则
var mobilereg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d\d\d\d\d\d\d\d$/i;
//邮箱验证正则
var emailreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

jQuery(document).ready(function () {

    var login_mobile;

    ///悬浮窗的标题配置
    if (login_mobile && isIndex) {
        //将用户电话号码放到该框中
        jQuery('#buyMoblie').val(login_mobile);
    }

    var d_timer = new Date().getMilliseconds();
    //发布事件
    jQuery('#mj-from-btn').click(function () {

        jQuery("#mj-from-btn").addClass("disableM");
        if (jQuery('#mj-from-btn').text() == "下一步" || jQuery('#mj-from-btn').text() == "立即登记") {
            name = jQuery.trim(jQuery('#buyName').val());
            tel = jQuery.trim(jQuery('#buyMoblie').val());
            subject = jQuery.trim(jQuery('#buyNeed').val()) + "   " + jQuery.trim(jQuery('#buyMeno').val());

            //验证手机号码
            if (!tel || !mobilereg.test(tel) || tel.length != 11) {
                jQuery(".mj-eed").show();
                jQuery(".reg-tip22 em").text('请输入手机号码');
                jQuery(".mj-newjy").css("margin-top", "15px");
                jQuery(".reg-tip22").attr('flag', 2);
                jQuery(".mj-form-tel").css("border", "1px solid #ff5256");
                return false;
            }
            if (!login_mobile && isChineseOrEng(name)) {
                jQuery(".mj-eed").show();
                jQuery(".reg-tip22 em").show().text('姓氏必须为中英文');
                jQuery(".mj-newjy").css("margin-top", "15px");
                jQuery(".mj_form_wrapper_input").css("border", "1px solid #ff5256");
                jQuery(".reg-tip22").attr('flag', 3);
                return false;
            }
            if (!(subject) || subject == '请填写您的需求') {
                jQuery(".mj-eed").show();
                jQuery(".reg-tip22 em").show().text('请输入内容');
                jQuery(".mj-newjy").css("margin-top", "15px");
                jQuery(".mj-form-wrapper").css("border", "1px solid #ff5256");
                jQuery(".reg-tip22").attr('flag', 1);
                return false;
            }
            jQuery(".mj-eed").hide();

            jQuery('#mj-from-btn').text("信息提交中...");

            var successStr = '<div class="dl_title mj-lmTop"><h6>亲，提交成功了</h6><p>系统已将登录密码发送到你手机，登录即可查看进展。</p><p>我们也会在10分钟向你确认需求</p></div>' +
            '<div class="mj-lmBottom">' +
            '<div class="ms-errorTips ms-errorTips2"><p id="loginTips" class="reg-tip reg-tip33" style="display:none"><i class="us-icon us-icon19"></i><em></em></p></div>' +
            '<div class="ms-phoneInput f-clearfix"><div class="mj-form-wrappers fl" style="width: 158px;"><span class="mj-inpuVs mj-mlspan"></span><div class="ms-input mj-input"><i class="us-icon uj-icon5"></i><input id="loginUser" value="' + tel + '" type="text"/></div></div><a id="dl_wjmm" class="ms-sent" style="display:none;">重新获取验证码</a><a id="dl_fsmm"  class="ms-sent aaaa">验证码,发送中...</a></div>' +
            '<div class="mj-form-wrappers"><span class="mj-inpuVs mj-mlspan">请输入密码</span>' +
            '<div class="ms-input mj-input"><i class="us-icon us-iconmi"></i>' +
            '<input id="loginPass" type="password" onclick="clearMSG()" /></div></div>' +
            '<a id="dl_sub" class="ms-loginBtn yzm" href="javascript:;" onclick="LeftLogin()">立即登录</a></div>';

            jQuery.ajax({
                url: HOST + '/sso/submit_demand?name=' + name + '&tel=' + tel + '&subject=' + subject + '&do=add&msgid=' + jQuery('#msgid').val(),
                type: 'GET',
                dataType: "jsonp",
                jsonp: 'callback',
                success: function (json) {
                    jQuery.each(json, function (i, n) {
                        if (n.msg) {
                            //用户登录
                            jQuery('.window_box').windowBox({
                                width: 360,
                                title: "",
                                wbcStr: successStr
                            });
                            clearKJLogin();
                            timeFlows = setInterval(SetReTime, 1000);
                            jQuery('#mj-from-btn').text("下一步");
                        }
                    });
                }
            });
        }
        jQuery("#mj-from-btn").removeClass("disableM");
    });

    //提交
    jQuery('#q_but').click(function () {
        jQuery('#q_but').addClass("disableM");

        if (jQuery('#q_but').text() == "立即提交") {
            jQuery('#q_but').text("信息提交中...");
            var sub_ject = jQuery.trim(jQuery('#sub_ject').val());
            var sub_tel = jQuery.trim(jQuery('#sub_tel').val());
            if (!sub_tel || !mobilereg.test(sub_tel) || sub_tel.length != 11) {
                jQuery(".sub_msg").text('请输入手机号码');
                jQuery("#sub_tel").css("border", "1px solid #ff5256");
                jQuery('#q_but').text("立即提交");
                return false;
            }
            if (!(sub_ject) || sub_ject == '请填写您的需求') {
                jQuery(".sub_msg").show().text('请输入内容');
                jQuery("#sub_ject").css("border", "1px solid #ff5256");
                jQuery('#q_but').text("立即提交");
                return false;
            }

            var successStr = '<div class="dl_title mj-lmTop"><h6>亲，提交成功了</h6><p>系统已将登录密码发送到你手机，登录即可查看进展。</p><p>我们也会在10分钟向你确认需求</p></div>' +
                '<div class="mj-lmBottom">' +
                '<div class="ms-errorTips ms-errorTips2"><p id="loginTips" class="reg-tip reg-tip33" style="display:none"><i class="us-icon us-icon19"></i><em></em></p></div>' +
                '<div class="ms-phoneInput f-clearfix"><div class="mj-form-wrappers fl" style="width: 158px;"><span class="mj-inpuVs mj-mlspan"></span><div class="ms-input mj-input"><i class="us-icon uj-icon5"></i><input id="loginUser" value="' + sub_tel + '" type="text"/></div></div><a id="dl_wjmm" class="ms-sent" style="display:none;">重新获取验证码</a><a id="dl_fsmm"  class="ms-sent aaaa">验证码,发送中...</a></div>' +
                '<div class="mj-form-wrappers"><span class="mj-inpuVs mj-mlspan">请输入密码</span>' +
                '<div class="ms-input mj-input"><i class="us-icon us-iconmi"></i>' +
                '<input id="loginPass" type="password" onclick="clearMSG()" /></div></div>' +
                '<a id="dl_sub" class="ms-loginBtn yzm" href="javascript:;" onclick="LeftLogin()">立即登录</a></div>';

            jQuery.ajax({
                url: HOST + '/sso/submit_demand?tel=' + sub_tel + '&subject=' + sub_ject + '&do=add',
                type: 'GET',
                dataType: "jsonp",
                jsonp: 'callback',
                success: function (json) {
                    jQuery.each(json, function (i, n) {
                        if (n.msg) {
                            //用户登录
                            jQuery('.window_box').windowBox({
                                width: 360,
                                title: "",
                                wbcStr: successStr
                            });
                            closeM(1);
                            clearInputM();
                            timeFlows = setInterval(SetReTime, 1000);
                            jQuery('#q_but').text("立即提交");
                        }
                    });
                }
            });
        }
    });

    //提交问题
    jQuery('#question-from').click(function () {
        //var s_name =
        jQuery("#question-from").addClass("disableM");

        var s_tel = jQuery.trim(jQuery('#tel-area').val());
        var s_subject = jQuery.trim(jQuery('#title-area').val());
        var s_memo = jQuery.trim(jQuery('#content-area').val());

        var s_classid = jQuery.trim(jQuery('#wealth-select').val());

        if (s_subject == "" || s_subject == "请在这里概述您的问题") {
            jQuery('#title-area').addClass("border-red");
            jQuery('#title-error-tip').html("您尚未输入提问");
            return false;
        }

        if (s_tel == "" || !mobilereg.test(s_tel) || s_tel.length != 11) {
            jQuery("#tel-tip").html("请在这里留下您的电话，方便通知您最新的回答");
            jQuery("#tel-area").addClass("border-red");
            return false;
        }

        if (s_classid == "") {
            jQuery('#wealth-select').addClass("border-red");
            jQuery('.class-tip').html("请选择问题类别");
            return false;
        }

        var successStr = '<div class="dl_title mj-lmTop"><h6>亲，提交成功了</h6><p>系统已将登录密码发送到你手机，登录即可查看进展。</p><p>我们也会在10分钟向你确认需求</p></div>' +
            '<div class="mj-lmBottom">' +
            '<div class="ms-errorTips ms-errorTips2"><p id="loginTips" class="reg-tip reg-tip33" style="display:none"><i class="us-icon us-icon19"></i><em></em></p></div>' +
            '<div class="ms-phoneInput f-clearfix"><div class="mj-form-wrappers fl" style="width: 158px;"><span class="mj-inpuVs mj-mlspan"></span><div class="ms-input mj-input"><i class="us-icon uj-icon5"></i><input id="loginUser" value="' + s_tel + '" type="text"/></div></div><a id="dl_wjmm" class="ms-sent" style="display:none;">重新获取验证码</a><a id="dl_fsmm"  class="ms-sent aaaa">验证码,发送中...</a></div>' +
            '<div class="mj-form-wrappers"><span class="mj-inpuVs mj-mlspan">请输入密码</span>' +
            '<div class="ms-input mj-input"><i class="us-icon us-iconmi"></i>' +
            '<input id="loginPass" type="password" onclick="clearMSG()" /></div></div>' +
            '<a id="dl_sub" class="ms-loginBtn yzm" href="javascript:;" onclick="LeftLogin()">立即登录</a></div>';

        jQuery.ajax({
            url: HOST + '/sso/submit_demand_question?tel=' + s_tel + '&subject=' + s_subject + '&memo=' + s_memo + '&do=add&msgid=' + s_classid,
            type: 'GET',
            dataType: "jsonp",
            jsonp: 'callback',
            success: function (json) {
                jQuery.each(json, function (i, n) {
                    if (n.msg) {
                        //用户登录
                        jQuery('.window_box').windowBox({
                            width: 360,
                            title: "",
                            wbcStr: successStr
                        });
                        jQuery('#title-area').val('');
                        jQuery('#content-area').val('');
                        jQuery('#tel-area').val('');
                        timeFlows = setInterval(SetReTime, 1000);
                    }
                });
            }
        });

        jQuery("#question-from").removeClass("disableM");
    });
});



function LeftLogin() {
    var divtel = jQuery.trim(jQuery('#loginUser').val());
    var divpassword = jQuery.trim(jQuery('#loginPass').val());

    if (!divtel || !mobilereg.test(divtel) || divtel.length != 11) {
        jQuery(".reg-tip33").show().text('手机号码不能为空');
        return false;
    }
    if (!divpassword) {
        jQuery(".reg-tip33").show().text('请填写短信密码');
        return false;
    }

    jQuery.ajax({
        url: HOST + '/sso/submit_demand_login?tel=' + divtel + '&pwd=' + divpassword + '&do=login',
        type: 'GET',
        dataType: "jsonp",
        jsonp: 'callback',
        success: function (json) {
            jQuery.each(json, function (i, n) {
                if (n.msg == "ok") {
                    window.location.reload();
                }
                else {
                    jQuery(".reg-tip33").show().text('密码错误,请确认密码是否有效,或重新获取密码');
                }
            });
        }
    });
}
