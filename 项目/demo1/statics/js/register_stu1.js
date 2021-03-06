$(function(){
	
	Register.init();
	
	/*$("#container_next").click(function(){
		window.location="register_stu2.jsp";
	});*/
});

function refreshCaptcha()
{
	var verify = $(".jcaptcha");
	verify.attr('src','jcaptcha.jpg?'+Math.random());
}
var Register = function () {
    
    return {
        init: function () {       	
	        $('.register-form1').validate({
	        	errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: true, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                user_name: {
	                    required: true,
	                },
	                sex: {
	                    required: true,
	                },
	                birthday: {
	                    required: true,
	                },
	                home_areas: {
	                    required: true,
	                },
	                edu_begin_date: {
	                    required: true,
	                },
	                edu_end_date: {
	                    required: true,
	                },
	                work_begin_date: {
	                    required: true,
	                },
	                work_end_date: {
	                    required: true,
	                },
	                introduce: {
	                    required: true,
	                },
	                position: {
	                    required: true,
	                },
	                hopeArea :{
	                	 required: true,
	                },
	                hopePosition :{
	                	 required: true,
	                }, 
	                hopeSalary :{
	                	 required: true,
	                }, 
	                college : {
	                	required: true,
	                },
	                company_name : {
	                	required: true,
	                },
	                education : {
	                	required: true,
	                },	                
	                profession : {
	                	required: true,
	                },
	                user_email: {
	                    required: true,
	                    email: true
	                },
	                contact_tel: {
	                	required : true,
	                	digits:true
	                },
	                qq: {
	                	required : true,
	                	digits:true
	                },
	                verfiy: {
	                    required: true,
	                }
	            },
	            messages: { // custom messages for radio buttons and checkboxes
	                user_name: {
	                    required:  "请输入姓名！",
	                },
	                sex: {
	                    required:  "请选择性别！",
	                },
	                birthday: {
	                    required:  "请点击输入框，选择出生日期！",
	                },home_areas: {
	                    required:  "请点击输入框，选择户籍所在地！",
	                },
	                edu_begin_date: {
	                    required:  "请点击输入框，选择日期！",
	                },
	                edu_end_date: {
	                    required:  "请点击输入框，选择日期！",
	                },
	                work_begin_date: {
	                    required:  "请点击输入框，选择日期！",
	                },
	                work_end_date: {
	                    required:  "请点击输入框，选择日期！",
	                },
	                introduce: {
	                    required:  "请点击输入框，输入工作描述！",
	                },
	                position: {
	                    required:  "请点击输入框，输入岗位名称！",
	                },
	                hopeArea :{
	                	 required: "请点击输入框，选择意向工作地区！",
	                },
	                hopePosition :{
	                	 required: "请点击输入框，选择意向岗位！",
	                }, 
	                hopeSalary :{
	                	 required: "请输入期望薪资！",
	                	 digits: "请输入数字！"
	                }, 
	                college : {
	                	required: "请输入毕业院校！",
	                },
	                company_name : {
	                	required: "请输入公司名称！",
	                },
	                education : {
	                	required: "请输入学历！",
	                },
	                profession : {
	                	required: "请输入所学专业！",
	                },
	                user_email: {
	                    required: "请输入邮箱！",
						email:"请输入正确的邮箱格式！",
	                },
	                organization: {
	                	required: "请输入单位名称！",
	                },
	                contact_person: {
	                	required: "请输入联系人！",
	                },
	               contact_tel: {
	                	required: "请输入联系电话！",
	                	digits:"请输入数字", 
	                },
	                qq: {
	                	required: "请输入QQ！",
	                	digits:"请输入数字", 
	                },
					verfiy: {
						required: "必须同意本协议才能继续注册！",
					}
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	            },
	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },
	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },
	            errorPlacement: function (error, element) {
	                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
	                    error.addClass('help-small no-left-padding').insertAfter($('#register_tnc_error'));
	                } else {
	                    error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
	                }
	            },
	            submitHandler: function(form) {
	            	$("#reg_one_submit").attr("disabled",true);
	            	$("#reg_one_submit").attr("value","已经提交，请稍后…");
					$.ajax({
						url : $(form).attr("action"),
						data : $(form).serialize(),
						type : "post",
						dataType : "text",
						success : function(data) {
									$("#reg_one_submit").removeAttr("disabled");
									$("#reg_one_submit").attr("value","保存");
									if(data=="11"){
										window.location="register_stu2.jsp";
									}else{
										alert("注册失败");
									}
							},
						complete : function(XMLHttpRequest, textStatus) {
										},
						contentType:"application/x-www-form-urlencoded; charset=utf-8"
						});
					}
				});
		}
	}
}();
var options_stu={
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: true, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                user_id: {
	                    required: true,
	                    isUserName: true,
	                    remote:{url: cur_path + "validateForm.do",
	                    	dateType:"json",
	                    	type:"post"
	                    }
	                },
	                user_pass: {
	                    required: true
	                },
	                rpassword: {
	                    equalTo: "#register_password"
	                },
	                user_name: {
	                    required: true,
	                },
	                sex: {
	                    required: true,
	                },
	                birthday: {
	                    required: true,
	                },
	                begin_date: {
	                    required: true,
	                },
	                end_date: {
	                    required: true,
	                },
	                hopeArea :{
	                	 required: true,
	                },
	                hopePosition :{
	                	 required: true,
	                }, 
	                hopeSalary :{
	                	 required: true
	                }, 
	                college : {
	                	required: true
	                },
	                education : {
	                	required: true
	                },	                
	                profession : {
	                	required: true
	                },
	                user_email: {
	                    required: true,
	                    email: true
	                },
	                contact_tel: {
	                	required : true,
	                	digits:true
	                },
	                verfiy: {
	                    required: true
	                }
	            },
	            messages: { // custom messages for radio buttons and checkboxes
	                user_id: {
	                    required: "请输入用户名！",
	                    remote:"该用户名已被注册，请重新输入！"
	                },
	                user_pass: {
	                    required: "请输入密码！"
	                },
	                rpassword: {
	                    equalTo: "两次输入的密码不相同！"
	                },
	                user_name: {
	                    required:  "请输入姓名！"
	                },
	                sex: {
	                    required:  "请选择性别！",
	                },
	                birthday: {
	                    required:  "请点击输入框，选择出生日期！",
	                },
	                hopeArea :{
	                	 required: "请点击输入框，选择意向工作地区！",
	                },
	                hopePosition :{
	                	 required: "请点击输入框，选择意向岗位！",
	                }, 
	                hopeSalary :{
	                	 required: "请输入期望薪资！"
	                }, 
	                college : {
	                	required: "请输入毕业院校！"
	                },
	                education : {
	                	required: "请输入学历！"
	                },
	                profession : {
	                	required: "请输入所学专业！"
	                },
	                user_email: {
	                    required: "请输入邮箱！",
						email:"请输入正确的邮箱格式！"
	                },
	                organization: {
	                	required: "请输入单位名称！"
	                },
	                contact_person: {
	                	required: "请输入联系人！"
	                },
	               contact_tel: {
	                	required: "请输入联系电话！",
	                	digits:"请输入数字", 
	                },
					verfiy: {
						required: "必须同意本协议才能继续注册！"
					}
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	            },
	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },
	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },
	            errorPlacement: function (error, element) {
	                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
	                    error.addClass('help-small no-left-padding').insertAfter($('#register_tnc_error'));
	                } else {
	                    error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
	                }
	            },
	            submitHandler: function(form) {
	            	$("#stu_sumbit").attr("disabled",true);
	            	$("#stu_sumbit").attr("value","已经提交，请稍后…");
					$.ajax({
						url : $(form).attr("action"),
						data : $(form).serialize(),
						type : "post",
						dataType : "text",
						success : function(data) {
								    		if (data=="66" || data=="88"){
								    			window.location="register_ok.jsp";
								    		}else if(data=="99"){	
								    			window.location="/member/home.do";
									    	}else{
									    		$("#stu_sumbit").removeAttr("disabled");
									    		$("#stu_sumbit").val("同意以上条款并注册");
									    		if (data=="4"){
									    			alert("此用户名已存在！");
									    		}else if (data=="9"){
									    			alert("手机号或邮箱已注册211校招网帐号,请找回密码,申诉请拨打029-88662468！");
									    		}else if(data=="11"){
									    			window.location="register_stu2.jsp";
									    		}else{
									    			alert("注册失败");
									    		}
								    		}	
										},
						complete : function(XMLHttpRequest, textStatus) {
										},
						contentType:"application/x-www-form-urlencoded; charset=utf-8"
						});
					}
				};			
				
	//弹出窗口
	function pop(){
		//将窗口居中
		makeCenter();
		//初始化省份列表
		initProvince();
		//默认情况下, 给第一个省份添加choosen样式
		$('[province-id="1"]').addClass('choosen');

		//初始化大学列表
		initSchool(2);
	}
	//隐藏窗口
	function hide()
	{
		$('#choose-box-wrapper').css("display","none");
	}

	function initProvince()
	{
		//原先的省份列表清空
		$('#choose-a-province').html('');
		for(i=0;i<schoolList.length;i++)
		{
			$('#choose-a-province').append('<a class="province-item" province-id="'+schoolList[i].id+'">'+schoolList[i].name+'</a>');
		}
		//添加省份列表项的click事件
		$('.province-item').bind('click', function(){
				var item=$(this);
				var province = item.attr('province-id');
				var choosenItem = item.parent().find('.choosen');
				if(choosenItem)
					$(choosenItem).removeClass('choosen');
				item.addClass('choosen');
				//更新大学列表
				initSchool(province);
			}
		);
	}

	function initSchool(provinceID)
	{
		//原先的学校列表清空
		$('#choose-a-school').html('');
		var schools = schoolList[provinceID-2].school;
		for(i=0;i<schools.length;i++)
		{
			$('#choose-a-school').append('<a class="school-item" school-id="'+schools[i].id+'">'+schools[i].name+'</a>');
		}
		//添加大学列表项的click事件
		$('.school-item').bind('click', function(){
				var item=$(this);
				var school = item.attr('school-id');
				//更新选择大学文本框中的值
				$('#school_id').val( school );
				$('#college').val(item.text());
				//关闭弹窗
				hide();
			}
		);
	}
	function makeCenter()
	{
		$('#choose-box-wrapper').css("display","block");
		$('#choose-box-wrapper').css("position","absolute");
		$('#choose-box-wrapper').css("top", Math.max(0, (($(window).height() - $('#choose-box-wrapper').outerHeight()) / 2) + $(window).scrollTop()) + "px");
		$('#choose-box-wrapper').css("left", Math.max(0, (($(window).width() - $('#choose-box-wrapper').outerWidth()) / 2) + $(window).scrollLeft()) + "px");
	
		$('.input-school-name-btn').show();
		$('.input-school-name').hide();
	}
	function inputSchoolName()
	{
		var school_name=$("input[name='new_school_name']").val();
		if(school_name==''){
			alert("请输入学校名称！");
		}else{
			$("input[name='college']").val( school_name );
			$('#school_id').val('');
			hide();
		}
	}

	
	