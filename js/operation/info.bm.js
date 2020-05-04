function alertInfoSure(){
	var htmls = "<div style='width:390px; height:260px; background:#fff; padding:10px 10px;'><h2 style='color:red;text-align:center;'>承诺书</h2>";
	htmls += "<p style='text-indent:2em; color:#666; text-align:left;font-family:Microsoft YaHei; padding-top:10px; padding-bottom:10px;'>本人保证所填写的摸底信息真实准确，如有虚假，后果自负！ </p>";
	htmls += "<p style='line-height:40px; color:#333;'><input type='checkbox' name='chkenrollment' checked='checked' value='1' style='width:20px; height:20px;'/> 我同意</p>";
	htmls += "<button style='width:200px; height:40px; line-height:40px; background-color:#0099FF; color:#fff; font-size:18px; font-weight:bolder; border:1px solid #0099FF;' onclick='sureSubmit2()'>确定</button>";
	htmls += "</div>";
	$('.msg_submit').html(htmls);
	 
	$('.msg_submit').animate({'top': '20%'},1000);
    $('.mask_s').show();
}

function sureSubmit2(){
	var val = $("input[name='chkenrollment']:checked").val();
	if(val == undefined){
		alert("请勾选我同意以上所述!");
		return false;
	}
	$('.msg_submit').animate({'top': '-1000px'},10);
	$('.mask_s').hide();
}

//weixin
function alertInfoSure2(){
	var htmls = "<div style='background:#fff; padding:10px 10px;'><h2 style='color:red;text-align:center;'>承诺书：</h2>";
	htmls += "<p style='text-indent:2em; color:#666; text-align:left;font-family:Microsoft YaHei; padding-top:10px; padding-bottom:10px;'>本人保证所填写的摸底信息真实准确，如有虚假，后果自负！  </p>";
	htmls += "<p style='line-height:40px; color:#333;'><input type='checkbox' name='chkenrollment' checked='checked' value='1' style='width:20px; height:20px;'/> 我同意</p>";
	htmls += "<button style='width:200px; height:40px; line-height:40px; background-color:#0099FF; color:#fff; font-size:18px; font-weight:bolder; border:1px solid #0099FF;' onclick='sureSubmit2()'>确定</button>";
	htmls += "</div>";
	$('.msg_submit').html(htmls);
	$('.msg_submit').animate({'top': '2rem'},1000);
    $('.mask_s').show();
}
 