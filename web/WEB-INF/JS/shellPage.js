function clickMenu(state) {
    var url = '';
    if (state == 'dlxy') {
        url = 'http://www.gdwlxy.edu.cn/Html/Article/list_1379.html';
    } else if (state == 'swjkxy') {
        url = 'http://www.gdwlxy.edu.cn/Html/Article/list_1246.html';
    }
    var target = '_blank';
    window.open(url, target, null);

}

function clickMenuPage(state) {
    if (state == 1) {
        window.location.href = "/Laipengzhong_war_exploded/HomePageServlet?menuUrl=homePage-list";
    } else if (state == 2) {
        window.location.href = "/Laipengzhong_war_exploded/HomePageServlet?menuUrl=studentInfo-list";
    } else if (state == 3) {
        window.location.href = "/Laipengzhong_war_exploded/HomePageServlet?menuUrl=studentScore-list";
    } else if (state == 4) {
        window.location.href = "/Laipengzhong_war_exploded/HomePageServlet?menuUrl="
    }
}

//实现安全退出
function loginOut() {
    window.location.href="/Laipengzhong_war_exploded/LoginOutServlet";
}