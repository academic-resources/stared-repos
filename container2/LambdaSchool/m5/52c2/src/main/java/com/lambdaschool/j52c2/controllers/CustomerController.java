package com.lambdaschool.j52c2.controllers;

import com.lambdaschool.j52c2.models.Customer;
import com.lambdaschool.j52c2.services.CustomerService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

// CUSTOMERS (custcode, custname, custcity, workingarea, custcountry, grade,
//            openingamt, receiveamt, paymentamt, outstandingamt, phone, agentcode)
@RestController
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // GET all customers
    // http://localhost:2019/customers/customers
    @GetMapping(value = "/customers/customers",
            produces = {"application/json"})
    public ResponseEntity<?> listAllCustomers(){

        List<Customer> myCustomers = customerService.findAll();
        return new ResponseEntity<>(myCustomers, HttpStatus.OK);
    }

    // GET one customer by Custcode
    // GET /customers/customer/{custcode} - Returns the customer and their orders with the given customer custcode
    // http://localhost:2019/customers/customer/{custcode}
    @GetMapping(value = "/customers/customer/{custcode}",
            produces = {"application/json"})
    public ResponseEntity<?> getCustomerByCustcode(@PathVariable Long custcode) {
        Customer r = customerService.findCustomerByCustcode(custcode);
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

    // GET one customer by name
    // GET /customers/namelike/{likename} - Returns all customers and their orders with a customer name containing the given substring

    // http://localhost:2019/customers/customer/namelike/{likename}
    @GetMapping(value = "/customer/namelike/{likename}",
            produces = {"application/json"})
    public ResponseEntity<?> getCustomerByCustname(@PathVariable String custname) {
        Customer r = customerService.findCustomerByCustname(custname);
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

    // GET one customer by telephone
    // http://localhost:2019/customers/customer/{customerPhone}
    @GetMapping(value = "/customer/phone/{customerPhone}",
            produces = {"application/json"})
    public ResponseEntity<?> getCustomerByTelephone(@PathVariable String customerPhone) {
        Customer r = customerService.findCustomerByTelephone(customerPhone);
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

    // GET /customers/orders - Returns all customers with their orders
    // http://localhost:2019/customers/orders
    @GetMapping(value = "/customers/orders",
            produces = {"application/json"})
    public ResponseEntity<?> listAllCustomersAndOrders(){

        List<Customer> myCustomers = customerService.findAll();
        return new ResponseEntity<>(myCustomers, HttpStatus.OK);
    }


    // DELETE one customer
    // http://localhost:2019/customers/customer/{custcode}
    @DeleteMapping(value = "/customer/{custcode}")
    public ResponseEntity<?> deleteCustomerByCustcode(@PathVariable Long custcode) {
        customerService.delete(custcode);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // PUT one customer
    // http://localhost:2019/customers/customer/{custcode}
    @PutMapping(value = "/customer/{custcode}",
            produces = {"application/json"},
            consumes = {"application/json"})
    public ResponseEntity<?> updateCustomer(@RequestBody Customer updateCustomer,
                                              @PathVariable Long custcode) {
        customerService.update(updateCustomer, custcode);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // POST one customer
    @PostMapping(value = "/customer",
            produces = {"application/json"},
            consumes = {"application/json"})
    public ResponseEntity<?> addNewCustomer(@Valid
                                              @RequestBody Customer newCustomer) throws URISyntaxException{
        newCustomer = customerService.save(newCustomer);

        // set location header for newly created resource
        HttpHeaders responseHeaders = new HttpHeaders();
        URI newCustomerURI = ServletUriComponentsBuilder.fromCurrentRequest().path("/{custcode}")
                .buildAndExpand(newCustomer.getCustcode()).toUri();
        responseHeaders.setLocation(newCustomerURI);

        return new ResponseEntity<>(null, responseHeaders, HttpStatus.CREATED);
    }
}
