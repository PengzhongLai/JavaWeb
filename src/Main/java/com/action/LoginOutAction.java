package Main.java.com.action;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 实现安全退出
 * **/
@WebServlet("/LoginOutServlet")
public class LoginOutAction extends HttpServlet {
    protected  void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //清空session，invalidate()方法来使Session失效
        request.getSession().invalidate();
        //getRequestDispatcher获取请求转发对象
        request.getRequestDispatcher("/WEB-INF/JSP/login.jsp").forward(request,response);
    }
    }
