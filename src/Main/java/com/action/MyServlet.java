package Main.java.com.action;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;//包的所在路经继承了下面的类
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

@WebServlet("/MyServlet")//根据上代码获得页码代码
//extends是继承,如果没有extends，那么默认的父类是Object。HttpServlet没有匹配时，全红
public class MyServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //方法中请求（HttpServletRequest request），响应（HttpServletResponse response）； ServletException测是否是代码异常，IOException测是否输入异常
        //throws
        /**
         * 它用于在服务器内部将请求分派（dispatch）给其他Servlet、JSP页面或其他Web主件进行处理；
         * RequestDispatcher的主要作用是允许一个Servlet将其请求和响应传递给另一个Servlet或JSP页面，
         * **/
        //forward转发是一种在服务器内部将请求从一个Servlet转发到另一个Servlet或资源的机制

        try {

            String content = request.getParameter("content"); //把要传递的参数放入session(获取)
            request.getSession().setAttribute("content", content); //set输出获取的值
            request.getRequestDispatcher("/WEB-INF/JSP/a.jsp").forward(request, response); //getRequestDispatcher获取请求转发对象

        } catch (ServletException e) {
            e.printStackTrace();
        }
    }

    /*protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
     *//*getServletContext().log("日志");*//*
        System.out.println("doPost method called");

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        // 打印接收到的用户名和密码
        System.out.println("Received username: " + username);
        System.out.println("Received password: " + password);

        //将用户名和密码插入到数据库中
        Connection conn = null;
        try {
            // 与数据库建立连接
            String driver = "com.mysql.cj.jdbc.Driver";
            String url = "jdbc:mysql://localhost:3306/stu_info_manager_th?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai";
            String dbUsername = "root";
            String dbPassword = "2840302718Lai";
            Class.forName(driver);
            conn = DriverManager.getConnection(url, dbUsername, dbPassword);

            // 插入数据到表 tb_sys_user
            String sql = "INSERT INTO tb_sys_user (userName, password) VALUES (?, ?)";
            PreparedStatement statement = conn.prepareStatement(sql);
            statement.setString(1, username);
            statement.setString(2, password);

            int rowsInserted = statement.executeUpdate();
            if (rowsInserted > 0) {
                System.out.println("成功");
            } else {
                System.out.println("失败");
            }

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("数据库连接失败");
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        // 返回页面
        response.sendRedirect("/registration_success.jsp");
    }*/
}