<%@ page language="java" import="java.util.*"  contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="include/initdata.jsp" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>面试结果 - <%=jobfairMap.get("job_fair_name") %> - <%=com.zhaopin.Config.getSiteTitle() %></title>
<link type="text/css" rel="stylesheet" href="style/bootstrap.min.css" />
<link type="text/css" rel="stylesheet" href="style/already.css" />
<link type="text/css" rel="stylesheet" href="style/core.css" />
<script type="text/javascript" src="js/jquery.min.js"></script>
<script src="/statics/jquery/jquery.cookie.js" type="text/javascript"></script> 

<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript"  src="js/carousel.js"></script>
<script type="text/javascript" src="js/jquery.downCount.js"></script>


<script src="<%=request.getContextPath()%>/assets/artDialog/artDialog.js?skin=green"></script>
<script src="<%=request.getContextPath()%>/assets/artDialog/plugins/iframeTools.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/assets2/scripts/front.js" charset="utf-8"></script>
<script type="text/javascript">
	if (window!=top) // 判断当前的window对象是否是top对象
		top.location.href =window.location.href; 
	var cur_path = "<%=request.getContextPath()%>";
</script>
<script type="text/javascript" src="js/flow.js" charset="utf-8"></script>
<script type="text/javascript" src="js/jquery-scrollable.js" charset="utf-8"></script>

<script type="text/javascript">
	$(function(){
		$(".nav-pills>li:eq(2)").addClass("activ_one");
	});
</script>
<jsp:include page="include/weixin.jsp" flush="true" />
</head>

<body>
<jsp:include page="include/header_sch.jsp"></jsp:include>

<!--banner完成-->
<div class="job">
    <h1>面试结果</h1>
</div>
<!--job完成-->
<div class="inform">
	<div class="inform_a inform_b inform_c">
    	<h2>学生收到通知</h2>
		<table class="table">
           <thead>
              <tr class="active">
              	 <th>时间</th>
                 <th>姓名</th>
                 <th>职位</th>
                 <th>单位</th>
                 <th>状态</th>                                                                                   
              </tr>
           </thead>
           <tbody>
       <%
        List<HashMap> interviewResult = (List<HashMap>)request.getAttribute("interviewResult");
        
       if(interviewResult!=null && interviewResult.size()>0){
       		int status =0;
       		for(HashMap row: interviewResult ){
       			status=0;
	       		try{
	       			status = Integer.parseInt( (String)row.get("status") );
	       		}catch(Exception e){}
       		
       	%>
              <tr>
              	<td><%=row.get("add_time") %></td>
                 <td>
                <a href="javascript:;" onclick="open_resume_layer('/company/resumeDetail.do?netcongress=true&id=<%=row.get("student_id") %>')">
            	<%=row.get("name") %></a></td> 
            	<td><%=row.get("job_name")==null?"":row.get("job_name") %></td>                                                                         
                 <td>
                 <a title="<%=row.get("company_name") %>" target="_blank" href="/company/info.do?id=<%=row.get("company_id")%>">
            	<%=row.get("company_name") %>
            	</a>
                </td>
                <td>
                 <% if(2==status ){%>
            	<span class="green">面试通知</span>
            	<% }else if( 5==status) {%>
            	<span class="red">录用通知</span>
            	<% }else if( 4==status) {%>
            	<span class="yellow">复试通知</span>
            	<% } %></td>
              </tr>
           
       	<%
       		}
       }
        %>
           </tbody>
        </table>
        <!--分页-->
        <%=request.getAttribute("pagenation") %>
    </div>
</div>
<jsp:include page="include/footer.jsp" flush="true" />

</body>
</html>
