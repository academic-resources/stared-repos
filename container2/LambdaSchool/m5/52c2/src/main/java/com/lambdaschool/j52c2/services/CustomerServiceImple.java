package com.lambdaschool.j52c2.services;

import com.lambdaschool.j52c2.models.Customer;
import com.lambdaschool.j52c2.models.Order;
import com.lambdaschool.j52c2.repos.OrderRepository;
import com.lambdaschool.j52c2.repos.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

// CUSTOMERS (custcode, custname, custcity, workingarea, custcountry, grade,
//            openingamt, receiveamt, paymentamt, outstandingamt, phone, agentcode)
@Transactional
@Service(value="customerService")
public class CustomerServiceImple {
    @Autowired
    private CustomerRepository restrepos;
    private OrderRepository orderrepos;

    @Override
    public List<Customer> findAll() {
        List<Customer> rtnList = new ArrayList<>();
        restrepos.findAll().iterator().forEachRemaining(rtnList::add);
        return rtnList;
    }


    @Override
    public List<Order> findCustomer(double advanceamount) {
        List<Order> positiveAdvanceList = new ArrayList<>();
        restrepos.findAll().iterator().forEachRemaining(currentOrder -> {
            if(currentOrder.advanceamount > 0) positiveAdvanceList.add(currentOrder);
        });
        return positiveAdvanceList;
    }

    @Override
    public Customer findCustomerByCustcode(long custcode) {

        return restrepos.findByCustcode(custcode)
                .orElseThrow(()-> new EntityNotFoundException("Custcode = " + custcode));
    }

    @Override
    public Customer findCustomerByCustname(String custname) {
        Customer customer = restrepos.findByCustname(custname);

        if(customer.containsNone(custname)){
            throw new EntityNotFoundException("Customer not found, custname = " + custname);
        }
        return customer;
    }

    @Override
    public Customer findCustomerByTelephone(String telephone) {
        Customer customer = restrepos.findByTelephone(telephone);

        if(customer == null){
            throw new EntityNotFoundException("Customer not found, telephone = " + telephone);
        }
        return customer;
    }

    @Override
    public Customer delete(long custcode) {
        if(restrepos.findByCustcode(custcode).isPresent()){
            restrepos.deleteByCustcode(custcode);
        }
        else {
            throw new EntityNotFoundException("Custcode = " + custcode);
        }
        return null;
    }

    @Transactional
    @Override
    public Customer save(Customer customer) {
        Customer newCustomer = new Customer();
        newCustomer.setCustname(customer.getCustname());
        newCustomer.setWorkingarea(customer.getWorkingarea());
        newCustomer.setCustcity(customer.getCustcity());
        newCustomer.setCustcountry(customer.getCustcountry());
        newCustomer.setTelephone(customer.getTelephone());

        // pointers
        // pointer gets set, all data goes away, doesn't bring info with it
        // newCustomer.setOrders(customer.getOrders());

        for(Order m : customer.getOrders()){
            newCustomer.getOrders().add(new Order(m.getDish(), m.getPrice(), newCustomer));
        }
        return restrepos.save(newCustomer);
    }

    @Transactional
    @Override
    public Customer update(Customer customer, long custcode) {

        Customer currentCustomer =
                restrepos.findByCustcode(custcode)
                        .orElseThrow(()->new EntityNotFoundException(Long.toString(custcode)));

// CUSTOMERS (custcode, custname, custcity, workingarea, custcountry, grade,
//            openingamt, receiveamt, paymentamt, outstandingamt, phone, agentcode)
        if(customer.getCustname() != null){
            currentCustomer.setCustname((customer.getCustname()));
        }
        if(customer.getWorkingarea() != null){
            currentCustomer.setWorkingarea((customer.getWorkingarea()));
        }
        if(customer.getCustcity() != null){
            currentCustomer.setCustcity((customer.getCustcity()));
        }
        if(customer.getCustcountry() != null){
            currentCustomer.setCustcountry((customer.getCustcountry()));
        }
        if(customer.getTelephone() != null){
            currentCustomer.setTelephone((customer.getTelephone()));
        }

        if(customer.getOrders().size() > 0){
            for(Order m : customer.getOrders()){
                currentCustomer.getOrders().add(new Order(m.getCustcode(), m.getOrdamount(), currentCustomer));
            }

        }
        return restrepos.save(currentCustomer);
    }
}
