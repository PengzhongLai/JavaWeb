<%--
  Created by IntelliJ IDEA.
  User: Lai
  Date: 2023/09/21
  Time: 16:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>练习APEX时长两年半的个人练习生</title>
</head>
<body>

<div style="display: flex;flex-direction:column">
    <div style="margin: auto">
        <img src="/img/Pai.jpg" width="220" height="200">
    </div>

    <div style="margin: auto">
        <span><input id="input" class="input"><button id="button" class="redirect">百度一下</button></span>
    </div>
</div>

<style type="text/css">
    .input {
        width: 512px;
        height: 16px;
        padding: 12px 16px;
        font-size: 16px;
        margin: 0;
        vertical-align: top; /*设置顶部或垂直方式*/
        outline: 0;
        box-shadow: none;
        border-radius: 10px 0 0 10px;
        border: 2px solid #c4c4ce;
        background-color: #ffffff;
        color: #000000;
        overflow: hidden;
        box-sizing: content-box;
        -webkit-top-highlight-color: transparent; /*将当前标签高亮编程透明*/
    }

    .redirect {
        width: 108px;
        height: 44px;
        background-color: #4e6ef2;
        border-radius: 0 10px 10px 0;
        font-size: 17px;
        color: white;
        font-weight: 400;
        border: none;
        cursor: pointer; /*鼠标变小手*/
    }
</style>

<%--<h1 align="center"><img src="/img/Pai.jpg" width="100" height="100"></h1>
<div align="center">
<input type="search" style="color: black; width: 400px; height: 40px;"/>
<button id="redirect" style="color:#4e6ef2; width: 100px; height: 40px;">开始练习</button><!--id后是属性-->
</div>--%>

</body>
</html>

<script>
    document.getElementById("button").addEventListener("click", function () {
        var content = document.getElementById("input").value; //根据id属性值获取一个元素节点对象
        console.log(content); //输出信息
        window.location.href = "/Laipengzhong_war_exploded/MyServlet?content=" + content;
        //var定义的是什么，=后就接什么 若有多个参数，则用&分割，例如 ....../MyServlet?a="+a + "&b="+b + "&c="+c;
    })
</script>