package com.lambdaschool.restaurants.service;

import com.lambdaschool.restaurants.model.Restaurant;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RestaurantService
{
    List<Restaurant> findAll(Pageable pageable);

    Restaurant findRestaurantById(long id);

    Restaurant findRestaurantByName(String name);

    List<Restaurant> findRestaurantByNameLike (String name, Pageable pageable);

    void delete(long id);

    Restaurant save(Restaurant restaurant);

    Restaurant update(Restaurant restaurant, long id);
}
