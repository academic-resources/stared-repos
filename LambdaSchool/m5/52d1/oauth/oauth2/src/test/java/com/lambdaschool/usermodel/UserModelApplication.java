package com.lambdaschool.usermodel;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
// @EnableJpaAuditing
@SpringBootApplication
public class UserModelApplication
{
    private static final Logger logger = LoggerFactory.getLogger(com.lambdaschool.usermodel.UserModelApplication.class);


    public static void main(String[] args)
    {
        ApplicationContext ctx = SpringApplication.run(com.lambdaschool.usermodel.UserModelApplication.class,
                                                       args);

        DispatcherServlet dispatcherServlet = (DispatcherServlet) ctx.getBean("dispatcherServlet");
        dispatcherServlet.setThrowExceptionIfNoHandlerFound(true);
    }

}
