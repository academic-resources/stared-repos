package com.lambdaschool.restaurants.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "menu")
public class Menu extends Auditable
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long menuId;

    @Column(nullable = false)
    private String dish;
    private double price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurantid",
                nullable = false)
    @JsonIgnoreProperties({"menu", "hibernateLazyInitializer"})
    private Restaurant restaurant;

    public Menu()
    {
    }

    public Menu(String dish, double price, Restaurant restaurant)
    {
        this.dish = dish;
        this.price = price;
        this.restaurant = restaurant;
    }

    public long getMenuId()
    {
        return menuId;
    }

    public void setMenuId(long menuId)
    {
        this.menuId = menuId;
    }

    public String getDish()
    {
        return dish;
    }

    public void setDish(String dish)
    {
        this.dish = dish;
    }

    public double getPrice()
    {
        return price;
    }

    public void setPrice(double price)
    {
        this.price = price;
    }

    public Restaurant getRestaurant()
    {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant)
    {
        this.restaurant = restaurant;
    }
}