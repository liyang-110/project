/* =======================================================*/
// 功能：新闻管理
/* ===================================================== */
$(function() {
	linkSelectCode('area_id','in_area_id',false,'','');
	$("#search-btn").click(function(){
		searchAndReload();
	});
	getData();
	ajaxdata1();
});
/* =======================================================*/
// 函数作用：绘制页面
/* ===================================================== */
function getData() {
	$('#resultId').datagrid( {
		title : false,
		
		columns : [ [ {
			field : 'area_name',
			title : '地区',
			width:50,
			align : 'center'
		},{
			field : 'count',
			title : '资源数量',
			align : 'left',
			width:380 
		}
		] ],

		type : 'POST',
		nowrap : true,
		striped : false,
		fit : true,
		width : 500,
		height : 'auto',
		url : '',
		pageSize : 20,
		remoteSort : false,
		pagination : true,
		rownumbers : true,
		singleSelect : false ,
		collapsible : false,
		rownumbers : true,
		nowrap : true,
		striped : true,
		fitColumns :true,
		border : false,
		rowStyler: function(index,row){
			
			var cssStr="";
			if (row.status==2){
					cssStr+='background-color:#67FFAE;'; // return inline style
			}
			return cssStr;
			
		}
	});
}
/*
* 函数作用：异步加载
*/
function ajaxdata1(){
	ajaxData('#resultId', getUrl, getData, undefined, 20, undefined);
}
/* =======================================================*/
// 函数作用：得到查询路径
/* ===================================================== */
function getUrl() {
	var ls_url = cur_path + "/esbServer.do?method=execProc&methodId=news_cj_statistical_area&in_action=query&in_r=ad&date=" + new Date();
	return ls_url;	
	}
/* =======================================================*/
// 函数作用：删除（批量删除）
/* ===================================================== */
   function del() {
		var lo_selected;      //当前选中行
	    var ls_id = "";        //用户id
	    var ls_url;           //url
	    var ls_sign="";
	    lo_selected   = getCheckObj('resultId','请选择要删除的用户选项！'); 
	    if(!lo_selected[0]){
	    	$.messager.alert('提示信息','请选择要删除的文件！','info');
	    	return false;
	    }else{
	    	 $.messager.confirm('提示信息', '您确定要进行删除操作吗?', function(r){
	    	 	if (r){
	    	 		for(var i=0;i< lo_selected.length;i++){
    					ls_id += "&in_news_mgr"+i+"="+ lo_selected[i].news_id;
   					}
   					ls_url = cur_path + "/esbServer.do?method=execProc&methodId=news_cj_statistical_area&in_r=ad&in_action=del" + ls_id+"&date="+new Date();
				    ajaxDealUrl(ls_url,'删除文件成功',downOrreloadData);
	    	 	}
	    	 });
		            
      		
        }
 }
 
 

 
   /* =======================================================*/
// 函数作用：得到当前被选中行的对象
// 输入参数及数据类型： ins_id   数据显示域id
//					ins_msg  无选中行时提示信息
// 返回参数及数据类型： lo_selected 选中行对象
/* ===================================================== */
function getCheckObj(ins_id,ins_msg){
	//当前选中行
	if (!$("#"+ins_id).datagrid("getSelections") || $("#"+ins_id).datagrid("getSelections")==""){
		return false;
	}else{
		var lo_selected= $("#"+ins_id).datagrid("getSelections");
		return lo_selected;
	}
	
}
/* =======================================================*/
// 函数作用：加载或刷新数据
// 输入参数及数据类型： 
//            ini_pagesize            当前每页行数
//            ini_pagenum             当前页码
//            ini_currentnum          当前行
// 返回参数及数据类型： 无
/* ===================================================== */
function downOrreloadData(ini_pagesize,ini_pagenum,ini_currentnum){
	$('#resultId').datagrid( {
		pageNumber : 1,
		pageSize : 20
	 });
	ajaxData('#resultId',getUrl,getData,ini_pagenum,ini_pagesize,ini_currentnum); 
}
	
/* =======================================================*/
// 函数作用：修改
// 输入参数及数据类型：无
// 返回参数及数据类型：无
/* ===================================================== */
function edit() {
	var li_currentnum =0; //当前行
	var li_pagesize   =0; //每页行数
	var li_pagenum    =0; //页码
	
	var lo_selected;      //当前选中行
    var lo_pg;            //分页对象
	var ls_id="";	  //编码

    //得到选中行对象 code:请选择一行用户信息！
    lo_selected   = getCheckObj('resultId','请选择一行信息！');   
    if(lo_selected.length!=1){
    	$.messager.alert('提示信息','请选择一行来进行修改！','info');
    	return false;
    }if(lo_selected[0].status==2){
    	$.messager.alert('提示信息','所选信息已发布，请选择其他信息！','info');
    	return false;
    }else{
	    li_currentnum = $("#resultId").datagrid("getRowIndex",lo_selected[0]);
	    ls_id     = lo_selected[0].news_id;
        lo_pg         = $("#resultId").datagrid("getPager");
        li_pagenum    = lo_pg.pagination('options').pageNumber;

        $('#if_deal')[0].src='jNewsCjEdit.jsp?id='+ls_id+'&in_pagesize=' + li_pagesize+'&in_pagenum=' + li_pagenum+'&in_currentnum=' +li_currentnum +"&date="+new Date();
		$('#dlg_deal').dialog('open').dialog('setTitle','编辑'); 
    }
}


function view() {
	var li_currentnum =0; //当前行
	var li_pagesize   =0; //每页行数
	var li_pagenum    =0; //页码
	
	var lo_selected;      //当前选中行
    var lo_pg;            //分页对象
	var ls_id="";	  //

    //得到选中行对象 code:请选择一行用户信息！
    lo_selected   = getCheckObj('resultId','请选择一行信息！');   
    if(lo_selected.length!=1){
    	$.messager.alert('提示信息','请选择一行来查看！','info');
    	return false;
    }else{
	    li_currentnum = $("#resultId").datagrid("getRowIndex",lo_selected[0]);
	    ls_id     = lo_selected[0].news_id;
        lo_pg         = $("#resultId").datagrid("getPager");
        li_pagenum    = lo_pg.pagination('options').pageNumber;

        $('#if_deal')[0].src=cur_path+'/school/jNewsView.jsp?id='+ls_id+'&in_pagesize=' + li_pagesize+'&in_pagenum=' + li_pagenum+'&in_currentnum=' +li_currentnum +"&date="+new Date();
	    $('#dlg_deal').dialog('open').dialog('setTitle','查看'); 
    }
}


/* =======================================================*/
// 函数作用：提交至下一环节审核
/* ===================================================== */
   function sendData() {
		var lo_selected;      //当前选中行
	    var ls_id = "";        //用户id
	    var ls_url;           //url
	    var ls_sign="";
	    lo_selected   = getCheckObj('resultId','请选择要提交审核的新闻！'); 
	    if(!lo_selected[0]){
	    	$.messager.alert('提示信息','请选择要提交审核的新闻！','info');
	    	return false;
	    }else{
	    	 $.messager.confirm('提示信息', '您确定要提交审核该新闻吗?', function(r){
	    	 	if (r){
	    	 		for(var i=0;i< lo_selected.length;i++){
    					ls_id += ","+ lo_selected[i].news_id;
   					}
   					ls_id=ls_id.substring(1,ls_id.length);
   					
   					var url= cur_path +"/sheetAction.do?method=sendSheet&ids=" + ls_id+"&flow_id=002&buss_id=news";
		   		  $.post(url, {}, function(data){
		            if(data=="succ"){
		              $.messager.alert('提示信息', '提交成功!','info',function (){downOrreloadData('','','');});
		              
		            }else{
		              $.messager.alert('提示信息','提交失败','info');
		            }
		          });

	    	 	}
	    	 });
		            
      		
        }
 }
function batPublish()
{
		var li_currentnum =0; //当前行
		var li_pagesize   =0; //每页行数
		var li_pagenum    =0; //页码

		var lo_selected;      //当前选中行
	    var ls_id = "";        //用户id
	    var ls_url;           //url
	    var ls_sign="";
	    lo_selected   = getCheckObj('resultId','请选择要删除的用户选项！'); 
	    if(!lo_selected[0]){
	    	$.messager.alert('提示信息','请选择企业！','info');
	    	return false;
	    }else{
		    li_currentnum = $("#resultId").datagrid("getRowIndex",lo_selected[0]);
	        lo_pg         = $("#resultId").datagrid("getPager");
	        li_pagenum    = lo_pg.pagination('options').pageNumber;
   	 		li_pagesize = lo_pg.pagination("options").pageSize;
   	 		
   	 		var input="";
   	 		$("#company_list").html("");
   	 		for(var i=0;i< lo_selected.length;i++){
  				if( lo_selected[i].status==1){	
 						input='<li><input type="hidden" name="in_spider_'+i+'" value="'+lo_selected[i].news_id+'"/>'+lo_selected[i].news_title+'</li>';
 						$("#company_list").append( input );
 				}
 			}
   	 	}
	 if($("#company_list").text()==''){
	 	$.messager.alert("提示信息","请选择待发布的记录！","info");
	 	return;
	 }
     $("#dlg_change_admin").show().dialog({  title:'批量发布',
	    												   width: 390,
	    												   height: 260,
	    												   fit:false,
	    												   buttons: [{
												                    text:'发布',
												                    iconCls:'icon-ok',
												                    handler:function(){
												                    
												                       submit_publish( function(){
												                        $("#dlg_change_admin").dialog('close');
												                        closepage(li_pagesize,li_pagenum,li_currentnum);
												                    });
												                    }
												                },{
												                    text:'取消',
												                    handler:function(){
												                        $("#dlg_change_admin").dialog('close') ;
												                    }
												                }]
	    												   });
}
function submit_publish(ins_upFun)
{
   var 	ls_url = cur_path + "/esbServer.do?method=execProc&methodId=news_cj&r=ad&in_action=publish&in_URLEncoding=UTF-8&date="+new Date();
	
   $('#fm2').form('submit', {
        url: ls_url,
        onSubmit: function() {
            return true;
        },
        success: function(data) {
        	data = decodeURIComponent(data);
            var re = eval("[" + data + "]");
            if (re.length > 0 && re[0].returncode == 'ok') {
            	var queryresult =re[0].queryresult;
            	if( queryresult[0].ok!='ok' && queryresult[0].msg ){
            	 	$.messager.alert('\u63d0\u793a\u4fe1\u606f',queryresult[0].msg,'error');
            	}else if(queryresult[0].ok=='ok' && queryresult[0].msg){
	                 $.messager.alert('\u63d0\u793a\u4fe1\u606f',queryresult[0].msg,'info',function(){//提示信息
	                 	if(typeof(ins_upFun) !='undefined'){
	                 		ins_upFun();
	                 	}
	            	});
            	}else{
            	 	$.messager.alert('\u63d0\u793a\u4fe1\u606f','未知错误！','error');

            	}
            } else {
                $.messager.alert('\u9519\u8bef\u4fe1\u606f', data, 'alert');//错误信息
            }
        }
    });
}
function closepage(ini_pagesize,ini_pagenum,ini_currentnum) { 
	$('#dlg_deal').dialog('close') ;
	ajaxData("#resultId", getUrl, getData, ini_pagenum, ini_pagesize, ini_currentnum);
}
function cancelDialog(ini_pagesize,ini_pagenum,ini_currentnum) { 
	$('#dlg_deal').dialog('close') ;
}
function searchAndReload(){
	var cur_page_size = $('#resultId').datagrid('options').pageSize;

	searchForm("#resultId", getUrl, getData,1,cur_page_size);
}