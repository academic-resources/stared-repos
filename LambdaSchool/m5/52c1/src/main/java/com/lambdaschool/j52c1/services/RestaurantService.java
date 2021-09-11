package com.lambdaschool.j52c1.services;

// contract between controller and service

import com.lambdaschool.j52c1.models.Restaurant;

import java.util.List;

public interface RestaurantService {
    List<Restaurant> findAll();

    Restaurant findRestaurantById(long id);

    Restaurant findRestaurantByName(String name);

    Restaurant findRestaurantByTelephone(String telephone);

    Restaurant delete(long id);

    Restaurant save(Restaurant restaurant);

    Restaurant update(Restaurant restaurant, long id);
}
