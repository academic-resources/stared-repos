package com.lambdaschool.authenticatedusers.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter
{

    private static final String RESOURCE_ID = "resource_id";

    @Override
    public void configure(ResourceServerSecurityConfigurer resources)
    {
        resources.resourceId(RESOURCE_ID)
                .stateless(false);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception
    {

//        http.authorizeRequests()
//                .antMatchers("/",
//                        "/h2-console/**")
//                .permitAll()
//                .antMatchers("/users/**",
//                        "/useremails/**")
//                .authenticated()
//                // restrict application data...
//                // .antMatchers("/books", "/authors").hasAnyRole("ADMIN", "USER", "DATA")
//                // .antMatchers("/data/**").hasAnyRole("ADMIN", "DATA")
//                //
//                // restrict based on HttpMethod and endpoint
//                // .antMatchers(HttpMethod.GET, "/users/user/**").hasAnyRole("USER")
//                .antMatchers("/roles/**")
//                .hasAnyRole("ADMIN")
//                .and()
//                .exceptionHandling()
//                .accessDeniedHandler(new OAuth2AccessDeniedHandler());

        // http.anonymous().disable();
        http.authorizeRequests()
                .antMatchers("/",
                    "/h2-console/**",
                    "/swagger-resources/**",
                    "/swagger-resources/configuration/ui",
                    "/swagger-resources/configuration/security",
                    "/swagger-resource/**",
                    "/swagger-ui.html",
                        "/v2/api-docs",
                        "/webjars/**").permitAll()
                .antMatchers("/users/**", "/quotes/**").authenticated()
                .antMatchers("/roles").hasAnyRole("ADMIN")
                .and().exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());


        http.csrf()
                .disable();
        http.headers()
                .frameOptions()
                .disable();
    }
}