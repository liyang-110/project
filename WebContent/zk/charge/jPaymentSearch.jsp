<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../include/checkLogin.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page"/>
	<script type="text/javascript">
		var cur_path = "<%=request.getContextPath()%>";
	    var user_code ="<%=user_code%>";
	</script>
<script type="text/javascript" src="../js/in_common.js" charset="utf-8"></script>
<script type="text/javascript" src="Payment.js" charset="utf-8"></script>
  </head>
  
  <body>
		<div class="easyui-layout" style="width: 100%; height: 350px;" data-options="fit:true">
			
		<div data-options="region:'north',border : false" style="background:#F4F4F4;">
	        <div style="padding:10px 0 10px 20px;">
	        <form id="fm" name="fm" method="post">
	       时间: <input  id="in_add_time_1" name="in_add_time_1" class="easyui-datebox" style="width:100px" />
	            -- <input id="in_add_time_2" name="in_add_time_2" class="easyui-datebox" style="width:100px" />
	            <a href="#" id="searchAndreloadData" class="easyui-linkbutton" iconCls="icon-search">搜索</a>
	       	
	            <a href="#" id="paymentStat" class="easyui-linkbutton" iconCls="icon-search">提现统计</a>
			 </form>
	        </div>
    
		</div>
			
			<div data-options="region:'center',border:false">
				<table id="resultId" name='resultId'>
				</table>
			</div>
	    </div>
		<div id="dlg_deal" class="easyui-dialog" fit="true" style="width: 100%; height: 100%; padding: 0px 0px" closed="true" buttons="#dlg-buttons">
			<iframe scrolling="auto" id="if_deal" frameborder="0" src="" style="width: 100%; height: 100%;"></iframe>
		</div>
		
	 	<div id="w1" class="easyui-window" title="行业选择" data-options="modal:true,closed:true" style="width:690px;height:370px;padding:10px;">
			<iframe  frameborder="0" id="add"  scrolling="hidden" src="" width="100%" height="630"></iframe>
		</div> <!-- id="w1" -->
  </body>
</html>