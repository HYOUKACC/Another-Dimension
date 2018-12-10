package Servlet.imagesURL;

import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import DAO.imgesURL.GetURL;
import com.google.gson.Gson;
 
/**
 * Servlet implementation class TestServlet
 */
@WebServlet("/ImagesServlet")
public class ImagesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		int page=0;
		//
		//以防类型转换出现问题
		try {
			page = Integer.valueOf(request.getParameter("page"));
		}
		catch (Exception e){
			e.printStackTrace();
			return;
		}
//		int page = 1 ; //test
		ArrayList<String> url = new GetURL().getUrl(page);

		String [] array = new String[url.size()];
		for (int i = 0; i < url.size(); i++) {
			array[i] = url.get(i);
		}

		URLJSON urlJson = new URLJSON();

		urlJson.setUrl(array);
		Gson gson = new Gson();
		String str=gson.toJson(urlJson);

		System.out.println("JSON:");
		System.out.println(str);

		response.getWriter().append(str);
	}
 
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
 
}
