package Main.java.com.action;

import java.sql.Connection;
import java.sql.DriverManager;

public class SQtext {
    public static void main(String[] args) {

        System.out.println("数据库连接测试开始\n");
        SQtext sql = new SQtext();//创建类对象
        sql.mysqlConnection();//调用方法

    }

    public void mysqlConnection() {
        //定义访问的驱动器，驱动器是com.mysql.cj.jdbc.Driver
        String driver = "com.mysql.cj.jdbc.Driver"; //驱动 类名
        //连接地址，&用来分割
        // "jdbc:mysql://主机(localhost本地主机):端口/数据库名 + ? +使用Unicode字符集并且设置字符编码为utf-8(数据库表中添加中文，需要添加): useUnicode=true & characterEncoding=utf8
        // (接上)+ & +解决版本兼容:useSSL=false& 时区:serverTimezone=Asia/Shanghai"
        String url = "jdbc:mysql://localhost:3306/stu_info_manager_th?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai";//完整的数据库地址连接
        String username = "root"; //数据库连接用户名
        String password = "2840302718Lai"; //数据库连接密码

        Connection conn = null;
        try {
            if (conn == null) {
                //加载数据访问驱动代码
                System.out.println("正在加载驱动器");
                Class.forName(driver);
                System.out.println("驱动器加载成功");
                System.out.println("正在连接数据库");
                conn = DriverManager.getConnection(url, username, password);//url是数据库地址
                System.out.println("数据库连接成功\n");
                conn.close();//关闭连接
                System.out.println("数据库连接关闭\n");
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("数据库连接失败");
        }
    }
}
