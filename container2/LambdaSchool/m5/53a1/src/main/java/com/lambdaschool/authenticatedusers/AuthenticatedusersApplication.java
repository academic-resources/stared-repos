package com.lambdaschool.authenticatedusers;

        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;
        import org.springframework.context.ApplicationContext;
        import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
        import org.springframework.web.servlet.DispatcherServlet;

@EnableJpaAuditing
@SpringBootApplication
public class AuthenticatedusersApplication
{
    private static final Logger logger = LoggerFactory.getLogger(AuthenticatedusersApplication.class);

    public static void main(String[] args)
    {
        ApplicationContext ctx = SpringApplication.run(AuthenticatedusersApplication.class, args);

        logger.info("Logging in the main class");
        DispatcherServlet dispatcherServlet = (DispatcherServlet) ctx.getBean("dispatcherServlet");
        dispatcherServlet.setThrowExceptionIfNoHandlerFound(true);
    }
}
