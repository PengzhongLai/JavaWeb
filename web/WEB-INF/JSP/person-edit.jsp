<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link rel="stylesheet" href="/css/person.css?_t=<%=new Date().getSeconds()%>" type="text/css">
<div id="hm-app-main" class="main" style="min-height: 865px;">
    <div ui-view="" class="ng-scope">
        <div class="main-view active ng-scope">
            <div class="content">
                <div class="head">
                    <div class="inner">
                        <h2>个人中心</h2>
                    </div>
                </div>
                <div class="article">
                    <div class="infoone">
                        <ul class="margin-top20">
                            <li>
                                <span class="row-header fl align-right">账号</span>
                                <p class="contentShow fl align-left ng-binding">${user.loginId}</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span class="row-header fl align-right">姓名</span>
                                <input id="userName" class="text-input" type="text" value="${user.userName}">
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span class="row-header fl align-right">密码</span>
                                <input id="password" class="text-input" type="password" value="${user.password}">
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span class="row-header fl align-right">确认密码</span>
                                <input id="passwordSure" class="text-input" type="password" value="${user.password}">
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span class="row-header fl align-right">手机号</span>
                                <input id="phone" class="text-input" type="text" value="${user.phone}">

                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span class="row-header fl align-right">邮箱</span>
                                <input id="email" class="text-input" type="text" value="${user.email}">

                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span class="row-header fl align-right">注册类型</span>
                                <p class="contentShow fl align-left ng-binding">${user.registType}</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span class="row-header fl align-right">性别</span>
                                <p class="contentShow fl align-left ng-binding">${user.sex}</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span class="row-header fl align-right">更新时间</span>
                                <p class="contentShow fl align-left ng-binding">${user.updateTime}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="child-view ng-scope">
            <ui-view class="ng-scope">

            </ui-view>
        </div>
    </div>
</div>
<script src="/JS/person.js?_t=<%=new Date().getSeconds()%>" type="text/javascript"></script>