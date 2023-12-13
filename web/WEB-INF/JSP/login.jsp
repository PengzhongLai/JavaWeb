
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link rel="stylesheet" href="/css/Login.css" type="text/css">
    <title>学生成绩管理系统</title>
</head>
<body class="bodyCss">
<div class="loginDiv">
    <form >
        <h1 class="h1Css">学生成绩管理系统</h1>
        <div>
            <input id="loginId" class="text-input" type="text" placeholder="账号">
        </div>
        <div>
            <input id="password" class="text-input" type="password" placeholder="密码">
        </div>
        <div class="btn-div">
            <button class="button" type="button" onclick="login()">登录</button>
            <a class="a-css" onclick="goRegist()">点此注册</a>
        </div>
    </form>
</div>
</body>
</html>
<script src="/JS/login.js" type="text/javascript"></script>
<script src="/plugin/jquery-3.7.1.min.js" type="text/javascript"></script>