package com.lambdaschool.restaurants.repos;

import com.lambdaschool.restaurants.model.Restaurant;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface RestaurantRepository extends PagingAndSortingRepository<Restaurant, Long>
{
    Restaurant findByName(String name);
}
