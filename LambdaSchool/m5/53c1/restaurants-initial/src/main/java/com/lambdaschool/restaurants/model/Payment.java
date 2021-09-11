package com.lambdaschool.restaurants.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "payment")
public class Payment extends Auditable
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long paymentid;

    @Column(nullable = false,
            unique = true)
    private String type;

    @OneToMany(mappedBy = "payment",
               cascade = CascadeType.ALL)
    @JsonIgnoreProperties("payment")
    private List<RestaurantPayments> restaurantPayments = new ArrayList<>();

    public Payment()
    {
    }

    public Payment(String type)
    {
        this.type = type;
    }

    public long getPaymentid()
    {
        return paymentid;
    }

    public void setPaymentid(long paymentid)
    {
        this.paymentid = paymentid;
    }

    public String getType()
    {
        return type;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    public List<RestaurantPayments> getRestaurantPayments()
    {
        return restaurantPayments;
    }

    public void setRestaurantPayments(List<RestaurantPayments> restaurantPayments)
    {
        this.restaurantPayments = restaurantPayments;
    }
}