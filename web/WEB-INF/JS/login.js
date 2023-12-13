/**
 * 实现登录功能
 * **/
function login() {
    //获取用户名
    var loginId = document.getElementById("loginId").value;
    if(loginId == null ||  loginId == ""){
        alert("请输入账号！");
        return;
    }
    //获取密码
    var password = document.getElementById("password").value;
    if(password==null || password==""){
        alert("请输入密码！");
        return;
    }
    console.log("输入的用户名为："+loginId);
    console.log("输入的密码为："+password);
    //$.ajax 用来实现前端和后端服务的交互(异步执行)
    $.ajax({
        "dateType":"json",
        "type":"GET",
        "data":{"loginId":loginId,"password":password},
        "url":"/Laipengzhong_war_exploded/LoginServlet",
        "success":function (result) {
            console.log(result);
            //JSON.parse用来将字符串序列化为json格式
            result = JSON.parse(result);
            if(result.code == 1){
                alert("登录成功！")
            }else{
                alert("登录失败！")
            }
        },error:function (XMLHttpRequest, textStatus, errorThrown) {
            alert("连接到服务器出现错误，请稍后再试。");
        }
    });
}
//去注册，点击跳转注册页面
function goRegist() {
    window.location.href="/Laipengzhong_war_exploded/RegistServlet";
}