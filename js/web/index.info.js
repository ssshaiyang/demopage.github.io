$(function(){
	$("#news_content .city_ul .acl-name").click(function(){
		var num = $(this).attr("data-val");
		var htmls = $("#news_content .news_ul").eq(num).text();
		htmls = $.trim(htmls);
		$("#news_content .city_ul .acl-name.on").removeClass("on");
		$("#news_content .city_ul .trigon_div").addClass("none");
		$(this).addClass("on");
		$(this).parent().find(".trigon_div").removeClass("none");
		if(!htmls){
			var orgId = $(this).attr("data-key");
			loadContentList(orgId, num);
		}
		$("#news_content .news_ul").addClass("none");
		$("#news_content .news_ul").eq(num).removeClass("none");
	});
	
	$(".select_school .city_ul .acl-name").click(function(){
		var num = $(this).attr("data-val");
		var htmls = $(".select_school .school_ul").eq(num).text();
		htmls = $.trim(htmls);
		$("http://cz.xsbmxt.cn/js/web/.select_school .city_ul .acl-name.on").removeClass("on");
		$(".select_school .city_ul .trigon_div").addClass("none");
		$(this).addClass("on");
		$(this).parent().find(".trigon_div").removeClass("none");
		if(!htmls){
			var orgId = $(this).attr("data-key");
			loadSchoolInfoList(orgId, num);
		}
		$(".select_school .school_ul").addClass("none");
		$(".select_school .school_ul").eq(num).removeClass("none");
	});
});

function loadContentList(orgId, num){
	var htmls = "";
	$.post("gowechat/findContentList",{pageSize:8,page:1,orgId:orgId,status:1},function(result){
		if(result.total > 0){
			for(var i in result.rows){
				htmls += "<li><a href=\"goNewInfo?id=" + result.rows[i].id + "\" title=\""+result.rows[i].title+"\" target=\"_blank\">"+result.rows[i].title+"</a>"
		          	  	+ "<span>[" + result.rows[i].publishDate + "]</span>"
		          	  	 + " </li>";
			}
			$("#news_content .news_ul").eq(num).append(htmls);
		}
	});
}

//查询学校
function loadSchoolInfoList(orgId, num){
	var htmls = '';
	$.post("findSchoolInfoAllByOrgId",{orgId:orgId},function(result){
		if(result.length > 0){
			for(var i in result){
				 htmls += '<li style="height: 80px;">';
				 htmls += '<a href="http://cz.xsbmxt.cn/js/web/goSchoolInfo?id='+result[i].id+'&orgId='+orgId+'" target="_blank">';
		          if(result[i].logo){
		        	  htmls += '<img src="'+result[i].logo+'" style="float: left;" height="53" width="53">';
		          }	else {
		        	  htmls += '<img src="images/school.png"/*tpa=http://cz.xsbmxt.cn/js/web/images/school.png*/ style="float: left;" height="53" width="53">';
		          }
		          htmls += '<div style="float: left; margin-left: 10px; width: 250px; white-space:normal;">';
		          htmls += '<p class="title">'+result[i].organization.full_name+'</p><p class="ctn">地址：'+result[i].organization.org_province + result[i].organization.org_city + result[i].organization.org_area + result[i].organization.org_addr+'</p><p class="ctn">招生热线：  '+result[i].tel+'</p>'; 								
				  htmls += '</div></a></li>';				
			}
			$(".select_school .school_ul").eq(num).append(htmls);
		}
	});
}

