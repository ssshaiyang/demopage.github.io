var baseURL = 'http://120.78.81.17:9090';

function mobile_device_detect(url) {
    var thisOS = navigator.platform;
    var os = new Array("iPhone", "iPod", "iPad", "android", "Nokia", "SymbianOS", "Symbian", "Windows Phone", "Phone", "Linux armv71", "MAUI", "UNTRUSTED/1.0", "Windows CE", "BlackBerry", "IEMobile");
    for (var i = 0; i < os.length; i++) {
        if (thisOS.match(os[i])) {
            window.location = url;
        }
    }
    if (navigator.platform.indexOf('iPad') != -1) {
        window.location = url;
    }
    var check = navigator.appVersion;
    if (check.match(/linux/i)) {
        if (check.match(/mobile/i) || check.match(/X11/i)) {
            window.location = url;
        }
    }
    Array.prototype.in_array = function (e) {
        for (i = 0; i < this.length; i++) {
            if (this[i] == e)
                return true;
        }
        return false;
    }
}
//mobile_device_detect("https://ssshaiyang.github.io/demopage.github.io/gowechat/choiceSchool.html");

$(document).ready(function () {

});

function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("您的浏览器不支持，请手动使用Ctrl+D进行添加");
        }
    }
}

//设为首页 <a onclick="SetHome(this,window.location)">设为首页</a>
function SetHome(obj, vrl) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(vrl);
    } catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        }
    }
}

function setCookie(name, value) {
    var Days = 30;//cookie保存天数
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

function saveLink(obj) {
    location.href="pleaseBack.html"
    var tmp = obj
    var linkName = $(tmp).html()
    console.log(linkName);
    setCookie('linkName', linkName)
}

function setUpLink() {
    var linkName = getCookie('linkName')
    if (linkName) {
        $(".last_link").css("display", "block")
        $("#link_name").text(linkName)
    }

}

function setUpArea(){
    var linkName = getCookie('linkName')
    if (linkName) {
        $("#area-name").text(linkName)
    }
}

function isNotNull(data){
    if(data){
        return data
    }
}

function alertInfoTestPC(data) {

    var htmls =
        "<div style='min-width:340px;max-width:540px; background:#fff; padding:10px 10px;'><h2 style='color:red;text-align:center;'>温馨提示</h2>";
    htmls +=
        "<p style='text-indent:2em; color:#666; text-align:left;font-family:Microsoft YaHei; padding-top:10px; padding-bottom:10px;'>"+data+"</p>";
   
    htmls +=
        "<button style='width:200px; height:40px;border-radius: 20px; line-height:40px; background-color:#0099FF; color:#fff; font-size:18px; font-weight:bolder; border:1px solid #0099FF;cursor:pointer;' onclick='sureSubmit2()'>我知道了</button>";
    htmls += "</div>";
    $('.msg_submit').html(htmls);
    $(".msg").css("z-index", "1003").css("left", "50%").css("transform", "translate(-50%,0 )");
    $('.msg_submit').animate({
        'top': '20%'
    }, 1000);
    $('.mask_s').show();
}

function getPortalInfo(){
    $.ajax({
        url:baseURL+'/api/site/portal-content',
        async:false ,
        type:'get',
        success:function(res){
            $("#index-title").html(res.title)
            $("#index-subTitle").html(res.subtitle)
            //banner
            var bannerArray = [] 
            if(res.mb1Url)bannerArray.push(res.mb1Url)
            if(res.mb2Url)bannerArray.push(res.mb2Url)
            if(res.mb3Url)bannerArray.push(res.mb3Url)
            if(res.mb4Url)bannerArray.push(res.mb4Url)
            bannerArray.map((item,index) =>{
                console.log(index)
                $("#banner_img").append('<a href="#" class="bannger_inbox" '+(index==0?'':'style="display: none;"')+'><img src="'+item+'" width="1920" height="528" /></a>')
                $("#yq_banner_list").append('<a href="javascript:;" rel="'+index+'" '+(index !==0?'':'class="hover"')+'  >&nbsp;</a>')
            })
            setBanner()//设置banner
            $("#bottom_text").html(res.bottomText)
            $("#wechat_img").attr('src',res.wechat)
            $("#mobbile_banner").attr('src',res.mobileUrl)
            $(".second_bg").css('background-image',res.ibUrl)
           
            if(res.reminder !== getCookie('reminder')  && res.reminder){
            setCookie('reminder', res.reminder)//将弹窗内容存入cookie
            alertInfoTestPC(res.reminder);//提示弹窗
            }
        }
    })
}

function getNotIndexInfo(){//非首页
    $.ajax({
        url:baseURL+'/api/site/portal-content',
        async:false ,
        type:'get',
        success:function(res){
            $("#index-title").html(res.title)
            $("#index-subTitle").html(res.subtitle)
            $("#bottom_text").html(res.bottomText)
            $("#wechat_img").attr('src',res.wechat)
            $("#mobbile_banner").attr('src',res.mobileUrl)
            $(".second_bg").css('background',"url("+res.ibUrl+ ") center no-repeat;")
            $("#important_tips").text(res.importantTips)
        }
    })
}

function getHelpInfo(){//用户须知
    $.ajax({
        url:baseURL+'/api/site/portal-content/mustKnow',
        async:false ,
        type:'get',
        success:function(res){
            $("#help_content").html(res)
            $("#help_content_mobile").html(res)
            
        }
    })
}



function getUserManualInfo(){//操作指南
    $.ajax({
        url:baseURL+'/api/site/portal-content/userManual',
        async:false ,
        type:'get',
        success:function(res){
            $("#manual_content").html(res)
            $("#manual_content_mobile").html(res)
            
        }
    })
}

function getQueryVariable(variable)//获取参数
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function getIndexNewsList(){//首页新闻
    $.ajax({
        url:baseURL+'/api/site/news?page=0&size=9&sort=createdDate,desc',
        //async:false ,
        type:'get',
        success:function(res){
            $.each(res,function(i,val){
                $(".news_ul").append('<li>\
                <a href="goNewInfo.html?id='+val.id+'" title="'+val.title+'" target="_blank">'+val.title+'</a>\
                <span>['+val.createdDate.split("T")[0]+']</span>\
            </li>')
            })
            
        }
    })
}

function getNewsList(){//新闻中心
    var pid = getQueryVariable("pid")*1
    $.ajax({
        url:baseURL+'/api/site/news?page='+pid+'&size=15&sort=createdDate,desc',//每页固定15条
        //async:false ,
        type:'get',
        success:function(res){
            $.each(res,function(i,val){
                $(".news_ul").append('<li>\
                <a href="goNewInfo.html?id='+val.id+'" title="'+val.title+'" target="_blank">'+val.title+'</a>\
                <span>['+val.createdDate.split("T")[0]+']</span>\
            </li>')
                $(".new_ul").append('<li>\
                <a href="goNewInfo.html?id='+val.id+'" title="'+val.title+'">\
                    <div class="title">'+val.title+'</div>\
                </a>\
                <p class="dt"><span class="f_s">发布日期：'+val.createdDate.split("T")[0]+'</span></p>\
            </li>')
            })
            if(res.length<15){//隐藏页码按钮
                $(".page_div").hide()
                $(".page_div_mobile").hide()
            }
            if(pid==0){
                $(".last_page_btn").hide()
            }
            $(".page_pno").text("当前：第"+(pid+1)+"页")
            $(".last_page_btn").attr("href","areanewlist.html?pid="+(pid-1))
            $(".next_page_btn").attr("href","areanewlist.html?pid="+(pid+1))
            
        }
    })
}

function getNewsDetail(){//获取新闻详情
    var id = getQueryVariable("id")
    $.ajax({
        url:baseURL+'/api/site/news/'+id,
        async:false ,
        type:'get',
        success:function(res){
            $("#news_title").text(res.title)
            $("#news_createTime").text("发布日期："+res.createdDate.replace("T"," ").replace("Z",""))
            $("#news_content").html(res.content)
            $("#news_title_monile").text(res.title)
            $("#news_time_monile").text(res.createdDate.replace("T"," ").replace("Z",""))
            $("#news_content_monile").html(res.content)
            
        }
    })
}

function getIndexArea(){
    $.ajax({
        url:baseURL+'/api/site/orgs',
        async:false ,
        type:'get',
        success:function(res){
            $.each(res,function(i,val){
                $(".city_ul").append('<li>\
                <a class="acl-name '+(i==0?' on':'')+'" data-val="'+i+'" data-key="'+val.id+'">'+val.areaName+'</a>\
                <div class="trigon_div '+(i!==0?' none':'')+'"></div>\
            </li>')
            })
           // setAreaClick()
        }
    })
}


