package com.lambdaschool.j52c2.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long custcode;

    @Column(unique = true,
            nullable = false)
    private String custname;
    private String workingarea;
    private String custcity;
    private String custcountry;
    private String telephone;

    // CUSTOMERS (custcode, custname, custcity, workingarea, custcountry, grade,
//            openingamt, receiveamt, paymentamt, outstandingamt, phone, agentcode)
    @OneToMany(mappedBy = "customer",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonIgnoreProperties("customer")

    private List<Order> orders = new ArrayList<>();

    public Customer() {
    }

    public Customer(String custname, String custcity, String workingarea, String custcountry, String telephone) {
        this.custname = custname;
        this.workingarea = workingarea;
        this.custcity = custcity;
        this.custcountry = custcountry;
        this.telephone = telephone;
    }

    public long getCustcode() {
        return custcode;
    }

    public void setCustcode(long custcode) {
        this.custcode = custcode;
    }

    public String getCustname() {
        return custname;
    }

    public void setCustname(String custname) {
        this.custname = custname;
    }

    public String getWorkingarea() {
        return workingarea;
    }

    public void setWorkingarea(String workingarea) {
        this.workingarea = workingarea;
    }

    public String getCustcity() {
        return custcity;
    }

    public void setCustcity(String custcity) {
        this.custcity = custcity;
    }

    public String getCustcountry() {
        return custcountry;
    }

    public void setCustcountry(String custcountry) {
        this.custcountry = custcountry;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
}
