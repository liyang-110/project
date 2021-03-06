/* =======================================================*/
// 功能：招聘会管理
/* ===================================================== */
$(function() {
		getData();
		ajaxdata1();
		linkSelectCode('area_id','in_area_id',false,'','');
		$('#searchAndreloadData').bind("click",function(){
			searchData("#resultId", getUrl, getData);
		});
	});
/* =======================================================*/
// 函数作用：绘制页面
/* ===================================================== */
function getData() {
	$('#resultId').datagrid( {
		//title : '招聘会管理',
		columns : [ [
		{
			field : 'add_time',
			title : ' 时间',
			width:100
		},{
			field : 'points',
			title : '提现点数',
			width:80
		},{
			field : 'price',
			title : '点数价格',
			width:80
		},{
			field : 'fee',
			title : '转账手续费',
			width:80
		},{
			field : 'amount',
			title : ' 支付金额',
			width:80,
			formatter:function(value,row,index){
				if(row.status=="wait"){
					return '<font color="red">0</font>('+value+')';
				}else{
					return value;
				}
			}
		},{
			field:'audit_person',
			title:'管理员'
		}/*,{
			field : 'status',
			title : ' 状态',
			width:80,
			formatter:function(value,row,index){
				if(value=="wait"){
					return '<button onclick="javascript:alert(\'没有权限！\');">等待审核…</button>';
				}else{
					return '已完成';
				}
			}
		}*/
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
		singleSelect : true,
		collapsible : false,
		iconCls : 'icon-ok',
		nowrap : false,
		striped : true,
		border:false,
		fitColumns:true
	});
}
/*
* 函数作用：异步加载
*/
function ajaxdata1(){
	var cur_page_size = $('#resultId').datagrid('options').pageSize;
	ajaxData('#resultId', getUrl, getData, undefined, cur_page_size, undefined);
}
/* =======================================================*/
// 函数作用：得到查询路径
/* ===================================================== */
function getUrl() {
	var ls_url ="";
		ls_url = cur_path + "/esbServer.do?method=execProc&methodId=zk_pay_query&in_type=audit_pay&in_add_person="+user_code;
	return ls_url;	
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
			pageSize : ini_pagesize
		    });
		ajaxData('#resultId',getUrl,getData,ini_pagenum,ini_pagesize,ini_currentnum); 
	}
/* =======================================================*/
// 函数作用：关闭弹出窗口
// 输入参数及数据类型：
//            ini_pagesize            当前每页行数
//            ini_pagenum             当前页码
//            ini_currentnum          当前行
/* ===================================================== */
function closepage(ini_pagesize,ini_pagenum,ini_currentnum) { 
	$('#dlg_deal').dialog('close') ;
	ajaxData("#resultId", getUrl, getData, ini_pagenum, ini_pagesize, ini_currentnum);
}
function searchData(ins_id,inf_url,inf_deal,ini_page, ini_pagesize,ini_currentrow,tip) {
	var ins_url = inf_url();
    $('#fm').form('submit', {
        url: ins_url,
		success : function(data) {
			if (!data)
				return;
			data = decodeURIComponent(data);
			 out_return = eval("[" + data + "]");
			if (out_return.length > 0 && out_return[0].returncode == 'ok') {
				rowcount = out_return[0].querycount;
				if(rowcount<1&&!tip){
					 //$.messager.alert('提示信息','无查询结果');   
					 
				}
				out_return = "{\"total\":" + rowcount + ",\"rows\":"+ JSON.stringify(out_return[0].queryresult) + "}";
				out_return = eval("[" + out_return + "]");
					
					//处理页面一致
				if (ini_page && ini_page > 0){
					
					$(ins_id).datagrid( {
					pageNumber : ini_page,
					pageSize   : ini_pagesize
				    });
                }
//				else{
//					inf_deal();
//					}
			  //加载数据
			   $(ins_id).datagrid('loadData', out_return[0]);
		
			   initPaperarea(ins_id,inf_url,inf_deal,ini_pagesize);
			    //选中当前行
			
			   if (ini_currentrow>=0)
				{
				    
					$(ins_id).datagrid('selectRow', ini_currentrow);
				}
			} else if (out_return.length > 0 && out_return[0].returncode == 'fail') {
				showError(out_return[0].errordesc);
				
			}
		}
    });
}