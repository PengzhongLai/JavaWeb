package Main.java.com.action;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/PersonServlet")
public class PersonAction extends HttpServlet {
    protected  void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //将嵌入的子页面写入到session:参数：menuUrl
        request.getSession().setAttribute("menuUrl","person-edit.jsp");
        //getRequestDispatcher获取请求转发对象,跳转主页面
        request.getRequestDispatcher("/WEB-INF/JSP/shellPage.jsp").forward(request,response);
    }
}
