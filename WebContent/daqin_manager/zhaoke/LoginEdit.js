/////////////////////////////////////////////////////////////////////
/* =======================================================*/
// 函数作用：页面初始化函数
// 输入参数及数据类型：无
// 返回参数及数据类型：无
/* ===================================================== */
$(function () {
	setTimeout("setData()", 500);
	//给按钮绑定事件
	$("#btn_save").bind("click", function () {
		edit();
	});
	$("#btn_return").bind("click", function () {
		closePage();
	});
   
});
/* =======================================================*/
// 函数作用：加载信息
// 输入参数及数据类型：
// 返回参数及数据类型：
/* ===================================================== */
function setData() {	
	var ls_url = cur_path + "/esbServer.do?method=execProc&methodId=zk_user_query&in_r=ad&in_action=view_zk&in_user_code=" + user_code + "&date=" + new Date();
	$.ajax({
		url:ls_url, 
		type:"post", 
		dataType:"text", 
		success:function (data) {
		if (!data) {
			return false;
		}
		data = decodeURIComponent(data);
		var re = eval("[" + data + "]");
		if (re.length > 0 && re[0].returncode == "ok") {
			initdata= re[0].queryresult;
			$("#fm").form("load", initdata[0]);
		}
	}});
	
}
/* =======================================================*/
// 函数作用：返回调用页面
// 输入参数及数据类型：无
// 返回参数及数据类型：无
/* ===================================================== */
function closePage() {
	window.parent.closepage(gi_pagesize, gi_pagenum, gi_currentnum);
}
/* =======================================================*/
// 函数作用：保存数据并返回调用页面
// 输入参数及数据类型：无
// 返回参数及数据类型：无
/* ===================================================== */
function edit() {
	var ls_url = cur_path + "/esbServer.do?method=execProc&methodId=zk_user_query&r=ad&in_user_code=" + user_code+"&date=" + new Date();
	   //处理数据 code:数据修改成功
	saveData(ls_url, closePage, "\u6570\u636e\u4fee\u6539\u6210\u529f\uff01");
	
	
}