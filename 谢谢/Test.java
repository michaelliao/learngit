package com;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(asyncSupported = true, urlPatterns = { "/Test" })
public class Test extends HttpServlet {
       
    public Test() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String user =request.getParameter("username");
		String pass = request.getParameter("password");
		System.out.println(user+"====="+pass);
		
		request.getRequestDispatcher("disp.jsp").forward(request,response);
	}
	
	
	public static void main(String[] args) {
		System.out.println("====这是首简单的小情歌，唱着我们的爱河=======");
	}

}
