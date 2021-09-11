package com.lambdaschool.usermodel.logging;

import org.springframework.boot.logging.LogLevel;
import org.springframework.stereotype.Component;

import java.lang.annotation.*;

/**
 * Created by satyendra on 11/7/16.
 * http://www.tothenew.com/blog/logging-with-spring-aop-and-custom-annotations-in-java-application/
 */
@Component
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface Loggable
{
    LogLevel value() default LogLevel.DEBUG;

    boolean params() default true;

    boolean result() default true;
}