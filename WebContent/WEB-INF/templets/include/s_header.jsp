<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.zhaopin.Station"%>
<div class="header" style="background:#505050;">
	 <!--sub_nav结构开始  -->
     <div class="sub_nav" style="width:1024px;margin:0 auto;">
        <ul class="sub_nav_ul">
        	<li><a href="/student/sResumet.do">简历中心 </a>|</li>
        	<li><a href="/student/sMessage.do?type=resumeYes">消息 </a>|</li>
        	<li><a href="/student/sCollection.do?type=zhiwei">收藏夹 </a>|</li>
        	<li><a href="/student/sCenter.do">个人中心</a>|</li>
        	<li><a href="/student/sAccount.do">修改密码 </a>|</li>
        	<li><a href="/loginOut.do?method=exitData"><i class="fa fa-power-off" aria-hidden="true"></i></a></li>
        </ul>
        <script type="text/javascript">
				$(function(){
						$.get( '/login.do?check=true&date='+new Date(),function(data){
						if(data.login){
							var login = data.login;
							if( login.nickname ){
								var path="/auth/bind_qq.jsp";
								if( login.user_id ){
									path="/member/home.do";
								}
								var link = $("#login_qq_info").find(".login_qq_info");
								link.attr("href",path );
								var str='<img style="width:20px;height:20px;" src="'+login.avatar+'"  />'+login.nickname;
								link.html( str );
								$("#login_user_info").hide();
								$("#login_qq_info").show();
							}else{
								var user_id=(login.user_id.length>10)?login.user_id.substring(0,7)+'...':login.user_id;
								var str='<li>'+'<a title="'+login.user_id+'" style="text-decoration:none;">'+user_id+'</a>';
									 str+='&nbsp;&nbsp;<a href="/member/home.do" >'+login.user_type_name+'中心</a>';
									 str+="</li><li>";
									 str+='&nbsp;&nbsp;<a href="/loginOut.do?method=exitData">退出</a>';
									 str+="</li>";
							   $("#login_user_info").html(str);
							}
						}
					});
				});
				</script>
      </div>
	<div class="clear"></div>
      <!--sub_nav结构结束  -->
      <!--nav结构开始  -->
        <div class="top_nav">
          <div class="nav_inner">
              <div class="logo">
                   <img src="/static/images/s_logo.png"/>
              </div>              
              <div><a class="province switch" href="javascript:;" id="site_select_btn">
              		<%
		           		String area_id=new com.zhaopin.StationSwitch(request,response).getSiteId();
		           		//String area_id =request.getAttribute("area_id")==null?"":(String)request.getAttribute("area_id");
						String area_name=com.zhaopin.Station.getStationName( area_id );
						if( "".equals(area_name) ){
								area_name="全国";
						}
		             %>
		             <%=area_name%>
              		<span><i class="arrow"></i></span>
              		</a>
              </div>
              <div class="main_nav">
              	<ul >
					<li><a  class="nav_shouye" href="/jobfair/index.do?a=28" title="首页">
						首页</a>
					</li>
                	<li>|</li>
					<li><a class="nav_wlzph" href="/jobfair/wlzph.do" title="网络招聘会">
						网络招聘会</a>
					</li>
                	<li>|</li>
					
                	<li><a class="nav_xyzph" href="/jobfair/xyzph.do" title="校园招聘会">
                		校园招聘会</a>
                	</li>
				</ul>                 
              </div>                                                          
           </div>
      </div> 
       <!--nav结构结束  --> 
        <div style="clear:both"></div>    
</div>
<script>
 $(function(){
		$('#site_select_btn').click(function(e){
			e.preventDefault();
			e.stopPropagation();
			site_select_btn = art.dialog({
			    width: 490,
			    height: 400,

				id: 'site_select_btn',
				title:false,
				content:'<div style="width:490px;height:400px;">正在加载...</div>',
				lock:true,
				fixed:true,
				close:function(){this.hide(); return false;},
				show:true,
				esc:true,
				padding:0,
				opacity:0.3,
				background:'#333333'
			});
			var url ='/service/select_site.jsp';
			var pageContentBody =$(art.dialog({id: 'site_select_btn'}).content());
			pageContentBody.parent(".aui_dialog").find(".aui_close").addClass("site_select_panel_close");				
			pageContentBody.html( $("#site_select_content").text() );
			art.dialog({id: 'site_select_btn'}).show();
		});
		
		var resume_score=${percents};
	});
</script>

<script id="site_select_content" type="text/plain">
<style>
.site_main .site<%=area_id%>{
	display:none;
}
</style>	
<div style="border:15px solid rgba(0,0,0, 0.4);">
<div class="site">
	<div class="site_top">分站切换</div>

	<div class="site_main">
		<div style="margin:20px 0px 10px 18px;">
			<div style="float:left;"><img src="/static/images/location.png" style="margin-left:15px;"><div>当前位置</div></div>
			<div class="curr_area"><%=area_name%><img src="/static/img/duihao.png" style="float:right;"></div>
			<div style="clear:both;"></div>
		</div>

		<div class="xian"></div>

		<p>或切换至以下分站</p>

		<div style="margin-left:25px;">
			<a href="/shaanxi"><div class="area site28">陕西</div></a>
			<a href="/henan"><div class="area site17">河南</div></a>
			<a href="/sichuan"><div class="area site24">四川</div></a>
			<a href="/chongqing"><div class="area site23">重庆</div></a>
			<a href="/gansu"><div class="area site29">甘肃</div></a>
			<a href="/hunan"><div class="area site19">湖南</div></a>
			<div style="clear:both;"></div>
		</div>

		<p style="margin-top:20px;">其他省份分站正在开通中，敬请期待...</p>
	</div>
</div>
</div>
</script>
<script id="resume_edit_content" type="text/plain">
	<div">
	<img src="/static/img/gantanhao.png" width="70" height="70" style="margin-left: 80px;">
	<p style="color:#e03919;font-size:20px;font-family:'微软雅黑';">您的简历完整度不足70%!</p>
	<p style="text-align:center;color:#999;">丰富的简历能跟好的吸引企业哦！</p>
	<div>
	<a style="display:block;width:70px;border-radius:4px;height:35px;background:#F57E0D;text-decoration: none;color: #fff; font-family: '微软雅黑';text-align: center;line-height: 35px;float:left;margin-left: 30px;"
     href="/student/stuResume.do">完善简历</a>
	<a style="display:block;width:70px;border-radius:4px;height:35px;background:#F57E0D;text-decoration: none;color: #fff; font-family: '微软雅黑';text-align: center;line-height: 35px;float:right;margin-right: 30px;"
     href="/" target="_blank">返回首页</a>
	</div>
</div>
</script>
<script type="text/javascript">
function fixedNav(){
	var t = $(document).scrollTop();
	if(t > 40 ){
		$('.top_nav').addClass("fixed");
		$('.top_nav .main_nav a').css("height","40px");
	}else{
		$('.top_nav').removeClass("fixed");
		$('.top_nav .main_nav a').css("height","60px");
	}
}
<% if( request.getAttribute("switchSite")!=null){ %>
$(function(){
	art.dialog({
	    width: 490,
	    height: 230,
		id: 'site_select_btn',
		title:false,
		content:'<div style="width:490px;height:230px;">正在加载...</div>',
		lock:true,
		fixed:true,
		close:function(){this.hide(); return false;},
		show:true,
		esc:true,
		padding:0,
		opacity:0.3,
		background:'#333333'
	});
	var url ='/service/select_site.jsp';
	var pageContentBody =$(art.dialog({id: 'site_select_btn'}).content());
	pageContentBody.parents(".aui_dialog").find(".aui_close").addClass("site_select_panel_close");				
	pageContentBody.html( $("#site_select_content").text() );
	art.dialog({id: 'site_select_btn'}).show();
});

<% }else {%>
$(function(){
	$(window).scroll(function(e){
		fixedNav();
		var list = art.dialog.list;
		if( list['site_select_btn'] ){
			 list['site_select_btn'].close();
		}
		//art.dialog({id:'site_select_btn'}).close();
	});
	$(document).click(function(){
		var list = art.dialog.list;
		if( list['site_select_btn'] ){
			 list['site_select_btn'].close();
		}
	});
});
<% } %>
</script>