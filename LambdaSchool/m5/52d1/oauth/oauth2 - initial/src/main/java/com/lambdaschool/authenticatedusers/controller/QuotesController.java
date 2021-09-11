package com.lambdaschool.authenticatedusers.controller;

import com.lambdaschool.authenticatedusers.model.Quote;
import com.lambdaschool.authenticatedusers.service.QuoteService;
import com.lambdaschool.authenticatedusers.view.CountQuotes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/quotes")
public class QuotesController
{
    @Autowired
    QuoteService quoteService;

    @GetMapping(value = "/quotes",
            produces = {"application/json"})
    public ResponseEntity<?> listAllQuotes()
    {
        List<Quote> allQuotes = quoteService.findAll();
        return new ResponseEntity<>(allQuotes, HttpStatus.OK);
    }


    @GetMapping(value = "/quote/{quoteId}",
            produces = {"application/json"})
    public ResponseEntity<?> getQuote(
            @PathVariable
                    Long quoteId)
    {
        Quote q = quoteService.findQuoteById(quoteId);
        return new ResponseEntity<>(q, HttpStatus.OK);
    }


    @GetMapping(value = "/username/{userName}",
            produces = {"application/json"})
    public ResponseEntity<?> findQuoteByUserName(
            @PathVariable
                    String userName)
    {
        List<Quote> theQuotes = quoteService.findByUserName(userName);
        return new ResponseEntity<>(theQuotes, HttpStatus.OK);
    }


    @GetMapping(value = "/quotescount",
            produces = {"application/json"})
    public ResponseEntity<?> getQuotesCount()
    {
        ArrayList<CountQuotes> myList = quoteService.getCountQuotes();
        myList.sort((q1, q2) -> q1.getUsername().compareToIgnoreCase(q2.getUsername()));
        return new ResponseEntity<>(myList, HttpStatus.OK);
    }


    @PostMapping(value = "/quote")
    public ResponseEntity<?> addNewQuote(@Valid
                                         @RequestBody
                                                 Quote newQuote) throws URISyntaxException
    {
        newQuote = quoteService.save(newQuote);

        // set the location header for the newly created resource
        HttpHeaders responseHeaders = new HttpHeaders();
        URI newQuoteURI = ServletUriComponentsBuilder.fromCurrentRequest().path("/{quoteid}").buildAndExpand(newQuote.getQuotesid()).toUri();
        responseHeaders.setLocation(newQuoteURI);

        return new ResponseEntity<>(null, responseHeaders, HttpStatus.CREATED);
    }

    @PutMapping(value = "/quote/{quoteid}")
    public ResponseEntity<?> updateQuote(
            @RequestBody
                    Quote updateQuote,
            @PathVariable
                    long quoteid)
    {
        quoteService.update(updateQuote, quoteid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/quote/{id}")
    public ResponseEntity<?> deleteQuoteById(
            @PathVariable
                    long id)
    {
        quoteService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}