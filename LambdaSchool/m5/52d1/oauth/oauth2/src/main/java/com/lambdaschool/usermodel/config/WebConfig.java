package com.lambdaschool.usermodel.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer
{
    /**
     * This still gives the following example WARN
     * <p>
     * [2019-09-30 12:48:44.459] [servlet.DispatcherServlet] [http-nio-2019-exec-8] [1249] [WARN ] No mapping for GET /
     * [2019-09-30 12:48:44.469] [servlet.DispatcherServlet] [http-nio-2019-exec-1] [1249] [WARN ] No mapping for GET /csrf
     * <p>
     * All works though
     */

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry)
    {
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");

        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}
