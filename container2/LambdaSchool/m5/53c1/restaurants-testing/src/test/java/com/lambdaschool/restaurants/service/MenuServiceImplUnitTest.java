package com.lambdaschool.restaurants.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.lambdaschool.restaurants.RestaurantsApplication;
import com.lambdaschool.restaurants.model.Restaurant;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = RestaurantsApplication.class)
public class MenuServiceImplUnitTest
{
    @Autowired
    private MenuService menuService;

    @Autowired
    private ObjectMapper mapper;

    @Before
    public void setUp() throws Exception
    {
        MockitoAnnotations.initMocks(this);
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
    }

    @After
    public void tearDown() throws Exception
    {
    }

    @Transactional
    @Test
    public void findRestaurantByMenuDish() throws Exception
    {
        List<Restaurant> restaurantList =  menuService.findRestaurantByMenuDish("Tacos");

        assertEquals(2, restaurantList.size());

        for (Restaurant r : restaurantList)
        {
            // System.out.println(r);
            System.out.println(mapper.writeValueAsString(r));
        }
    }
}