package com.lambdaschool.restaurants.service;

import com.lambdaschool.restaurants.model.Restaurant;

import java.util.List;

public interface RestaurantService
{
    List<Restaurant> findAll();

    Restaurant findRestaurantById(long id);

    Restaurant findRestaurantByName(String name);

    void delete(long id);

    Restaurant save(Restaurant restaurant);

    Restaurant update(Restaurant restaurant, long id);

}
