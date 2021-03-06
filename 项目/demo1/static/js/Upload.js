/////////////////////////////////////////////////////////////////////
/* =======================================================*/
// 函数作用：页面初始化函数
// 输入参数及数据类型：无
// 返回参数及数据类型：无
/* ===================================================== */
$(function () {
	//给按钮绑定事件
	$("#btn_save").bind("click", function () {
		update();
	}); 
});
/* =======================================================*/
// 函数作用：加载信息
// 输入参数及数据类型：
// 返回参数及数据类型：
/* ===================================================== */
function setData() {	
	var ls_url = cur_path + "/esbServer.do?method=execProc&methodId=ad_logo_update&in_preview=ok&date=" + new Date();
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
			preview(initdata[0].path);
			
		}
	}});
	
}
function preview(path){
	var p=cur_path+"/"+path;
	$('#logo_preview').attr("src",p);
}
function update() {
	var file_id = $("#file_id").val();
	var ls_url = cur_path + "/esbServer.do?method=execProc&methodId=ad_logo_update&in_id="+id+"&date=" + new Date()+"&in_file_id="+file_id;
   var ins_msg="\u6570\u636e\u6dfb\u52a0\u6210\u529f\uff01";
   $('#fm').form('submit', {
        url: ls_url,
        onSubmit: function() {
            return $(this).form('validate');
        },
        success: function(data) {
        	data = decodeURIComponent(data);
            var re = eval("[" + data + "]");
            console.info(re);
            if (re.length > 0 && re[0].returncode == 'ok') {
                 $.messager.alert('\u63d0\u793a\u4fe1\u606f',ins_msg,'info',function(){//提示信息
						if( re[0].querycount>0){
							var array=re[0].queryresult;
							preview(array[0].path);
						}
            	});
            } else {
                $.messager.alert('\u9519\u8bef\u4fe1\u606f', data, 'alert');//错误信息
            }
        }
     });
}
function refreshResume( resume_id ){
	var ls_url = cur_path + "/esbServer.do?in_r=su&method=execProc&methodId=student_resume_query&in_r=su&in_URLEncoding=UTF-8&in_action=refresh&in_resume_id="+resume_id+"&date=" + new Date();
	$.post(ls_url,{}
	).done(function(data){
		var data = $.parseJSON( decodeURIComponent(data) );
		/*
		{"returncode":"ok" , "errordesc":"" ,"queryresult":[{"'ok'":"ok"}]} 
		*/
		if(data.returncode =='ok'){
			if(data.queryresult[0].ok=='ok'){
				window.location.reload();
			}else{
				$.messager.alert('提示信息','操作失败','error');
			}
		}else{
			$.messager.alert('提示信息',data.errordesc,'error');
			return;
		}
	}).fail(function(){
		$.messager.alert('提示信息','服务器错误，请稍后再试！','info');
		return;
	});
}
function editOpen( resume_id , status){	
	var ls_url = cur_path + "/esbServer.do?in_r=su&method=execProc&methodId=student_resume_query&in_r=su&in_URLEncoding=UTF-8&in_action=resume_status&in_status="+status+"&in_resume_id="+resume_id+"&date=" + new Date();
	$.post(ls_url,{}
	).done(function(data){
		var data = $.parseJSON( decodeURIComponent(data) );
		/*
		{"returncode":"ok" , "errordesc":"" ,"queryresult":[{"'ok'":"ok"}]} 
		*/
		if(data.returncode =='ok'){
			if(data.queryresult[0].ok=='ok'){
				window.location.reload();
			}else{
				$.messager.alert('提示信息','操作失败','error');
			}
		}else{
			$.messager.alert('提示信息',data.errordesc,'error');
			return;
		}
	}).fail(function(){
		$.messager.alert('提示信息','服务器错误，请稍后再试！','info');
		return;
	});
}