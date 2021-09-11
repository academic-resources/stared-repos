package com.lambdaschool.usermodel.config;

import com.fasterxml.classmate.TypeResolver;
import com.lambdaschool.usermodel.models.UserLogin;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import springfox.documentation.builders.OperationBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiDescription;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.ApiListingScannerPlugin;
import springfox.documentation.spi.service.contexts.DocumentationContext;
import springfox.documentation.spring.web.readers.operation.CachingOperationNameGenerator;
import springfox.documentation.swagger.common.SwaggerPluginSupport;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Component
@Order(SwaggerPluginSupport.SWAGGER_PLUGIN_ORDER)
public class SwaggerManualApiPlugin implements ApiListingScannerPlugin
{
    private final CachingOperationNameGenerator operationNames;

    public SwaggerManualApiPlugin(CachingOperationNameGenerator operationNames)
    {
        this.operationNames = operationNames;
    }

    @Override
    public boolean supports(DocumentationType documentationType)
    {
        return DocumentationType.SWAGGER_2.equals(documentationType);
    }

    @Override
    public List<ApiDescription> apply(DocumentationContext documentationContext)
    {
        return new ArrayList<>(Arrays.asList(new ApiDescription(null,
                                                                "/login",
                                                                "login",
                                                                Arrays.asList(new OperationBuilder(operationNames).authorizations(new ArrayList<>())
                                                                                                                  .summary("login")
                                                                                                                  .codegenMethodNameStem("userLogin")
                                                                                                                  .method(HttpMethod.POST)
                                                                                                                  .notes("This is the login endpoint to request an authentication token")
                                                                                                                  .responseMessages(responseMessages())
                                                                                                                  .parameters(Arrays.asList(new ParameterBuilder().description("Login Parameter")
                                                                                                                                                                  .type(new TypeResolver().resolve(UserLogin.class))
                                                                                                                                                                  .name("userLogin")
                                                                                                                                                                  .parameterType("body")
                                                                                                                                                                  .parameterAccess("access")
                                                                                                                                                                  .required(true)
                                                                                                                                                                  .modelRef(new ModelRef("UserLogin"))
                                                                                                                                                                  .build()))
                                                                                                                  .build()),
                                                                false)));

    }

    private Set<ResponseMessage> responseMessages()
    {
        return Set.of(new ResponseMessageBuilder().code(200)
                                                  .message("OK")
                                                  .responseModel(new ModelRef("TokenModel"))
                                                  .build());
    }
}