var commonURL = 'https://ssshaiyang.github.io/demopage.github.io/';

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
    var Days = 30;
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