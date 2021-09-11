package com.lambdaschool.restaurants.repos;

import com.lambdaschool.restaurants.model.Menu;
import org.springframework.data.repository.CrudRepository;

public interface MenuRepository extends CrudRepository<Menu, Long>
{
}
