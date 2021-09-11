package com.lambdaschool.j52c2.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

// ORDERS (ordnum, ordamount, advanceamount, custcode, orderdescription)

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long ordnum;

    @Column(unique = true,
            nullable = false)
    private double ordamount;

    private double advanceamount;
    private String orderDescription;
    private long custcode;

    @OneToMany(mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonIgnoreProperties("order")
    private List<Customer> customer = new ArrayList<>();

    public Order() {
    }

    public Order(double ordamount, double advanceamount, String orderDescription, long custcode) {
        this.ordamount = ordamount;
        this.advanceamount = advanceamount;
        this.orderDescription = orderDescription;
        this.custcode = custcode;
    }

    public long getOrdnum() {
        return ordnum;
    }

    public void setOrdnum(long ordnum) {
        this.ordnum = ordnum;
    }

    public double getOrdamount() {
        return ordamount;
    }

    public void setOrdamount(double ordamount) {
        this.ordamount = ordamount;
    }

    public double getAdvanceamount() {
        return advanceamount;
    }

    public void setAdvanceamount(double advanceamount) {
        this.advanceamount = advanceamount;
    }

    public String getOrderDescription() {
        return orderDescription;
    }

    public void setOrderDescription(String orderDescription) {
        this.orderDescription = orderDescription;
    }

    public long getCustcode() {
        return custcode;
    }

    public void setCustcode(long custcode) {this.custcode = custcode;}

    public List<Customer> getCustomer() {
        return customer;
    }

    public void setCustomer(List<Customer> customer) {
        this.customer = customer;
    }
}
