<%--在当前页面导入时间类型引用包--%>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link rel="stylesheet" href="/css/regist.css?_t=<%=new Date().getSeconds()%>" type="text/css">
    <title>学生成绩管理系统</title>
</head>
<body class="bodyCss">
<div class="loginDiv">
    <form>
        <div>
            <label class="fo-label">登录账号：</label>
            <input id="loginId" class="text-input" type="text" placeholder="请输入账号">
        </div>
        <div>
            <label class="th-label">用户名：</label>
            <input id="userName" class="text-input" type="text" placeholder="请输入用户名">
        </div>
        <div>
            <label class="th-label">手机号：</label>
            <input id="phone" class="text-input" type="text" placeholder="请输入手机号">
        </div>
        <div>
            <label class="tw-label">密码：</label>
            <input id="password" class="text-input" type="password" placeholder="请输入密码">
        </div>
        <div>
            <label class="fo-label">确认密码：</label>
            <input id="passwordSure" class="text-input" type="password" placeholder="请输入密码">
        </div>
        <div>
            <label class="tw-label">邮箱：</label>
            <input id="email" class="text-input" type="text" placeholder="请输入邮箱">
        </div>
        <div>
            <label class="fo-label">注册类型：</label>
            <select id="registType" class="text-input" name="">
                <option value="教师">教师</option>
                <option value="学生">学生</option>
            </select>
        </div>
        <div>
            <label class="tw-label">性别：</label>
            <label class="sex-label">男</label><input type="radio" class="sex-radio" checked="checked" value="男" name="radio">
            <label class="sex-label">女</label><input type="radio" class="sex-radio" value="女" name="radio">
        </div>
        <div>
            <button type="button" class="button-regist" onclick="regist()">注册</button>
            <button type="button" class="button-cancel" onclick="cancel()">取消</button>
        </div>
    </form>
</div>
</body>
</html>
<script src="/JS/regist.js?_t=<%=new Date().getSeconds()%>" type="text/javascript"></script>
<script src="/plugin/jquery-3.7.1.min.js" type="text/javascript"></script>