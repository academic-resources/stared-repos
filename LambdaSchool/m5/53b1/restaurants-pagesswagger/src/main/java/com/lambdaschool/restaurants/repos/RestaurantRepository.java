package com.lambdaschool.restaurants.repos;

import com.lambdaschool.restaurants.model.Restaurant;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface RestaurantRepository extends PagingAndSortingRepository<Restaurant, Long>
{
    Restaurant findByName(String name);

    List<Restaurant> findByNameContainingIgnoreCase (String name, Pageable pageable);
}
