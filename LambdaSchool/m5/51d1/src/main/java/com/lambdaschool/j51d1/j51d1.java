package com.lambdaschool.j51d1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class j51d1 {

	static EmpList ourEmpList;

	public static void main(String[] args) {

		ourEmpList = new EmpList();
		SpringApplication.run(j51d1.class, args);
	}

}
