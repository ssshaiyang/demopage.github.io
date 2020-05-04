var timeCnt = 0;

function msgAlert(type, title, content) {
    if(!title) title = "消息提示";
	if(!type) type = "info";
	if(!content) content = "";
	var obj = $("<div id=\"alert_win\"></div>");
	var htmls = "";
	htmls += "<div class=\"wins_sf\"><div class=\"wins_sf_panel\"><div class=\"wins_tt\">";
	htmls += "<span class=\"tt\">" + title + "</span><span class=\"cls\" onclick=\"closeAlert();\"></span></div>";
	htmls += "<div class=\"wins_cc\"><div class=\"" + type + "\"></div><div class=\"info_cc\">" + content;
    htmls += "</div></div><div style=\"text-align:center;\"><a class=\"suer_btn\" onclick=\"closeAlert();\">关闭</a></div></div></div></div>";
    obj.html($(htmls));
    $('body').prepend($(obj));
    $(obj).find(".wins_sf_panel").animate({width: "300px" , height :"160px"}, 500);
    timeCnt = setTimeout(function(){
    	closeAlert();
    },10000);
}

function closeAlert(){
	$('#alert_win').remove();
	clearTimeout(timeCnt);
}

function hideMsg(){
   $('.msg').animate({'top': '-1000px'},500);
   $('.mask').hide();
   clearTimeout(timeCnt);
}

function msgSubmit() {
	$(".msg").css("width","300px");
	$(".msg").css("left","40%");
	$('.msg_submit').html("处理中,请稍后……");
	$('.msg_submit').animate({'top': '30%'},10);
    $('.mask_s').show(); 
}

function hideSubmit(){
	$('.msg_submit').animate({'top': '-1000px'},10);
	$('.mask_s').hide();
}

function openBigPicure(img_url) {
	// 创建对象  
	var img = new Image();  
	// 改变图片的src  
	img.src = img_url;
	var width = img.width;
	var height = img.height;
	if(width > 800){
		$(".msg_img").css("width","800px");
		$(".msg").css("left","10%");
	} else{
		$(".msg_img").css("width","auto");
		$(".msg").css("left","30%");
	}
	if(height > 500){
		$('.msg_img').animate({'top': '10%'},10);
		$(".msg_img").css("height","500px");
	} else{
		$('.msg_img').animate({'top': '20%'},10);
		$(".msg_img").css("height","auto");
	}
	$('.msg_img').html("<img src='" + img_url + "' width='100%'/>");
    $('.mask_s').show(); 
}

function closePicure(){
	$('.msg_img').animate({'top': '-1000px'},10);
	$('.mask_s').hide();
}

$(document).ready(function(){
    var htmlstyle = "<style>body{padding:0;margin:0;}.msg{color:#FFF;text-align:center;font-size:1.2rem;border:1px solid #ccc;line-height:2rem;position:fixed;top:-400px; left:40%;z-index:20; overflow:auto;}"
    	+".msg_success{background-color:#1fcc6c;cursor: pointer;}"
    +".msg_warning{background-color:#e94b35;cursor: pointer;}"
    +".msg_submit{background-color:#5bc0de;cursor: pointer;}"
    +".msg_info{background-color:#5bc0de;cursor: pointer;}.msgc{height:100px;background-color:#ffffff;color:#999;}</style>";
    $('head').append(htmlstyle);
    $('body').prepend('<div class="mask opacity" onclick="hideMsg();"></div><div class="msg msg_success"><span></span><div class="msgc"></div><input type="button" class="btn_gray" value="关 闭" onclick="hideMsg();"/></div>'
        +'<div class="msg msg_warning"><span></span><div class="msgc"></div><input type="button" class="btn_gray" value="关 闭" onclick="hideMsg();"/></div>'
        +'<div class="msg msg_info"><span></span><div class="msgc"></div><input type="button" class="btn_gray" value="关 闭" onclick="hideMsg();"/></div>');
    $('body').prepend('<div class="mask_s opacity"></div><div class="msg msg_submit">处理中,请稍后……</div><div class="msg msg_img" onclick="closePicure();"></div>');
});