package Servlet.login;

import DAO.user.GetUser;
import DAO.user.User;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;



public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //接收请求参数
        request.setCharacterEncoding("utf-8");
        response.setHeader("Content-type", "text/html;charset=UTF-8");

        String userId = request.getParameter("userId");
        String passWord = request.getParameter("passWord");
        //判断用户输入是否为空
        if(userId.equals("") || passWord.equals("") ){
            response.getWriter().append("false");
            return;
        }
        GetUser u = new GetUser();
        User user = u.getUser(userId, passWord);
        //判断用户名密码是否正确
        if(user==null){
            //
            String ret="false";
            response.getWriter().append(ret);
            return;
        }
        UserJSON js = new UserJSON();

        js.setUserId(user.getUserId());
        js.setProfilePictureURL(user.getProfilePictureURL());
        js.setNickName(user.getNickName());

        Gson gson = new Gson();
        String str=gson.toJson(js);

        response.getWriter().append(str);
    }

}