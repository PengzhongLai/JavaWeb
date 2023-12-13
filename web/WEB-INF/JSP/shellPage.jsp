<%@ page import="java.util.Date" %><%--
  Created by IntelliJ IDEA.
  User: xhwang
  Date: 2023/10/14
  Time: 22:59
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link rel="stylesheet" href="/plugin/hm-ajs-core/libs/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/plugin/hm-ajs-core/libs/bootstrap/css/daterangepicker.css">
    <link rel="stylesheet" href="/plugin/hm-ajs-core/libs/bootstrap/css/bootstrap-datetimepicker.css">
    <link rel="stylesheet" href="/plugin/hm-ajs-core/libs/toastr/css/toastr.min.css">
    <link rel="stylesheet" href="/plugin/hm-ajs-core/libs/jquery/css/jquery-accordion-menu.css">

    <link rel="stylesheet" href="/css/public/default.css" type="text/css">
    <link rel="stylesheet" href="/css/public/myStyle.css" type="text/css">

    <link id="ng_load_plugins_before">

    <link rel="stylesheet" href="/plugin/hm-ajs-core/css/default.css">
    <link rel="stylesheet" href="/plugin/hm-ajs-core/css/fileupload.css">
    <title>首页</title>
</head>
<body>
<div class="cd-popup">
    <div class="cd-popup-container">
        <img style="width: 50px;" src="/img/icons/loading.gif">
    </div>
</div>

<div class="top-nav-wrap ng-scope">
    <style class="ng-scope">
        .current-system {
            padding: 0px 20px;
        }

        .current-system:hover {
            background: #73b55b;
            cursor: pointer;
        }

        .submenu {
            padding: 10px;
            background: #509d59;
        }

        .group-tag {
            padding: 0px;
            display: flex;
        }

        .group-pinyin {
            padding: 10px;
            float: left;
        }

        .container-tag {
            padding: 10px;
            float: left;
        }

        .container-pinyin {
            padding: 0px;
        }

        .item-tag {
            width: 180px;
            min-height: 40px;
            background: rgba(10, 59, 91, 0.00);
            box-shadow: inset 0 -1px 0 0 #3B7093;
            ont-family: PingFangSC-Medium;
            font-size: 16px;
            color: #FFFFFF;
            text-align: center;
            line-height: 40px;
        }

        .item-menu {
            width: 180px;
            min-height: 40px;
            padding: 0px 10px;
            background: rgb(90 131 137 / 51%);
        }

        .item-menu-text {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            padding: 10px 10px;
            box-shadow: inset 0 -1px 0 0 #336281;
        }

        .item-menu:last-child .item-menu-text {
            box-shadow: inset 0 0px 0 0 #336281;
        }

        .item-menu:hover {
            background: #115E92;
            cursor: pointer;
        }

        .systemName {
            cursor: pointer;
        }
    </style>
    <div class="top-nav ng-scope">
        <div class="tn-header">
            <div class="tn-logo" style="width: 220px;height: 60px">
                <a><img src="/img/icons/icon-logo.png" alt="" style="width: 220px;height: 60px">
                </a>
            </div>
            <!--导航下拉-->
            <div class="tn-nav">
                <div class="tn-nav-menu">
                    <div class="dropdown ng-scope" style="margin-right: 0px;">
                        <a href="#">
                            <span class="glyphicon glyphicon-th-large"></span>
                            <span class="ng-binding">功能导航</span>
                        </a>
                        <div class="submenu">
                            <div class="ng-scope group-tag" style="width: 600px;">
                                <div class="ng-scope container-tag">
                                    <div class="item-tag ng-binding ng-scope">
                                        思政部
                                    </div>
                                    <div class="item-menu ng-scope">
                                        <div class="item-menu-text ng-binding" onclick="clickMenu('dlxy')">
                                            鼎利学院
                                        </div>
                                    </div>
                                    <div class="item-menu ng-scope">
                                        <div class="item-menu-text ng-binding" onclick="clickMenu('swjkxy')">
                                            生物与健康学院
                                        </div>
                                    </div>

                                </div>
                                <div class="ng-scope container-tag">
                                    <div class="item-tag ng-binding ng-scope">
                                        行政职能部门
                                    </div>
                                    <div class="item-menu ng-scope">
                                        <div class="item-menu-text ng-binding" onclick="clickMenu('')">
                                            教 务 处
                                        </div>
                                    </div>
                                    <div class="item-menu ng-scope">
                                        <div class="item-menu-text ng-binding" onclick="clickMenu('')">
                                            招生就业指导中心
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ng-repeat="op in itemList" class="ng-scope">

                        <div class="current-system ng-scope" onclick="clickMenu('')">
                            <span class="ng-binding">学生成绩管理系统</span>
                        </div>
                    </div>
                </div>
            </div>
            <!--右侧个人信息等-->
            <div class="tn-menu dropdown">
                <img src="/img/icons/help_but.png" class="help_ico_img" help-window="show">
                <a href="#" class="head-portrait">
                    <img alt="头像" style="border-radius: 50%;" src="/img/icons/icon-profile.png">
                </a>
                <a href="#" id="tn-menu-dropdown" class="tn-menu-dropdown" data-target="#" data-toggle="dropdown"
                   role="button" aria-haspopup="true" aria-expanded="false">
                <span class="ng-binding">
                    &nbsp;&nbsp;<%=session.getAttribute("userName") %>
                </span>
                    <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></a>
                <ul class="dropdown-menu popover bottom " aria-labelledby="dLabel">
                    <div class="arrow"></div>
                    <li><a ui-sref="personalList" ui-sref-opts="{reload:'personalList'}" href="#/personalList"><i
                            class="icon icon-user" style="vertical-align: text-top;margin-right: 5px"></i>个人中心</a></li>
                    <li>
                        <a href="#" onclick="loginOut()">
                            <i class="icon icon-off" style="vertical-align: text-top;margin-right: 5px"></i>
                            安全退出
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="page-container relative">
    <!--左侧导航-->
    <div class="page-slide-menu ng-scope">
        <div class="zzsc-container ng-scope">
            <div class="navcontent">
                <div id="jquery-accordion-menu" class="jquery-accordion-menu">
                    <ul>
                        <li class="ng-scope">
                            <a class="ng-binding ng-scope" onclick="clickMenuPage(1)">首页</a>
                        </li>
                        <li class="ng-scope">
                            <a class="ng-binding ng-scope" onclick="clickMenuPage(2)">学生信息管理</a>
                        </li>
                        <li class="ng-scope">
                            <a class="ng-binding ng-scope" onclick="clickMenuPage(3)">学生成绩录入</a>
                        </li>

                        <li class="ng-scope">
                            <a class="ng-binding ng-scope" onclick="clickMenuPage(3)">学生成绩发布</a>
                        </li>
                        <li class="ng-scope">
                            <a class="ng-binding ng-scope" onclick="clickMenuPage(4)">个人中心</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!--右侧内容区域，直接取到后端getSession().setAttribute中的参数-->
    <jsp:include page='${menuUrl}'></jsp:include>
</div>

<div class="footer ng-scope">
    <!-- 页脚-->
    <div class="footer ng-scope" style="margin-top: 5px">
        <p>CopyRight©2023 广东文理职业学院</p>
    </div>
</div>

<!--jquery plugins-->
<script src="/plugin/hm-ajs-core/libs/jquery/jquery.min.js"></script>
<script src="/plugin/hm-ajs-core/libs/jquery/jquery.ba-resize.min.js"></script>
<script src="/plugin/hm-ajs-core/libs/jquery/jquery-accordion-menu.js"></script>

<!--bootstrap-->
<script src="/plugin/hm-ajs-core/libs/moment.js"></script>
<script src="/plugin/hm-ajs-core/libs/bootstrap/bootstrap.min.js"></script>
<script src="/plugin/hm-ajs-core/libs/bootstrap/daterangepicker.js"></script>
<script src="/plugin/hm-ajs-core/libs/bootstrap/bootstrap-datetimepicker.js"></script>

<!--plugins-->
<script src="/plugin/hm-ajs-core/libs/bootbox.js"></script>
<script src="/plugin/subclipse/echarts.js"></script>

<!--angular-->
<script src="/plugin/hm-ajs-core/libs/angular/angular.min.js"></script>
<script src="/plugin/hm-ajs-core/libs/angular/angular-cookies.min.js"></script>
<script src="/plugin/hm-ajs-core/libs/angular/angular-sanitize.min.js"></script>
<script src="/plugin/hm-ajs-core/libs/angular/angular-ui-router.min.js"></script>
<script src="/plugin/hm-ajs-core/libs/angular/ui-bootstrap.min.js"></script>
<script src="/plugin/hm-ajs-core/libs/angular/ocLazyLoad.min.js"></script>
<script src="/plugin/hm-ajs-core/libs/angular/ngStorage.min.js"></script>
<script src="/plugin/hm-ajs-core/libs/angular/ng-file-upload.min.js"></script>
<script src="/plugin/hm-ajs-core/libs/toastr/toastr.min.js"></script>

<!--hmapp init-->
<script src="/plugin/hm-ajs-core/src/hmapp.js" type="text/javascript"></script>

<!--hmapp compnent-->
<script src="/plugin/hm-ajs-core/src/hmapp-fileupload.js" type="text/javascript"></script>

<script src="/plugin/select2/js/select2.full.js" type="text/javascript"></script>
<script src="/plugin/angular-ui-select2/src/select2.js" type="text/javascript"></script>
<script src="/plugin/select2/js/i18n/zh-CN.js" type="text/javascript"></script>

<script src="/JS/shellPage.js?_t=<%=new Date().getSeconds()%>" type="text/javascript"></script>

</body>
</html>
