package Main.java.com.util;

import java.util.Properties;
import java.io.InputStream;

public class PropertiesRead {
    public static void main(String[] args){
        try {
//            创建Properties类对象
            Properties properties=new Properties();
//            读取db.proprties属性文件到输入流中
            InputStream is=PropertiesRead.class.
                    getClassLoader().getResourceAsStream("db.properties");
//            读取到的输入流加载到properties对象中
            properties.load(is);
//            测试
//            获取 db.properties文件中的属性值
            String dbUser=properties.getProperty("DRIVER_CLASS");
            String dbPassword=properties.getProperty("DB_PASSWORD");
            System.out.println("用户名："+dbUser);
            System.out.println("密码："+dbPassword);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}