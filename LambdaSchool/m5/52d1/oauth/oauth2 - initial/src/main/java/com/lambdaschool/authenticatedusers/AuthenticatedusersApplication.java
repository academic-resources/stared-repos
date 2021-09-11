package com.lambdaschool.authenticatedusers;

        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;
        import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class AuthenticatedusersApplication
{

    public static void main(String[] args)
    {
        SpringApplication.run(AuthenticatedusersApplication.class, args);
    }
}
