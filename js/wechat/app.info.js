var exitBtn = '</br><input type="button" class="button" value="关 闭" onclick="hideMsg();"/>';

var timeCnt = 0;

function msgAlert(type, title, msg) {
	$('.msg_'+type).find("span").html(title);
	$('.msg_'+type).children(".msgc").html(msg);
    $('.msg_'+type).animate({'top': '0rem'},500);
    $('.mask').show();
    timeCnt = setTimeout("hideMsg()", 3000);
}

function msgSubmit() {
	$('.msg_submit').html("加载中,请稍后……"); 
	$('.msg_submit').animate({'top': '3rem'},10);
    $('.mask_s').show();
}

function hideSubmit(){
	$('.msg').animate({'top': '-100rem'},10);
	$('.mask_s').hide();
}

function hideMsg(){
   $('.msg').animate({'top': '-100rem'},500);
   $('.mask').hide();
   clearTimeout(timeCnt);
}

$(document).ready(function(){
    var htmlstyle = "<style>body{padding:0;margin:0;}.msg{color:#FFF;width:100%;text-align:center;font-size:1.2rem;border:1px solid #ccc;line-height:2rem;position:fixed;top:-100rem;z-index:20;}"
    	+".msg_submit{background-color:#91C1F5;z-index:1001}"
    	+".msg_success{background-color:#1fcc6c;}"
    +".msg_warning{background-color:#e94b35;}"
    +".msg_primary{background-color:#337ab7;}"
    +".msg_info{background-color:#5bc0de;}.msgc{min-height:2rem;background-color:#ffffff;color:#999;}</style>";
    $('head').append(htmlstyle);
    $('body').prepend('<div class="mask" onclick="hideMsg();"></div><div class="msg msg_success"><span></span><div class="msgc"></div></div>'
        +'<div class="msg msg_warning"><span></span><div class="msgc"></div></div>'
        +'<div class="msg msg_primary"><span></span><div class="msgc"></div></div>'
        +'<div class="msg msg_info"><span></span><div class="msgc"></div></div>');
    $('body').prepend('<div class="mask_s opacity"></div><div class="msg msg_submit">加载中,请稍后……</div>');
});