package com.lambdaschool.j52c1.repos;

import com.lambdaschool.j52c1.models.Restaurant;
import org.springframework.data.repository.CrudRepository;

public interface RestaurantRepository extends CrudRepository<Restaurant, Long> {
    Restaurant findByName(String name);
    Restaurant findByTelephone(String telephone);
}
