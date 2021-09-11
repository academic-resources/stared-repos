package com.lambdaschool.j52c2.services;


import com.lambdaschool.j52c2.models.Customer;

import java.util.List;

// CUSTOMERS (custcode, custname, custcity, workingarea, custcountry, grade,
//            openingamt, receiveamt, paymentamt, outstandingamt, phone, agentcode)
public interface CustomerService {
    List<Customer> findAll();

    Customer findCustomerByCustcode(long custcode);

    Customer findCustomerByCustname(String custname);

    Customer findCustomerByTelephone(String telephone);

    Customer delete(long custcode);

    Customer save(Customer customer);

    Customer update(Customer customer, long custcode);
}
