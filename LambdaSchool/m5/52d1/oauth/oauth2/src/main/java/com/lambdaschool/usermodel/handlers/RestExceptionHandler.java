package com.lambdaschool.usermodel.handlers;

import com.lambdaschool.usermodel.exceptions.ResourceFoundException;
import com.lambdaschool.usermodel.exceptions.ResourceNotFoundException;
import com.lambdaschool.usermodel.exceptions.ValidationError;
import com.lambdaschool.usermodel.logging.Loggable;
import com.lambdaschool.usermodel.models.ErrorDetail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.ConversionNotSupportedException;
import org.springframework.beans.TypeMismatchException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.context.request.async.AsyncRequestTimeoutException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Loggable
// bean shared across controller classes
@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler
{
    private static final Logger logger = LoggerFactory.getLogger(RestExceptionHandler.class);

    public RestExceptionHandler()
    {
        super();
    }


    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException rnfe)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.NOT_FOUND.value());
        errorDetail.setTitle("Resource Not Found");
        errorDetail.setDetail(rnfe.getMessage());
        errorDetail.setDeveloperMessage(rnfe.getClass()
                                            .getName());

        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> handleEntityNotFoundException(EntityNotFoundException rnfe)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.NOT_FOUND.value());
        errorDetail.setTitle("Resource Not Found");
        errorDetail.setDetail(rnfe.getMessage());
        errorDetail.setDeveloperMessage(rnfe.getClass()
                                            .getName());

        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ResourceFoundException.class)
    public ResponseEntity<?> handleResourceFoundException(ResourceFoundException rfe)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDetail.setTitle("Unexpected Resource");
        errorDetail.setDetail(rfe.getMessage());
        errorDetail.setDeveloperMessage(rfe.getClass()
                                           .getName());

        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.BAD_REQUEST);
    }


    @Override
    protected ResponseEntity<Object> handleTypeMismatch(TypeMismatchException ex,
                                                        HttpHeaders headers,
                                                        HttpStatus status,
                                                        WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDetail.setTitle("Parameter Type Mismatch");
        errorDetail.setDetail(ex.getMessage());
        errorDetail.setDeveloperMessage(request.getDescription(true));

        return new ResponseEntity<>(errorDetail,
                                    headers,
                                    HttpStatus.NOT_FOUND);
    }


    @Override
    protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex,
                                                                   HttpHeaders headers,
                                                                   HttpStatus status,
                                                                   WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.NOT_FOUND.value());
        errorDetail.setTitle(ex.getRequestURL());
        errorDetail.setDetail(request.getDescription(true));
        errorDetail.setDeveloperMessage("Rest Handler Not Found (check for valid URI)");

        return new ResponseEntity<>(errorDetail,
                                    headers,
                                    HttpStatus.NOT_FOUND);
    }


    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex,
                                                                         HttpHeaders headers,
                                                                         HttpStatus status,
                                                                         WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.NOT_FOUND.value());
        errorDetail.setTitle(ex.getMethod());
        errorDetail.setDetail(request.getDescription(true));
        errorDetail.setDeveloperMessage("HTTP Method Not Valid for Endpoint (check for valid URI and proper HTTP Method)");

        return new ResponseEntity<>(errorDetail,
                                    headers,
                                    HttpStatus.NOT_FOUND);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDetail.setTitle("Validation Errors");
        errorDetail.setDetail("Input validation failed");
        errorDetail.setDeveloperMessage(ex.getClass()
                                          .getName());

        List<FieldError> fieldErrors = ex.getBindingResult()
                                         .getFieldErrors();
        for (FieldError fe : fieldErrors)
        {
            List<ValidationError> validationErrorList = errorDetail.getErrors()
                                                                   .get(fe.getField());
            if (validationErrorList == null)
            {
                validationErrorList = new ArrayList<>();
                errorDetail.getErrors()
                           .put(fe.getField(),
                                validationErrorList);
            }
            ValidationError validationError = new ValidationError();
            validationError.setCode(fe.getCode());
            validationError.setMessage(fe.getDefaultMessage());
            validationErrorList.add(validationError);
        }

        return new ResponseEntity<>(errorDetail,
                                    headers,
                                    HttpStatus.BAD_REQUEST);
    }


    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(status.value());
        errorDetail.setTitle("Message Not Readable");
        errorDetail.setDetail(ex.getMessage());
        errorDetail.setDeveloperMessage(ex.getClass()
                                          .getName());

        return new ResponseEntity<>(errorDetail,
                                    headers,
                                    status);
    }


    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex,
                                                                     HttpHeaders headers,
                                                                     HttpStatus status,
                                                                     WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        StringBuilder builder = new StringBuilder();
        builder.append(ex.getContentType());
        builder.append(" media type is not supported. Supported media types are ");
        ex.getSupportedMediaTypes()
          .forEach(t -> builder.append(t + " "));

        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(status.value());
        errorDetail.setTitle("Method not supported");
        errorDetail.setDetail(builder.toString());
        errorDetail.setDeveloperMessage(ex.getClass()
                                          .getName());

        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.BAD_REQUEST);
    }


    @Override
    protected ResponseEntity<Object> handleMissingPathVariable(MissingPathVariableException ex,
                                                               HttpHeaders headers,
                                                               HttpStatus status,
                                                               WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDetail.setTitle(ex.getVariableName() + " Missing Path Variable");
        errorDetail.setDetail(ex.getMessage());
        errorDetail.setDeveloperMessage(ex.getClass()
                                          .getName());

        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.BAD_REQUEST);
    }


    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex,
                                                             Object body,
                                                             HttpHeaders headers,
                                                             HttpStatus status,
                                                             WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorDetail.setTitle("Internal Server Error");
        errorDetail.setDetail(ex.getMessage());
        errorDetail.setDeveloperMessage(ex.getClass()
                                          .getName());

        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotAcceptable(HttpMediaTypeNotAcceptableException ex,
                                                                      HttpHeaders headers,
                                                                      HttpStatus status,
                                                                      WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDetail.setTitle("Media Type Not Acceptable");
        errorDetail.setDetail(ex.getMessage());
        errorDetail.setDeveloperMessage(ex.getClass()
                                          .getName());

        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex,
                                                                          HttpHeaders headers,
                                                                          HttpStatus status,
                                                                          WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDetail.setTitle("Missing Servlet Request Parameter");
        errorDetail.setDetail(ex.getMessage());
        errorDetail.setDeveloperMessage(ex.getClass()
                                          .getName());

        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleServletRequestBindingException(ServletRequestBindingException ex,
                                                                          HttpHeaders headers,
                                                                          HttpStatus status,
                                                                          WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDetail.setTitle("Servlet Request Binding Exception");
        errorDetail.setDetail(ex.getMessage());
        errorDetail.setDeveloperMessage(ex.getClass()
                                          .getName());

        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleConversionNotSupported(ConversionNotSupportedException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDetail.setTitle("Conversion Not Supported");
        errorDetail.setDetail(ex.getMessage());
        errorDetail.setDeveloperMessage(ex.getClass()
                                          .getName());

        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotWritable(HttpMessageNotWritableException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDetail.setTitle("Message Not Writable");
        errorDetail.setDetail(ex.getMessage());
        errorDetail.setDeveloperMessage(ex.getClass()
                                          .getName());

        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestPart(MissingServletRequestPartException ex,
                                                                     HttpHeaders headers,
                                                                     HttpStatus status,
                                                                     WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDetail.setTitle("Missing Servlet Request");
        errorDetail.setDetail(ex.getMessage());
        errorDetail.setDeveloperMessage(ex.getClass()
                                          .getName());

        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleBindException(BindException ex,
                                                         HttpHeaders headers,
                                                         HttpStatus status,
                                                         WebRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDetail.setTitle("Bind Exception");
        errorDetail.setDetail(ex.getMessage());
        errorDetail.setDeveloperMessage(ex.getClass()
                                          .getName());

        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleAsyncRequestTimeoutException(AsyncRequestTimeoutException ex,
                                                                        HttpHeaders headers,
                                                                        HttpStatus status,
                                                                        WebRequest webRequest)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.REQUEST_TIMEOUT.value());
        errorDetail.setTitle("Async Request Timeout");
        errorDetail.setDetail(ex.getMessage());
        errorDetail.setDeveloperMessage(ex.getClass()
                                          .getName());

        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.REQUEST_TIMEOUT);
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<?> handleAllOtherExceptions(Exception ex,
                                                         HttpServletRequest request)
    {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setTimestamp(new Date().getTime());
        errorDetail.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDetail.setTitle("Exception");
        errorDetail.setDetail(ex.getMessage());
        errorDetail.setDeveloperMessage(ex.getClass()
                                          .getName());

        try
        {
            Throwable cause = ((TransactionSystemException) ex).getRootCause();
            if (cause instanceof ConstraintViolationException)
            {
                ArrayList<ValidationError> myErrorList = new ArrayList<>();
                Iterator<ConstraintViolation<?>> itr = ((ConstraintViolationException) cause).getConstraintViolations()
                                                                                             .iterator();
                while (itr.hasNext())
                {
                    ConstraintViolation itrnext = itr.next();
                    ValidationError myValidationError = new ValidationError();
                    myValidationError.setCode(itrnext.getInvalidValue()
                                                     .toString());
                    myValidationError.setMessage(itrnext.getMessage());
                    myErrorList.add(myValidationError);
                }

                errorDetail.getErrors()
                           .put("Error",
                                myErrorList);
            }
        }
        catch (Exception e)
        {
            // just ignore
        }

        logger.debug("Found an unhandled exception: " + errorDetail);
        return new ResponseEntity<>(errorDetail,
                                    null,
                                    HttpStatus.BAD_REQUEST);
    }
}
