package com.lambdaschool.j52c2.services;

import com.lambdaschool.j52c2.models.Agent;
import com.lambdaschool.j52c2.models.Customer;
import com.lambdaschool.j52c2.models.Order;
import com.lambdaschool.j52c2.repos.OrderRepository;
import com.lambdaschool.j52c2.repos.AgentsRepository;
import com.lambdaschool.j52c2.repos.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

// ORDERS (ordnum, ordamount, advanceamount, custcode, orderdescription)
@Transactional
@Service(value="orderService")
public class OrderServiceImple {
    @Autowired
    private OrderRepository restrepos;
    private CustomerRepository customerrepos;

    @Override
    public List<Order> findAll() {
        List<Order> rtnList = new ArrayList<>();
        restrepos.findAll().iterator().forEachRemaining(rtnList::add);
        return rtnList;
    }

    // GET /orders/order/{ordnum} - Returns the order and its customer with the given order number
    @Override
    public Order findOrderById(long ordnum) {

        return restrepos.findById(ordnum)
                .orElseThrow(()-> new EntityNotFoundException("ID = " + ordnum));
    }


    @Override
    public List<Order> findOrderByAdvanceAmount(double advanceamount) {
        List<Order> positiveAdvanceList = new ArrayList<>();
        restrepos.findAll().iterator().forEachRemaining(currentOrder -> {
            if(currentOrder.advanceamount > 0) positiveAdvanceList.add(currentOrder);
        });
        return positiveAdvanceList;
    }


    public Order findOrderByOrderAmount(double ordamount) {
        Order order = restrepos.findOrderByOrderAmount(ordamount);

        if(order == null){
            throw new EntityNotFoundException("Order not found, ordamount = " + ordamount);
        }
        return order;
    }



    @Override
    public Order delete(long ordnum) {
        if(restrepos.findById(ordnum).isPresent()){
            restrepos.deleteById(ordnum);
        }
        else {
            throw new EntityNotFoundException("ID = " + ordnum);
        }
        return null;
    }

    @Transactional
    @Override
    public Order save(Order order) {
        Order newOrder = new Order();
        newOrder.setOrdamount(order.getOrdamount());
        newOrder.setAdvanceamount(order.getAdvanceamount());
        newOrder.setCustomer(order.getCustomer());
        newOrder.setCustcode(order.getCustcode());
        newOrder.setOrderDescription(order.getOrderDescription());

        // pointers
        // pointer gets set, all data goes away, doesn't bring info with it
        // newOrder.setCustomers(order.getCustomers());

        for(Customer m : order.getCustomers()){
            newOrder.getCustomers().add(newCustomer(m.getCustname(), m.getCustcity(), m.getWorkingarea(), m.getCustcountry(), m.getTelephone(), newOrder));
        }
        return restrepos.save(newOrder);
    }

    @Transactional
    @Override
    public Order update(Order order, long ordnum) {
    // ordamount, advanceamount, custcode, orderdescription
        Order currentOrder =
                restrepos.findById(ordnum)
                        .orElseThrow(()->new EntityNotFoundException(Long.toString(ordnum)));

        if(order.getOrdamount() != null){
            currentOrder.setOrdamount((order.getOrdamount()));
        }
        if(order.getAdvanceamount() != null){
            currentOrder.setAdvanceamount((order.getAdvanceamount()));
        }
        if(order.getCustcode() != null){
            currentOrder.setCustcode((order.getCustcode()));
        }
        if(order.getOrderDescription() != null){
            currentOrder.setOrderDescription((order.getOrderDescription()));
        }
        if(order.getCustomer().size() > 0){
            for(Customer m : order.getCustomer()){
                currentOrder.getCustomer().add(new Customer(m.getCustname(), m.getCustcity(), m.getWorkingarea(), m.getCustcountry(), m.getTelephone(), currentOrder));
            }

        }
        return restrepos.save(currentOrder);
    }

}
