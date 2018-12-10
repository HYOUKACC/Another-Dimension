package test;

import domain.Customer;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.NativeQuery;
import utils.HibernateUtil;
import org.junit.Test;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import imgesURL.*;

public class HibernateTest {

    @Test
    public void test0(){
        Session session = HibernateUtil.openSession();
        ImgesURL imges = new ImgesURL();
        int page =2;

        int max = page*6;
        int min = max-5;
        String sql = "select url_ from imagesurl WHERE id_>= " + min + " and id_<= " + max;
        NativeQuery sqlQuery = session.createSQLQuery(sql);

        ArrayList<String> url = new ArrayList<>(sqlQuery.list());

//        transaction.commit();
        session.close();
    }

    @Test
    public void test1(){

        Session session = HibernateUtil.openSession();

        Customer customer = new Customer();
        //insert
        customer.setCust_name("myxq");
        customer.setCust_level("5");

        //4.保存
        session.save(customer);

        //5.释放资源
        //session是线程不安全的，一定要关闭
        session.close();

//       HibernateUtil.sessionFactory.close();
//       sessionFactory一般不关闭，只有当所有程序都不需要连接数据库时才关闭

    }

    @Test
    public void test2(){
        // 查询一条记录
        Session session = HibernateUtil.openSession();
        //select
        Customer customer = session.get(Customer.class,2L);
        System.out.println(customer);
        session.close();
    }

    @Test
    public void test3(){
        Session session = HibernateUtil.openSession();

        //开启事务
        Transaction transaction = session.beginTransaction();


        Customer customer = session.get(Customer.class,1L);
        customer.setCust_name("hk666");
        session.update(customer);

        //提交事务
        transaction.commit();
    }

    @Test
    public void test6(){
        Session session = HibernateUtil.openSession();

        //开启事务
        Transaction transaction = session.beginTransaction();

        //查询所有,HQL
        /*Query query = session.createQuery("from domain.Customer");
        List<Customer> list = query.list();
        for (Customer customer : list) {
            System.out.println(customer);
        }*/

        //查询所有,SQL

        NativeQuery sqlQuery = session.createSQLQuery("select * from customer");
        List<Object[]> list = sqlQuery.list();
        for (Object[] objects : list) {
            System.out.println(Arrays.toString(objects));
        }

        transaction.commit();
        session.close();

    }
}
