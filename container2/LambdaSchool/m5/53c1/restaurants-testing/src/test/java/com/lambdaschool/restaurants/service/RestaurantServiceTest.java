package com.lambdaschool.restaurants.service;

import com.lambdaschool.restaurants.RestaurantsApplication;
import com.lambdaschool.restaurants.model.Menu;
import com.lambdaschool.restaurants.model.Restaurant;
import com.lambdaschool.restaurants.model.RestaurantPayments;
import org.junit.FixMethodOrder;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = RestaurantsApplication.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
class RestaurantServiceTest {

    // mocks - fake data
    // stubs - code that forces return value;
    //
    // Java - mocks

    @Autowired
    private RestaurantService restaurantService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void AfindAll() {
        assertEquals(3, restaurantService.findAll().size());
    }

    @Test
    void BfindRestaurantById() {
    }

    @Test
    void CfindRestaurantByName() {
        assertEquals("Apple", restaurantService.findRestaurantByName("Apple").getName());
    }
    @Test
    void DfindRestaurantByNameLike() {
    }

    @Test
    void EfindNameCity() {
    }


    @Test
    void Fdelete() {
        restaurantService.delete(10);
        assertEquals(2, restaurantService.findAll().size());
    }


    @Test
    void Gsave() {
        ArrayList<RestaurantPayments> thisPay = new ArrayList<>();
        String rest3Name = "Uno Eats";
        Restaurant r3 = new Restaurant(rest3Name,
                "565 North Side Avenue",
                "Village", "ST", "555-123-1555",
                thisPay);
        r3.getMenus().add(new Menu("Pizza", 15.15, r3));

        Restaurant addRestaurant = restaurantService.save(r3);

        assertNotNull(addRestaurant);

        Restaurant foundRestaurant = restaurantService.findRestaurantById(addRestaurant.getRestaurantid());

        assertEquals(rest3Name, foundRestaurant.getName());
    }

    @Test
    void Hupdate() {
    }


}