package utils;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {

    //SessionFacory是线程不安全的
    public static final SessionFactory sessionFactory;

    static {
        //加载配置文件
        Configuration configure = new Configuration().configure();//默认调用"hibernate.cfg.xml"
        //2.创建sessionFactory --JDBC连接池
        sessionFactory = configure.buildSessionFactory();
    }

    public static Session openSession(){
        // Session是线程不安全的
        Session session = sessionFactory.openSession();
        return session;

    }


}
