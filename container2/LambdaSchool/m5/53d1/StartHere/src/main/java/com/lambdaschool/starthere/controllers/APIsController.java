package com.lambdaschool.starthere.controllers;

import com.lambdaschool.starthere.logging.Loggable;
import com.lambdaschool.starthere.models.APIOpenLibrary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * This can be removed from the base application. This controller contains
 * examples of how to handle other situations
 * <p>
 * > Reading another API
 * > Uploading a file into a db (in progress)
 * > Uploading a file into a file (in progress)
 * > sending an email from an endpoint (in progress)
 * > sending something via twilio from an endpoint (in progress)
 */

@Loggable
@RestController
@RequestMapping("/otherapis")
public class APIsController {
    private static final Logger logger = LoggerFactory.getLogger(RolesController.class);
    private RestTemplate restTemplate = new RestTemplate();

    // taken from https://openlibrary.org/dev/docs/api/books
    // returns a list of books - you can include multiple ISBNs in a single request
    // This API returns a map instead of the standard list
    //
    // localhost:2019/otherapis/openlibrary/0982477562

    @GetMapping(value = "/openlibrary/{isbn}",
            produces = {"application/json"})
    public ResponseEntity<?> listABookGivenISBN(HttpServletRequest request,
                                                @PathVariable
                                                        String isbn) {
        logger.trace(request.getMethod()
                            .toUpperCase() + " " + request.getRequestURI() + " accessed");

        String requestURL = "https://openlibrary.org/api/books?bibkeys=" + "ISBN:" + isbn + "&format=json";

        ParameterizedTypeReference<Map<String, APIOpenLibrary>> responseType =
                new ParameterizedTypeReference<Map<String, APIOpenLibrary>>() {
                };
        ResponseEntity<Map<String, APIOpenLibrary>> responseEntity = restTemplate.exchange(requestURL,
                                                                                           HttpMethod.GET,
                                                                                           null,
                                                                                           responseType);

        Map<String, APIOpenLibrary> ourBooks = responseEntity.getBody();

        System.out.println(ourBooks);
        return new ResponseEntity<>(ourBooks,
                                    HttpStatus.OK);
    }
}
