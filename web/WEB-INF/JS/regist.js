/*取消功能返回登录页*/
function cancel() {
    window.location.href="/Laipengzhong_war_exploded";
}
/*注册功能*/
function regist() {
    /*获取账号*/
    var loginId=document.getElementById("loginId").value;
    if(loginId==null ||loginId==""){
        alert("请输入账号！");
        return;
    }
    /*获取用户名*/
    var userName=document.getElementById("userName").value;
    if(userName==null ||userName==""){
        alert("请输入用户名！");
        return;
    }
    /*获取手机号*/
    var phone=document.getElementById("phone").value;
    if(phone==null ||phone==""){
        alert("请输入手机号！");
        return;
    }
    /*获取密码*/
    var password=document.getElementById("password").value;
    if(password==null ||password==""){
        alert("请输入密码！");
        return;
    }
    /*获取确认密码*/
    var passwordSure=document.getElementById("passwordSure").value;
    if(passwordSure==null ||passwordSure==""){
        alert("请输入确认密码！");
        return;
    }
    //判断二次输入的密码是否正确
    if(password != passwordSure){
        alert("两次输入的密码不相同，请重新输入！");
        return;
    }
    /*获取邮箱*/
    var email=document.getElementById("email").value;
    if(email==null ||email==""){
        alert("请输入邮箱！");
        return;
    }
    /*获取注册类型*/
    var registType=document.getElementById("registType").value;
    if(registType==null ||registType==""){
        alert("请输入注册类型！");
        return;
    }
    /*获取性别*/
    var sex =get_sex();//在同一个js中调用函数get_sex，该方法有返回值
    console.log("登录账号",loginId);
    console.log("用户名",userName);
    console.log("手机号",phone);
    console.log("密码",password);
    console.log("邮箱",email);
    console.log("注册类型",registType);
    console.log("性别",sex);
    //将数据放入json对象data中
    var data={
        "loginId":loginId,
        "password":password,
        "userName":userName,
        "phone":phone,
        "email":email,
        "registType":registType,
        "sex":sex
    };
    //$.ajax 用来实现前端和后端服务的交互(异步执行)
    $.ajax({
        "dateType":"json",//数据类型json
        "type":"POST",//接口请求类型
        "data":data,//参数数据
        "url":"/Laipengzhong_war_exploded/RegistServlet",//接口
        "success":function (result) {//接口请求成功后要实现的代码
            result=JSON.parse(result);//JSON.parse将字符串序列化成json格式
            console.log(result);
            if(result.code > 0){
                alert("注册成功！");
                cancel();//返回登录页
            }else if(result.code==-1){
                alert("该账号已被注册,请重新输入！")
            }else {
                alert("注册失败！");
            }
        },error:function (XMLHttpRequest, textStatus, errorThrown) {
            //接口请求失败后要实现的代码
            alert("连接到服务器出现错误，请稍后再试。");
        }
    });

}
//获取性别字段值
function get_sex() {
    var name="radio";
    var array=document.getElementsByName(name);//根据name属性绑定
    for(var i=0;i<array.length;i++){
        if(array[i].checked){
            return array[i].value;
        }
    }
}