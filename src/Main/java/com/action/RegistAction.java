package Main.java.com.action;

import Main.java.com.domain.User;
import Main.java.com.util.ConnDb;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.rmi.ServerException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/*
 *实现注册功能
 * Aurhor admin
 * @Date 23-11-09
 */
@WebServlet("/RegistServlet")//根据上代码获得页码代码
public class RegistAction extends HttpServlet {
    //根据业务需要重写  doPost()方法；
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException{
        //设置返回数据和请求数据的编码字符集为UTF-8。否则接收到的数据会乱码
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=UTF-8");
        //通过request提供的getParameter方法获取参数
        String loginId = request.getParameter("loginId");
        String userName = request.getParameter("userName");
        String phone = request.getParameter("phone");
        String password = request.getParameter("password");
        String email = request.getParameter("email");
        String sex = request.getParameter("sex");
        //获取注册类型参数
        String registType = request.getParameter("registType");
        //创建一个实体类,将字段写入到该实体类中
        User user=new User();
        user.setLoginId(loginId);
        user.setUserName(userName);
        user.setPhone(phone);
        user.setPassword(password);
        user.setEmail(email);
        user.setRegistType(registType);
        user.setSex(sex);
        int num = 0;
        //查询注册账号是否已存在
        int i=this.queryLoginId(loginId);
        if(i == 0) {
            //调用保存数据方法
            num = this.saveUserInfo(user);
        }else {
            num =-1;//注册账号已存在
        }
        //创建json对象
        JSONObject json=new JSONObject();
        json.put("code",num);
        if(num > 0){
            //将数据转换成json格式的数据
            json.put("msg","信息注册成功！");
        }else if(num==-1){
            //注册账号已存在
            json.put("msg","注册账号已存在！");
        }else {
            json.put("msg","信息注册失败");
        }
        //将json对象转为String类型
        String ri= JSON.toJSONString(json);
        //把字符串对象写入到响应response
        response.getWriter().write(ri);
    }

    //查询注册账号是否已存在
    public int queryLoginId(String loginId){
        int i=0;//标识账号是否存在，1：账号已存在，0：账号不存在可以注册
        try {
            ConnDb db=new ConnDb();
            //调用连接数据库方法
            Connection conn = db.dataBaseConnection();
            //创建 SQL 命令语句
            String sql="SELECT loginId from tb_sys_user WHERE loginId=?";
            //创建 PreparedStatement 预处理对象pstmt
            PreparedStatement pstmt =conn.prepareStatement(sql);
            //为“?”按照类型一一对应赋值
            pstmt.setString(1,loginId);
            //executeQuery方法执行sql,将会返回一个数据库的结果集存入ResultSet
            ResultSet rs= pstmt.executeQuery();
            while(rs.next()) { //判断数据是否为空
                i=1;//数据不为空则账号已存在，将i的值赋值为1
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return i;
    }

    //保存数据
    public int saveUserInfo(User user){
        int num=0;//表示数据是否保存成功
        try {
            ConnDb db=new ConnDb();
            //调用连接数据库方法
            Connection conn = db.dataBaseConnection();
            System.out.println("=====开始执行插入sql======");
            //创建 SQL 命令语句 保存在tb_sys_user表
            String sql1="INSERT into tb_sys_user(loginId,password)VALUES(?,?)";
            //创建 PreparedStatement 预处理对象pstmt
            PreparedStatement pstmt =conn.prepareStatement(sql1);
            //为“?”按照类型一一对应赋值
            pstmt.setString(1,user.getLoginId());
            pstmt.setString(2,user.getPassword());
            //executeUpdate执行插入或更新，返回插入更新影响的行数存入num中
            num=pstmt.executeUpdate();
            if(num > 0){
                //创建 SQL 命令语句 保存在tb_sys_staff_info表
                String sql2="INSERT into tb_sys_staff_info(loginId,userName,phone,email,registType,sex)VALUES(?,?,?,?,?,?)";
                pstmt =conn.prepareStatement(sql2);
                //为“?”按照类型一一对应赋值
                pstmt.setString(1,user.getLoginId());
                pstmt.setString(2,user.getUserName());
                pstmt.setString(3,user.getPhone());
                pstmt.setString(4,user.getEmail());
                pstmt.setString(5,user.getRegistType());
                pstmt.setString(6,user.getSex());
                //executeUpdate执行插入或更新，返回插入更新影响的行数存入num中
                num=pstmt.executeUpdate();
            }
            conn.close();//关闭数据库资源
        }catch (Exception e){
            e.printStackTrace();
        }
        return num;
    }

    //根据业务需要重写 doGet()方法；实现跳转注册页面
    protected  void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServerException, IOException {
        try {
            //getRequestDispatcher获取请求转发对象
            request.getRequestDispatcher("/WEB-INF/JSP/regist.jsp")
                    .forward(request,response);
        } catch (ServletException e) {
            e.printStackTrace();
        }
    }
}