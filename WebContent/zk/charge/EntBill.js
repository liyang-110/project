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
		$('#billStat').bind("click",function(){
			billStat();
		});
	});
/* =======================================================*/
// 函数作用：绘制页面
/* ===================================================== */
function getData() {
	$('#resultId').datagrid( {
        frozenColumns : [ [
			{
			field : 'ck',
			checkbox:true,
			width : 50
		}]],
		columns : [ [
		{
			field : 'add_time',
			title : ' 时间',
			width:120
		},{
			field : 'area_id',
			title : '分站',
			width:40
		},{
			field : 'account_name',
			title : '企业名称',
			width:210
		},/*{
			field : 'operation_name',
			title : ' 操作',
			width:80
		},*/ {
			field : 'points',
			title : ' 充值点数',
			width:80
		},{
			field : 'percent',
			title : ' 返点比例',
			width:80
		},{
			field : 'amount',
			title : ' 应反点数',
			formatter:function(value,row,index){
				if(row.accept_status=='wait'){
					return '<span style="color:red;">0</span>（'+value+'）';
				}else{ 
					return '<span style="color:green;">'+value+'</span>';
				}
			},
			width:80
		},{
			field : 'last_points',
			title : ' 累计返点',
			width:80
		}
		/*,{
			field : 'accept_time',
			title : ' 分站结算',
			formatter:function(value,row,index){
				if(row.shift_status=='over' && row.accept_status=='wait'){
					return '已取消';
				}else{
					return value;
				}
			},
			width:120
		},{
			field : 'shift_status',
			title : ' 返点确认',
			formatter:function(value,row,index){
				if(value=='wait'){
					return '<button onclick="checkOneBill(\''+row.accept_status+'\',\''+row.bill_id+'\')">确认</button>';
				}else{
					return '已完成';
				}
			},
			width:80
		} */
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
		singleSelect : false,
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
		ls_url = cur_path + "/esbServer.do?method=execProc&methodId=zk_area_points_info_query&in_type=company&in_zk_id="+user_code;
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
function checkOneBill( accept_status, bill_id )
{
		var ls_id = "&in_zk_bill_mgr0="+bill_id;
		if(accept_status=='wait'){
			$.messager.confirm("结算确认","点数尚未结算，是否确认放弃结算？",function(r){
					if(r){
					   		var ls_url = cur_path + "/esbServer.do?in_URLEncoding=UTF-8&method=execProc&methodId=zk_area_points_info_query&in_buss_id=shift_bill&in_add_person="+user_code+ls_id+"&date="+new Date();
							ajaxDealUrl(ls_url,'操作成功',downOrreloadData);
					}
			});
		}else{
					   		var ls_url = cur_path + "/esbServer.do?in_URLEncoding=UTF-8&method=execProc&methodId=zk_area_points_info_query&in_buss_id=shift_bill&in_add_person="+user_code+ls_id+"&date="+new Date();
							ajaxDealUrl(ls_url,'操作成功',downOrreloadData);
		}
 }
function checkBill()
{
		var lo_selected;      //当前选中行
	    var ls_id = "";        //用户id
	    var ls_url;           //url
	    var ls_sign="";
	    var amount=0;
	    var accept_status="over";
	    var confirm_msg="";
	    var wait_rows=0;
	    lo_selected   = getCheckObj('resultId','请选择要确认的记录！'); 
	    if(!lo_selected[0]){
	    	$.messager.alert('提示信息','请选择要审核的信息！','info');
	    	return false;
	    }else{
	    	for(var i=0;i< lo_selected.length;i++){
    			ls_id += "&in_zk_bill_mgr"+i+"="+ lo_selected[i].bill_id;
    			if (lo_selected[i].shift_status=='over'){
    				$.messager.alert("提示信息","请取消选择已完成的记录！","info");
    				return;
    			}else if(lo_selected[i].accept_status=='wait'){
    				accept_status="wait";
    				wait_rows++;
    			}else{
    				 amount+=lo_selected[i].amount;
    			}
   			}
   			if( accept_status=="wait" ){
	    		confirm_msg="共"+lo_selected.length+"条记录，有"+wait_rows+"条记录尚未结算,有效点数"+amount+"点,,是否继续？";
   			}else{
   			    confirm_msg="共"+lo_selected.length+"条记录，总计点数"+amount+"点,是否继续？";
   			}
			$.messager.confirm("结算确认",confirm_msg,function(r){
					if(r){
					   		var ls_url = cur_path + "/esbServer.do?in_URLEncoding=UTF-8&method=execProc&methodId=zk_area_points_info_query&in_buss_id=shift_bill&in_add_person="+user_code+ls_id+"&date="+new Date();
							ajaxDealUrl(ls_url,'操作成功',downOrreloadData);
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
function billStat(){
	var in_area_id=$("#in_area_id").combobox("getValue");
	var in_company_name =  $('#in_company_name').val() ;
	var in_add_time_1 = $("#in_add_time_1").datebox('getValue');
	var in_add_time_2 = $("#in_add_time_2").datebox('getValue');
	var queryStr="&method=execProc&methodId=zk_area_points_info_query&in_add_time_1="+in_add_time_1+"&in_add_time_2="+in_add_time_2;
		 queryStr+="&in_area_id="+in_area_id+"&in_company_name="+in_company_name;
    $('#if_deal')[0].src='jStatWindow.jsp?in_r=zk&in_action=billstat'+queryStr;
    $('#dlg_deal').dialog({width:320,height:260,fit:false});
    $('#dlg_deal').dialog('open').dialog('setTitle','佣金统计'); 
}