package com.lambdaschool.j52c2.repos;

import com.lambdaschool.j52c2.models.Customer;
import org.springframework.data.repository.CrudRepository;

// CUSTOMERS (custcode, custname, custcity, workingarea, custcountry, grade,
//            openingamt, receiveamt, paymentamt, outstandingamt, phone, agentcode)
public interface CustomerRepository extends CrudRepository<Customer, Long> {
}