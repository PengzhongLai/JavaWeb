package Main.java.com.action;

import Main.java.com.domain.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet("/ShellPageServlet")
public class ShellPageAction extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //设置返回数据和请求数据的编码字符集为UTF-8。否则接收到的数据会乱码
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=UTF-8");

        LoginAction lg = new LoginAction();
        //从session绘画中获取登录账号
        String loginId= request.getSession().getAttribute("loginId").toString();
        User user = lg.queryUserInfoByLoginId(loginId);
        //将用户名写入到session
        request.getSession().setAttribute("userName",user.getUserName());

        //getRequestDispatcher获取请求转发对象
        request.getRequestDispatcher("/WEB-INF/JSP/shellPage.jsp").forward(request, response);
    }
}
