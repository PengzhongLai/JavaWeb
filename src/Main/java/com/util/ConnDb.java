package Main.java.com.util;

//使用db.properties文件配置数据库连接属性，并实现对mysql数据库的连接


import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class ConnDb {
    private String DRIVER_CLASS; //驱动 类名
    private String DB_URL;
    private String DB_USER; //用户名
    private String DB_PASSWORD; //密码

    public Connection dataBaseConnection() {
        Connection conn = null;

        try {
            //创建Properties类对象
            Properties properties = new Properties();
            //读取db.properties属性文件到输入流中
            InputStream is = ConnDb.class.getClassLoader().getResourceAsStream("db.properties");
            // 加载属性文件
            properties.load(is);
            //测试
            //获取 db.properties文件中的属性值
            DRIVER_CLASS = properties.getProperty("DRIVER_CLASS");
            DB_URL = properties.getProperty("DB_URL");
            DB_USER = properties.getProperty("DB_USER");
            DB_PASSWORD = properties.getProperty("DB_PASSWORD");

            Class.forName(DRIVER_CLASS); //第一步 加载数据库驱动
            conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);//第二步 创建数据库连接
            System.out.println("数据库连接成功");

        } catch (Exception e) {
            e.printStackTrace(); //将错误信息全部打印在控制台
            System.out.println("数据库连接失败");
        }
        return conn;
    }

    public static void main(String[] args) {
        ConnDb db = new ConnDb();
        db.dataBaseConnection();
    }

}


