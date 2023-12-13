<%--
  Created by IntelliJ IDEA.
  User: Lai
  Date: 2023/10/09
  Time: 9:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<%--request.getSession().setAttribute("content",content); --%>
<h1><%=session.getAttribute("content")%></h1>

</body>
</html>
