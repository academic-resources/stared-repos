package com.lambdaschool.usermodel.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig
{
    private static final Logger logger = LoggerFactory.getLogger(DataSourceConfig.class);
    private static boolean stop = false;

    @Autowired
    private ApplicationContext appContext;
    @Autowired
    private Environment env;

    private static void checkEnvironmentVariable(String envvar)
    {
        if (System.getenv(envvar) == null)
        {
            logger.error("Environment Variable " + envvar + " missing");
            stop = true;
        }
    }

    @Bean(name = "dsCustom")
    public DataSource dataSource()
    {
        String myUrlString = "";
        String myDriverClass = "";
        String myDBUser = "";
        String myDBPassword = "";

        String dbValue = env.getProperty("local.run.db");

        if (dbValue.equalsIgnoreCase("POSTGRESQL"))
        {
            checkEnvironmentVariable("MYDBHOST");
            checkEnvironmentVariable("MYDBNAME");
            checkEnvironmentVariable("MYDBUSER");
            checkEnvironmentVariable("MYDBPASSWORD");

            if (stop)
            {
                logger.info("Manually shutting down system");
                int exitCode = SpringApplication.exit(appContext,
                                                      (ExitCodeGenerator) () -> 1);
                System.exit(exitCode);
            }

            myUrlString = "jdbc:postgresql://" + System.getenv("MYDBHOST") + ":5432/" + System.getenv("MYDBNAME");
            myDriverClass = "org.postgresql.Driver";
            myDBUser = System.getenv("MYDBUSER");
            myDBPassword = System.getenv("MYDBPASSWORD");
        } else
        {
            // Assumes H2
            myUrlString = "jdbc:h2:mem:testdb";
            myDriverClass = "org.h2.Driver";
            myDBUser = "sa";
            myDBPassword = "";
        }

        logger.info("Database URL is " + myUrlString);
        return DataSourceBuilder.create()
                                .username(myDBUser)
                                .password(myDBPassword)
                                .url(myUrlString)
                                .driverClassName(myDriverClass)
                                .build();
    }

    @Bean(name = "jdbcCustom")

    @Autowired
    public JdbcTemplate jdbcTemplate(
            @Qualifier("dsCustom")
                    DataSource dsCustom)
    {
        return new JdbcTemplate(dsCustom);
    }
}
