package com.lambdaschool.restaurants.repos;

import com.lambdaschool.restaurants.model.Menu;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MenuRepository extends CrudRepository<Menu, Long>
{
    List<Menu> findAllByDish(String dish);
}
