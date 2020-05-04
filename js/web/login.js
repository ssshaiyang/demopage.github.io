$(document).ready(function() {
	$("#loginBtn").click(function(){
		login(this);
	});
});

//回车查询
$(document).keypress(function(e){
	if(e.keyCode == 13){
		login("#loginBtn");
	}
});

function login(btn){
	var username = $("#username").val();
	username = $.trim(username);
	if(username == ''){
		$("#message").html("请填写手机号码!");
		return false;
	}
	var password = $("#password").val();
	if(password == ''){
		$("#message").html("请填写密码!");
		return false;
	}
	$(btn).attr("disabled","disabled");
	$.ajax({
		type : "POST",
		url : "weblogin",
		data : {username:username, password:password},
		dataType : "json",
		success : function(data) {
			if(data == '0'){
				$("#message").html("登录失败,请重试!");
			} else if(data == '2'){
				$("#message").html("密码错误!");
			} else if(data == '3'){
				$("#message").html("手机号码不存在!");
			} else {
				$("#user_div").html('您好！'+username+' 【<a href="http://cz.xsbmxt.cn/js/web/webOutlogin?orgId=103" style="padding: 4px 16px;background: #FF8A00;border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px;">退出</a>】　　<a href="javascript:void(0);" onclick="AddFavorite(window.location,document.title)">添加收藏</a>');
				msgAlert("info", "提示", "欢迎您进入杭州市义务教育阶段新生入学管理平台");
				$(".login_bg").addClass("login_bg2");
				$(".login_bg").html('<ul><li>'+username+'家长您好，欢迎您进入杭州市义务教育阶段新生入学管理平台</li><li style="height: 60px; line-height:60px;"><a href="http://cz.xsbmxt.cn/js/web/getEnrollStudent?orgId2=103" class="bmopa">我要报名</a></li><li style="height: 50px;"><a href="http://cz.xsbmxt.cn/js/web/findEnrollmentList?orgId=103" class="bmopa">查看进度</a></li></ul>');
			}
			$(btn).removeAttr("disabled");
		}
	});
}