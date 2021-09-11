package com.lambdaschool.j51d2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class J51d2Application {

    static CountryList ourCountryList;

    public static void main(String[] args) {
        ourCountryList = new CountryList();
        SpringApplication.run(J51d2Application.class, args);
    }

}
