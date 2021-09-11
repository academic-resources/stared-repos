package com.lambdaschool.oauth2;

import com.lambdaschool.oauth2.logging.Loggable;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Loggable
@EnableWebMvc
@EnableJpaAuditing
@SpringBootApplication
public class Oauth2Application
{

    public static void main(String[] args)
    {
        ApplicationContext ctx = SpringApplication.run(Oauth2Application.class,
                                                 args);
        DispatcherServlet dispatcherServlet = (DispatcherServlet) ctx.getBean("dispatcherServlet");
        dispatcherServlet.setThrowExceptionIfNoHandlerFound(true);
    }
}
