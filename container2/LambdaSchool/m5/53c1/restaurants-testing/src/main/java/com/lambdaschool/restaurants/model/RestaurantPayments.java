package com.lambdaschool.restaurants.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "restaurantpayments")
public class RestaurantPayments extends Auditable implements Serializable
{

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurantid")
    @JsonIgnoreProperties({"restaurantPayments", "hibernateLazyInitializer"})
    private Restaurant restaurant;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paymentid")
    @JsonIgnoreProperties({"restaurantPayments", "hibernateLazyInitializer"})
    private Payment payment;

    public RestaurantPayments()
    {
    }

    public RestaurantPayments(Restaurant restaurant, Payment payment)
    {
        this.restaurant = restaurant;
        this.payment = payment;
    }

    public Restaurant getRestaurant()
    {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant)
    {
        this.restaurant = restaurant;
    }

    public Payment getPayment()
    {
        return payment;
    }

    public void setPayment(Payment payment)
    {
        this.payment = payment;
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o)
        {
            return true;
        }
        if (!(o instanceof RestaurantPayments))
        {
            return false;
        }
        RestaurantPayments that = (RestaurantPayments) o;
        return Objects.equals(getRestaurant(), that.getRestaurant()) && Objects.equals(getPayment(), that.getPayment());
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(getRestaurant(), getPayment());
    }
}
