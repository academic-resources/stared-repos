package com.lambdaschool.restaurants.service;

import com.lambdaschool.restaurants.model.Restaurant;

import java.util.List;

public interface MenuService
{
    List<Restaurant> findRestaurantByMenuDish (String menuDish);
}
