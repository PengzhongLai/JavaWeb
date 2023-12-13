package Main.java.com.domain;

public class User {
    //账号
    private String loginId;
    //用户名
    private  String userName;
    //手机号
    private  String phone;
    //密码
    private String password;
    //邮箱
    private String email;
    //注册类型
    private String registType;
    //性别
    private String sex;

    //更新时间
    private String updateTime;

    public String getUpdateTime(){
        return updateTime;
    }
    public void setUpdateTime(String updateTime){
        this.updateTime=updateTime;
    }

    public String getLoginId() {
        return loginId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRegistType() {
        return registType;
    }

    public void setRegistType(String registType) {
        this.registType = registType;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
