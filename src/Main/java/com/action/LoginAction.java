package Main.java.com.action;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import Main.java.com.domain.User;
import Main.java.com.util.ConnDb;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@WebServlet("/LoginServlet")
public class LoginAction extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException{
        //设置返回数据和请求数据的编码字符集为UTF-8。否则接收到的数据会乱码
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=UTF-8");
        //获取请求的参数
        String loginId=request.getParameter("loginId");
        String password=request.getParameter("password");
        //调用方法
        User user=this.queryUserInfo(loginId,password);
        //创建json对象
        JSONObject json=new JSONObject();
        if(user != null){
            //若登录成功将loginId参数写入到session会话存储中， request.getSession().setAttribute("loginId",loginId);
            request.getSession().setAttribute("loginId",loginId);
            //将数据转换成json格式的数据
            json.put("code",1);
            json.put("msg","该账号有权限登录系统");

        }else {
            json.put("code",-1);
            json.put("msg","该账号没有权限登录系统");
        }
        //将json对象转为String类型
        String ri= JSON.toJSONString(json);
        //把字符串对象写入到响应response
        response.getWriter().write(ri);
    }
    //根据输入的账号和密码查询信息
    public User queryUserInfo(String loginId, String pwd){
        User user=null;
        try {
            ConnDb db=new ConnDb();
            //调用连接数据库方法
            Connection conn = db.dataBaseConnection();
            System.out.println("=====开始执行查询sql======");
            //创建 SQL 命令语句
            String sql="SELECT * FROM tb_sys_user WHERE loginId=? and password=?";
            //创建 PreparedStatement 预处理对象pstmt
            PreparedStatement pstmt =conn.prepareStatement(sql);
            //为“?”按照类型一一对应赋值
            pstmt.setString(1, loginId);
            pstmt.setString(2,pwd);
            //执行sql,将会返回一个数据库的结果集存入ResultSet
            ResultSet rs= pstmt.executeQuery();
            while(rs.next()){ //循环判断下一行是否为空
                user=new User();
                String loginId1=rs.getString("loginId");
                user.setLoginId(loginId1);
                String password=rs.getString("password");
                user.setPassword(password);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return user;
    }

    //根据登录的账号查询个人用户信息
    public User queryUserInfoByLoginId(String loginId){
        //创建一个User实体类存放查询到字段
        User user=new User();
        try {
            ConnDb db=new ConnDb();
            //调用连接数据库方法
            Connection conn = db.dataBaseConnection();
            System.out.println("=====开始执行查询sql======");
            //创建 SQL 命令语句
            String sql="SELECT a.loginId,a.password,b.userName,b.phone,\n" +
                    "b.email,b.registType,b.sex, DATE_FORMAT(b.updateTime,'%Y-%m-%d %H:%i:%s') as updateTime" +
                    " from tb_sys_user a\n" +
                    "LEFT JOIN tb_sys_staff_info b on a.loginId=b.loginId\n" +
                    "WHERE a.loginId=?";
            //创建 PreparedStatement 预处理对象pstmt
            PreparedStatement pstmt =conn.prepareStatement(sql);
            //为“?”按照类型一一对应赋值
            pstmt.setString(1, loginId);
            //执行sql,将会返回一个数据库的结果集存入ResultSet
            ResultSet rs= pstmt.executeQuery();
            while (rs.next()){
                user.setLoginId(rs.getString("loginId"));
                user.setUserName(rs.getString("userName"));
                user.setPassword(rs.getString("password"));
                user.setPhone(rs.getString("phone"));
                user.setEmail(rs.getString("email"));
                user.setRegistType(rs.getString("registType"));
                user.setSex(rs.getString("sex"));
                user.setUpdateTime(rs.getString("updateTime"));
            }
            conn.close();//关闭数据库资源
        }catch (Exception e){
            e.printStackTrace();
        }
        return user;
    }



}
