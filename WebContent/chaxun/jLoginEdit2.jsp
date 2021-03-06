<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.zhaopin.dao.factory.RoleModel" %>
<%@ include file="checkLogin.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>我的账户</title>
<script type="text/javascript">
	var cur_path = "<%=request.getContextPath()%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_common.js"></script>
<script type="text/javascript" src="./LoginEdit.js"  charset="utf-8"></script>
<script type="text/javascript" src="../js/common.js"  charset="utf-8"></script>
<script type="text/javascript">
	var gi_pagesize = <%=request.getParameter("pagesize")%>;
	var gi_pagenum = <%=request.getParameter("pagenum")%>;
	var gi_currentnum = <%=request.getParameter("currentnum")%>;
	var id = "<%=request.getParameter("id")%>";
	var user_code="<%=user_code%>";
</script>
<link rel="stylesheet" href="/statics/Huploadify/Huploadify.css" type="text/css"></link>
<script type="text/javascript" src="/statics/Huploadify/jquery.Huploadify.js" charset="utf-8"></script>
<script type="text/javascript" src="/statics/Huploadify/autouploadfile.js" charset="utf-8"></script>
<script type="text/javascript">
$(function(){
	Huploadify_file('card_img_upload_btn', '' ,"in_card_img","card_img_name","img","uploader",function(d){
		var temp = d.split("|");
		var path = temp[2];
		$("#in_head_path").val( "/"+path );
	});
});
</script>
</head>

<body>
<form id="fm" method="post"  name="fm">
	<input type="hidden" name="in_acc_type" value="0" />
	<input type="hidden" name="in_role_id" value="employ"/>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<!-- 
	<tr>
		<td align="right">权限角色：</td>
		<td>
		<select id="in_role_id" name="in_role_id" class="easyui-combobox" data-options="editable:false">
			<% //=RoleModel.selectOptions(user_code) %>
		</select>
		</td>
	</tr>
	-->
	<tr>
		<td width="25%" align="right">用户名：</td>
		<td><input id="in_user_id" name="in_user_id" class="easyui-validatebox" required="true"/></td>
	</tr>
	<tr>
		<td  align="right">密码：</td>
		<td><input id="in_user_pass" name="in_user_pass" class="easyui-validatebox" validType="equalTo['#eq_user_pass']"  />
				<span style="color:red;">不修改密码请留空</span>
		</td>
	
	</tr>
	<tr>
		<td  align="right">确认密码：</td>
		<td><input id="eq_user_pass" name="eq_user_pass" validType="equalTo['#in_user_pass']"   class="easyui-validatebox"/></td>
	</tr>
	<tr>
		<td align="right">姓名：</td>
		<td><input id="in_user_name" name="in_user_name" class="easyui-validatebox" required="true" /></td>
	</tr>
	<tr>
		<td align="right">手机：</td>
		<td><input id="in_user_tel" name="in_user_tel" class="easyui-validatebox" /></td>
	</tr>
	<tr>
		<td align="right">QQ：</td>
		<td><input id="in_user_qq" name="in_user_qq" class="easyui-validatebox" /></td>
	</tr>
	<tr>
		<td align="right">电子邮件：</td>
		<td><input id="in_user_email" name="in_user_email" class="easyui-validatebox" validType="email" /></td>
	</tr>
	<tr>
		<td align="right">图片：</td>
		<td>
        <table style="margin-left:-3px;">
        	<tr>
        		<td>
					<input name="card_img_name" type="text" readonly id="card_img_name" />
					<input type="hidden" name="in_card_img" id="in_card_img"/>
					<input type="hidden" name="in_head_path" id="in_head_path" />
				</td>
				<td>
					<div id="card_img_upload_btn" style="line-height:1em;"></div>
				</td>
				<td>
					<span class="red">格式：*.jpg;*.png，大小<1M。</span>
				</td>
			</tr>
		</table>
		</td>
	</tr>
	
	<tr>
		<td>&nbsp;</td>
		<td>&nbsp;</td></tr>
	<tr>
		<td>&nbsp;</td>
		<td>
		<a href="javascript:void(0)" class="easyui-linkbutton" name="btn_save" id="btn_save">确定</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" name="btn_return" id="btn_return">取消</a></td>
	</tr>
</table>
</form>
</body>
</html>
