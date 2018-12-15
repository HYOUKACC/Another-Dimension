package DAO.user;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import utils.HibernateUtil;

import java.util.List;

public class GetUser {


    public User getUser(String userName,String pw){
        User u = null ;
        Session session = HibernateUtil.openSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery("from User where userId = " + userName + " and password = " + pw);

        List<User> list = query.list();

        if(list.size()==0) {
            return null;
        }
        for (User user : list) {
            u=user;
        }
        transaction.commit();
        session.close();

//      HibernateUtil.sessionFactory.close();  //test 使用
        return u;
    }
}
