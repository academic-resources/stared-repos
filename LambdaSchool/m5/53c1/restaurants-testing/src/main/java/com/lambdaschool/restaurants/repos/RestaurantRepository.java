package com.lambdaschool.restaurants.repos;

import com.lambdaschool.restaurants.model.Restaurant;
import org.springframework.data.repository.CrudRepository;

public interface RestaurantRepository extends CrudRepository<Restaurant, Long>
{
    Restaurant findByName(String name);
}
