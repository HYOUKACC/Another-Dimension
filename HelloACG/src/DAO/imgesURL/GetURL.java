package DAO.imgesURL;

import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import utils.HibernateUtil;

import java.util.ArrayList;

public class GetURL {


    public ArrayList<String> getUrl(int page){
        Session session = HibernateUtil.openSession();

        int max = page*6;
        int min = max-5;
        String sql = "select url_ from imagesurl WHERE id_>= " + min + " and id_<= " + max;
        NativeQuery sqlQuery = session.createSQLQuery(sql);

        ArrayList<String> url = new ArrayList<>(sqlQuery.list());

//        System.out.println(url); //test
        session.close();
        return url;
    }
}
