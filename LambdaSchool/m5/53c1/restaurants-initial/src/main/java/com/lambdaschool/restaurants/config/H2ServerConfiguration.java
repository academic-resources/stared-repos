package com.lambdaschool.restaurants.config;

import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.SQLException;

@Configuration
// taken from https://techdev.io/en/developer-blog/querying-the-embedded-h2-database-of-a-spring-boot-application
// necessary for using the database tool built into intellij
//
// Path: tcp://localhost:9092
// Database: mem:testdb
// URL: jdbc:h2:tcp://localhost:9092/mem:testdb
// User: sa

public class H2ServerConfiguration
{

    // TCP port for remote connections, default 9092
    @Value("${h2.tcp.port:9092}")
    private String h2TcpPort;

    // Web port, default 8082
    @Value("${h2.web.port:8082}")
    private String h2WebPort;

    /**
     * TCP connection to connect with SQL clients to the embedded h2 database.
     * <p>
     * Connect to "jdbc:h2:tcp://localhost:9092/mem:testdb", username "sa", password empty.
     */
    @Bean
    @ConditionalOnExpression("${h2.tcp.enabled:true}")
    public Server h2TcpServer() throws SQLException
    {
        return Server.createTcpServer("-tcp", "-tcpAllowOthers", "-tcpPort", h2TcpPort).start();
    }

    /**
     * Web console for the embedded h2 database.
     * <p>
     * Go to http://localhost:8082 and connect to the database "jdbc:h2:mem:testdb", username "sa", password empty.
     */
    @Bean
    @ConditionalOnExpression("${h2.web.enabled:true}")
    public Server h2WebServer() throws SQLException
    {
        return Server.createWebServer("-web", "-webAllowOthers", "-webPort", h2WebPort).start();
    }
}

