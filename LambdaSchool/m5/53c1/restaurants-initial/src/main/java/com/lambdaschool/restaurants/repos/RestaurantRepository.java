package com.lambdaschool.restaurants.repos;

import com.lambdaschool.restaurants.model.Restaurant;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RestaurantRepository extends CrudRepository<Restaurant, Long>
{
    Restaurant findByName(String name);

    List<Restaurant> findByNameContainingIgnoreCase(String name);

    List<Restaurant> findByNameContainingIgnoreCaseAndCityContainingIgnoreCase(String likename, String likecity);
}
