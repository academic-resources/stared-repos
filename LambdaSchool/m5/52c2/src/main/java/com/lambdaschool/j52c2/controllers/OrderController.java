package com.lambdaschool.j52c2.controllers;


import com.lambdaschool.j52c2.models.Order;
import com.lambdaschool.j52c2.services.OrderService;
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

// ORDERS (ordnum, ordamount, advanceamount, custcode, orderdescription)
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    // GET all orders
    // http://localhost:2019/orders/orders
    @GetMapping(value = "/orders/orders",
            produces = {"application/json"})
    public ResponseEntity<?> listAllOrders(){

        List<Order> myOrders = orderService.findAll();
        return new ResponseEntity<>(myOrders, HttpStatus.OK);
    }

    // GET one order by ordnum
    // GET /orders/order/{ordnum} - Returns the order and its customer with the given order number

    // http://localhost:2019/orders/order/{ordnum}
    @GetMapping(value = "/orders/order/{ordnum}",
            produces = {"application/json"})
    public ResponseEntity<?> getOrderById(@PathVariable Long ordnum) {
        Order r = orderService.findOrderById(ordnum);
        return new ResponseEntity<>(r, HttpStatus.OK);
    }


    // GET one order by name
    // http://localhost:2019/orders/order/{ordamount}
    @GetMapping(value = "/order/name/{ordamount}",
            produces = {"application/json"})
    public ResponseEntity<?> getOrderByName(@PathVariable double ordamount) {
        Order r = orderService.findOrderByOrderAmount(ordamount);
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

    // GET /orders/advanceamount - returns all orders with their customers that have an advanceamount greater than 0.
    // http://localhost:2019/orders/advanceamount
    @GetMapping(value = "/orders/advanceamount",
            produces = {"application/json"})
    public ResponseEntity<?> getOrderByAdvanceAmount() {
        Order r = orderService.findOrderByAdvanceAmount();
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

    // DELETE one order
    // http://localhost:2019/orders/order/{ordnum}
    @DeleteMapping(value = "/order/{ordnum}")
    public ResponseEntity<?> deleteOrderById(@PathVariable Long ordnum) {
        orderService.delete(ordnum);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // PUT one order
    // http://localhost:2019/orders/order/{ordnum}
    @PutMapping(value = "/order/{ordnum}",
            produces = {"application/json"},
            consumes = {"application/json"})
    public ResponseEntity<?> updateOrder(@RequestBody Order updateOrder,
                                              @PathVariable Long ordnum) {
        orderService.update(updateOrder, ordnum);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // POST one order
    @PostMapping(value = "/order",
            produces = {"application/json"},
            consumes = {"application/json"})
    public ResponseEntity<?> addNewOrder(@Valid
                                              @RequestBody Order newOrder) throws URISyntaxException{
        newOrder = orderService.save(newOrder);

        // set location header for newly created resource
        HttpHeaders responseHeaders = new HttpHeaders();
        URI newOrderURI = ServletUriComponentsBuilder.fromCurrentRequest().path("/{ordnum}")
                .buildAndExpand(newOrder.getOrdnum()).toUri();
        responseHeaders.setLocation(newOrderURI);

        return new ResponseEntity<>(null, responseHeaders, HttpStatus.CREATED);
    }
}
