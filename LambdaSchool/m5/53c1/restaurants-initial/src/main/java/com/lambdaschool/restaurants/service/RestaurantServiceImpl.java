package com.lambdaschool.restaurants.service;

import com.lambdaschool.restaurants.model.Menu;
import com.lambdaschool.restaurants.model.Restaurant;
import com.lambdaschool.restaurants.model.RestaurantPayments;
import com.lambdaschool.restaurants.repos.PaymentRepository;
import com.lambdaschool.restaurants.repos.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service(value = "restaurantService")
public class RestaurantServiceImpl implements RestaurantService
{
    @Autowired
    private RestaurantRepository restrepos;

    @Autowired
    private PaymentRepository payrepos;


    @Override
    public List<Restaurant> findRestaurantByNameLike(String name)
    {
        List<Restaurant> list = restrepos.findByNameContainingIgnoreCase(name);
        return list;
    }

    @Override
    public List<Restaurant> findNameCity(String name, String city)
    {
        List<Restaurant> list = restrepos.findByNameContainingIgnoreCaseAndCityContainingIgnoreCase(name, city);
        return list;
    }

    @Override
    public List<Restaurant> findAll()
    {
        List<Restaurant> list = new ArrayList<>();
        restrepos.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public Restaurant findRestaurantById(long id) throws EntityNotFoundException
    {
        return restrepos.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Long.toString(id)));
    }

    @Override
    public Restaurant findRestaurantByName(String name) throws EntityNotFoundException
    {
        Restaurant restaurant = restrepos.findByName(name);

        if (restaurant == null)
        {
            throw new EntityNotFoundException("Restaurant " + name + " not found!");
        }

        return restaurant;
    }

    @Override
    public void delete(long id)
    {
        if (restrepos.findById(id).isPresent())
        {
            restrepos.deleteById(id);
        }
        else
        {
            throw new EntityNotFoundException(Long.toString(id));
        }
    }

    @Transactional
    @Override
    public Restaurant save(Restaurant restaurant)
    {
        Restaurant newRestaurant = new Restaurant();

        newRestaurant.setName(restaurant.getName());
        newRestaurant.setAddress(restaurant.getAddress());
        newRestaurant.setCity(restaurant.getCity());
        newRestaurant.setState(restaurant.getState());
        newRestaurant.setTelephone(restaurant.getTelephone());

        ArrayList<RestaurantPayments> newPayments = new ArrayList<>();
        for (RestaurantPayments rp : restaurant.getRestaurantPayments())
        {
            newPayments.add(new RestaurantPayments(newRestaurant, rp.getPayment()));
        }
        newRestaurant.setRestaurantPayments(newPayments);

        for (Menu m : restaurant.getMenus())
        {
            newRestaurant.getMenus().add(new Menu(m.getDish(), m.getPrice(), newRestaurant));
        }

        return restrepos.save(newRestaurant);
    }

    @Transactional
    @Override
    public Restaurant update(Restaurant restaurant, long id)
    {
        Restaurant currentRestaurant = restrepos.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Long.toString(id)));

        if (restaurant.getName() != null)
        {
            currentRestaurant.setName(restaurant.getName());
        }

        if (restaurant.getAddress() != null)
        {
            currentRestaurant.setAddress(restaurant.getAddress());
        }

        if (restaurant.getCity() != null)
        {
            currentRestaurant.setCity(restaurant.getCity());
        }

        if (restaurant.getState() != null)
        {
            currentRestaurant.setState(restaurant.getState());
        }

        if (restaurant.getTelephone() != null)
        {
            currentRestaurant.setTelephone(restaurant.getTelephone());
        }

        if (restaurant.getRestaurantPayments().size() > 0)
        {
            payrepos.deleteRestaurantPaymentsbyRestaurantId(currentRestaurant.getRestaurantid());

            for (RestaurantPayments rp : restaurant.getRestaurantPayments())
            {
                payrepos.insertIntoRestaurantPayments(currentRestaurant.getRestaurantid(), rp.getPayment().getPaymentid(), "SYSTEM");
            }
        }

        if (restaurant.getMenus().size() > 0)
        {
            for (Menu m : restaurant.getMenus())
            {
                currentRestaurant.getMenus().add(new Menu(m.getDish(), m.getPrice(), currentRestaurant));
            }
        }

        return restrepos.save(currentRestaurant);
    }
}
