package com.lambdaschool.restaurants.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

// Restaurant is considered the parent entity of all - the Grand Poobah!

@Entity
@Table(name = "restaurant")
public class Restaurant extends Auditable
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long restaurantid;

    @Column(unique = true,
            nullable = false)
    private String name;

    private String address;
    private String city;
    private String state;
    private String telephone;

    @OneToMany(mappedBy = "restaurant",
               cascade = CascadeType.ALL)
    @JsonIgnoreProperties("restaurant")
    private List<RestaurantPayments> restaurantPayments = new ArrayList<>();

    @OneToMany(mappedBy = "restaurant",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    @JsonIgnoreProperties("restaurant")
    private List<Menu> menus = new ArrayList<>();


    public Restaurant()
    {
    }

    public Restaurant(String name, String address, String city, String state, String telephone, List<RestaurantPayments> restaurantPayments)
    {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.telephone = telephone;

        for (RestaurantPayments rp : restaurantPayments)
        {
            rp.setRestaurant(this);
        }
        this.restaurantPayments = restaurantPayments;
    }

    public long getRestaurantid()
    {
        return restaurantid;
    }

    public void setRestaurantid(long restaurantid)
    {
        this.restaurantid = restaurantid;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getAddress()
    {
        return address;
    }

    public void setAddress(String address)
    {
        this.address = address;
    }

    public String getCity()
    {
        return city;
    }

    public void setCity(String city)
    {
        this.city = city;
    }

    public String getState()
    {
        return state;
    }

    public void setState(String state)
    {
        this.state = state;
    }

    public String getTelephone()
    {
        return telephone;
    }

    public void setTelephone(String telephone)
    {
        this.telephone = telephone;
    }

    public List<Menu> getMenus()
    {
        return menus;
    }

    public void setMenus(List<Menu> menus)
    {
        this.menus = menus;
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