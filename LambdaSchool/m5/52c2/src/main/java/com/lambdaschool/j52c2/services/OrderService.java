package com.lambdaschool.j52c2.services;

import com.lambdaschool.j52c2.models.Order;

import java.util.List;

// ORDERS (ordnum, ordamount, advanceamount, custcode, orderdescription)
public interface OrderService {
    List<Order> findAll();

    Order findOrderById(long ordnum);

    Order findOrderByAdvanceAmount();

    Order findOrderByOrderAmount(double ordamount);

    Order delete(long ordnum);

    Order save(Order order);

    Order update(Order order, long ordnum);
}
