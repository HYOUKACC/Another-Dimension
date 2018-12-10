package Servlet.login;

import DAO.login.GetUser;
import DAO.login.User;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/loginServlet")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //接收请求参数
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");

        String userId = request.getParameter("userId");
        String passWord = request.getParameter("passWord");

        GetUser u = new GetUser();
        User user = u.getUser(userId, passWord);
        UserJSON js = new UserJSON();
        js.setUserId(user.getUserId());
        js.setPassword(user.getPassword());
        js.setNickName(user.getNickName());

        Gson gson = new Gson();
        String str=gson.toJson(js);
        System.out.println(str);
        response.getWriter().append(str);
    }

}