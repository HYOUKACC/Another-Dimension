package DAO.login;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.NativeQuery;
import org.hibernate.query.Query;
import org.junit.Test;
import utils.HibernateUtil;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Queue;

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
        return u;
    }
}
