package com.lambdaschool.j52c1.services;

import com.lambdaschool.j52c1.models.Menu;
import com.lambdaschool.j52c1.models.Restaurant;
import com.lambdaschool.j52c1.repos.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service(value="restaurantService")
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantRepository restrepos;

    @Override
    public List<Restaurant> findAll() {
        List<Restaurant> rtnList = new ArrayList<>();
        restrepos.findAll().iterator().forEachRemaining(rtnList::add);
        return rtnList;
    }

    @Override
    public Restaurant findRestaurantById(long id) {

        return restrepos.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("ID = " + id));
    }

    @Override
    public Restaurant findRestaurantByName(String name) {
        Restaurant restaurant = restrepos.findByName(name);

        if(restaurant == null){
            throw new EntityNotFoundException("Restaurant not found, name = " + name);
        }
        return restaurant;
    }

    @Override
    public Restaurant findRestaurantByTelephone(String telephone) {
        Restaurant restaurant = restrepos.findByTelephone(telephone);

        if(restaurant == null){
            throw new EntityNotFoundException("Restaurant not found, telephone = " + telephone);
        }
        return restaurant;
    }

    @Override
    public Restaurant delete(long id) {
        if(restrepos.findById(id).isPresent()){
            restrepos.deleteById(id);
        }
        else {
            throw new EntityNotFoundException("ID = " + id);
        }
        return null;
    }

    @Transactional
    @Override
    public Restaurant save(Restaurant restaurant) {
        Restaurant newRestaurant = new Restaurant();
        newRestaurant.setName(restaurant.getName());
        newRestaurant.setAddress(restaurant.getAddress());
        newRestaurant.setCity(restaurant.getCity());
        newRestaurant.setState(restaurant.getState());
        newRestaurant.setTelephone(restaurant.getTelephone());

        // pointers
        // pointer gets set, all data goes away, doesn't bring info with it
        // newRestaurant.setMenus(restaurant.getMenus());

        for(Menu m : restaurant.getMenus()){
            newRestaurant.getMenus().add(new Menu(m.getDish(), m.getPrice(), newRestaurant));
        }
        return restrepos.save(newRestaurant);
    }

    @Transactional
    @Override
    public Restaurant update(Restaurant restaurant, long id) {

        Restaurant currentRestaurant =
                restrepos.findById(id)
                         .orElseThrow(()->new EntityNotFoundException(Long.toString(id)));

        if(restaurant.getName() != null){
            currentRestaurant.setName((restaurant.getName()));
        }
        if(restaurant.getAddress() != null){
            currentRestaurant.setAddress((restaurant.getAddress()));
        }
        if(restaurant.getCity() != null){
            currentRestaurant.setCity((restaurant.getCity()));
        }
        if(restaurant.getState() != null){
            currentRestaurant.setState((restaurant.getState()));
        }
        if(restaurant.getTelephone() != null){
            currentRestaurant.setTelephone((restaurant.getTelephone()));
        }
        if(restaurant.getMenus().size() > 0){
            for(Menu m : restaurant.getMenus()){
                currentRestaurant.getMenus().add(new Menu(m.getDish(), m.getPrice(), currentRestaurant));
            }

        }
        return restrepos.save(currentRestaurant);
    }
}
