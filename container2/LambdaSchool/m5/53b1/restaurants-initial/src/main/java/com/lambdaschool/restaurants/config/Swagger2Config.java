package com.lambdaschool.restaurants.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.ApiSelectorBuilder;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class Swagger2Config
{
    @Bean
    public ApiSelectorBuilder api()
    {
        return new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false) // Allows only my exception responses
                .ignoredParameterTypes(Pageable.class) // allows only my paging parameter list
                .apiInfo(apiEndPointsInfo())
                .select()
                .apis(RequestHandlerSelectors
                        .basePackage("com.lambdaschool.restaurants"))
                .paths(PathSelectors.any());
                // .paths(PathSelectors.regex("/**"))
    }

    private ApiInfo apiEndPointsInfo()
    {
        return new ApiInfoBuilder().title("Restaurant Example")
                .description("Restaurant Example")
                .contact(new Contact("John Mitchell", "http://www.lambdaschool.com", "john@lambdaschool.com"))
                .license("MIT").licenseUrl("https://github.com/LambdaSchool/java-crudysnacks/blob/master/LICENSE")
                .version("1.0.0").build();
    }
}
