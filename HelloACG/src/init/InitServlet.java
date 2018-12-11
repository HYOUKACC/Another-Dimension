package init;

import utils.HibernateUtil;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.midi.Soundbank;
import java.io.IOException;

//服务器启动时就加载这个Servlet

@WebServlet(name = "InitServlet",urlPatterns = "/InitServlet",loadOnStartup = 1)
public class InitServlet extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        System.out.println("服务器启动时，获得SessionFactory，加快第一次连接数据库的速度");
        new HibernateUtil();
    }

    @Override
    public void destroy() {
        super.destroy();
        HibernateUtil.sessionFactory.close();
        System.out.println("服务器关闭时，释放sessionFactory");
    }
}
