<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../include/checkLogin.jsp" %>
<%@ taglib uri="TreeTag" prefix="t" %>
<%
	String id=request.getParameter("id");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>无标题文档</title>
<script type="text/javascript">
	var cur_path = "<%=request.getContextPath()%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_common.js"></script>
<script type="text/javascript" src="./LoginAdd.js"  charset="utf-8"></script>
<script type="text/javascript">
	var gi_pagesize = <%=request.getParameter("pagesize")%>;
	var gi_pagenum = <%=request.getParameter("pagenum")%>;
	var gi_currentnum = <%=request.getParameter("currentnum")%>;
</script>
<script type="text/javascript" src="../js/common.js"></script>
</head>

<body>
<form id="fm" method="post"  name="fm">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td colspan="2" align="center"><h2>开通登陆用户</h2></td>
	</tr>
	<tr>
		<td width="25%" align="right">用户账号：</td>
		<td><input id="in_user_id" name="in_user_id" class="easyui-validatebox" required="true"/></td>
	</tr>
	<tr style="display:none;">
		<td align="right">姓名：</td>
		<td><input id="in_user_name" name="in_user_name" class="easyui-validatebox" /></td>
	</tr>
	<tr>
		<td align="right">用户密码：</td>
		<td><input type="password" id="in_user_pass" name="in_user_pass" class="easyui-validatebox" required="true"/>
		</td>
	</tr>
	<tr>
		<td align="right">确认密码：</td>
		<td><input type="password" id="eq_user_pass" name="eq_user_pass" class="easyui-validatebox" validType="equalTo['#in_user_pass']" required="true"/></td>
	</tr>
	<tr>
		<td align="right">用户邮箱：</td>
		<td><input id="in_user_email" name="in_user_email" class="easyui-validatebox" data-options="validType:'email'" required="true"/></td>
	</tr>
	<tr><td colspan="2">&nbsp;</td></tr>
	<tr>
		<td width="25%" align="right">会员级别：</td>
		<td><input id="in_member_type" name="in_member_type" class="easyui-validatebox"/></td>
	</tr>
	<tr>
		<td width="25%" align="right">开始日期：</td>
		<td><input id="in_begin_date" name="in_begin_date" class="easyui-datebox" /></td>
	</tr>
	<tr>
		<td width="25%" align="right">截止日期：</td>
		<td><input id="in_end_date" name="in_end_date" class="easyui-datebox"/></td>
	</tr>
	<tr>
		<td><input id="in_company_id" name="in_company_id" value="<%=id %>" type="hidden"/></td>
		<td>
		<a href="javascript:void(0)" class="easyui-linkbutton" name="btn_save" id="btn_save">确定</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" name="btn_return" id="btn_return">取消</a></td>
	</tr>
	
</table>
</form>
</body>
</html>
