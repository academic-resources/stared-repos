package com.lambdaschool.restaurants.service;

import com.lambdaschool.restaurants.model.Menu;
import com.lambdaschool.restaurants.model.Restaurant;
import com.lambdaschool.restaurants.repos.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service(value = "menuService")
public class MenuServiceImpl implements MenuService
{
    @Autowired
    private MenuRepository menurepos;

    @Override
    public List<Restaurant> findRestaurantByMenuDish(String menuDish)
    {
        List<Restaurant> restaurantList = new ArrayList<>();
        List<Menu> menuList = menurepos.findAllByDish(menuDish);
        for (Menu m : menuList)
        {
            restaurantList.add(m.getRestaurant());
        }

        return restaurantList;
    }
}