<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>
<script type="text/javascript">
	var cur_path = "<%=request.getContextPath()%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_common.js"></script>
<script type="text/javascript" src="./LoginView.js"></script>
<script type="text/javascript">
	var id = "<%=request.getParameter("id")%>";
</script>
</head>

<body>
<form id="fm" method="post"  name="fm">
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
	<tr>
		<td width="10%">用户账号：</td>
		<td width="90%" id="in_user_id"></td>
	</tr>
	<tr>
		<td width="10%">姓名：</td>
		<td width="90%" id="in_user_name"></td>
	</tr>
	<tr>
		<td width="10%">用户密码：</td>
		<td width="90%" id="in_user_pass"></td>
	</tr>
	<tr>
		<td width="10%">用户邮箱：</td>
		<td width="90%" id="in_user_email"></td>
	</tr>
</table>
</form>
</body>
</html>
