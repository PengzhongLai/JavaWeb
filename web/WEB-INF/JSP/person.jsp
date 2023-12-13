<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div id="hm-app-main" class="main" style="min-height: 865px;">
    <div ui-view="" class="ng-scope">
        <div class="main-view active ng-scope">
            <div class="content">
                <div class="head">
                    <div class="inner">
                        <h2>个人中心</h2>
                        <button type="button" class="btn hmbtn-defalt1 hmbtn-add fr"
                                onclick="personEdit()">修改
                        </button>
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
                                <p class="contentShow fl align-left ng-binding">${user.userName}</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span class="row-header fl align-right">密码</span>
                                <p class="contentShow fl align-left ng-binding">**********</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span class="row-header fl align-right">手机号</span>
                                <p class="contentShow fl align-left ng-binding">${user.phone}</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span class="row-header fl align-right">邮箱</span>
                                <p class="contentShow fl align-left ng-binding">${user.email}</p>
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
