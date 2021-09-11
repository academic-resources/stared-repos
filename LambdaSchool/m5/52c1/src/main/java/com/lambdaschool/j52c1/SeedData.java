package com.lambdaschool.j52c1;

import com.lambdaschool.j52c1.models.Menu;
import com.lambdaschool.j52c1.models.Restaurant;
import com.lambdaschool.j52c1.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

// @Component
@Transactional
public class SeedData implements CommandLineRunner {

    @Autowired
    RestaurantService restaurantService;

    @Override
    public void run(String... args) throws Exception {
        // Restaurant String name, String address, String city, String state, String telephone
        String rest1Name = "Apple";
        Restaurant r1 = new Restaurant(rest1Name, "123 Main Street", "City", "ST", "555-555-1234");
        r1.getMenus().add(new Menu("Mac and Cheese", 6.95, r1));
        r1.getMenus().add(new Menu("Lasagna", 6.95, r1));
        r1.getMenus().add(new Menu("Meatloaf", 6.95, r1));
        r1.getMenus().add(new Menu("Tacos", 6.95, r1));
        r1.getMenus().add(new Menu("Chef Salad", 6.95, r1));

        restaurantService.save(r1);

        String rest2Name = "Eagle Cafe";
        Restaurant r2 = new Restaurant(rest2Name, "321 Uptown Drive", "Town", "ST", "555-555-5555");
        r2.getMenus().add(new Menu("Mashed Potatoes", 5.95, r2));
        r2.getMenus().add(new Menu("Spaghetti", 11.95, r2));
        r2.getMenus().add(new Menu("Salmon", 8.95, r2));
        r2.getMenus().add(new Menu("Tacos", 10.49, r2));
        r2.getMenus().add(new Menu("Barbacoa", 12.75, r2));

        restaurantService.save(r2);

        String rest3Name = "Number 1 Eats";
        Restaurant r3 = new Restaurant(rest3Name, "565 Side Avenue", "Village", "ST", "555-123-1555");
        r3.getMenus().add(new Menu("Pizza", 14.95, r3));
        r3.getMenus().add(new Menu("Fish and Chips", 8.95, r3));
        r3.getMenus().add(new Menu("Hamburger and Fries", 9.95, r3));
        r3.getMenus().add(new Menu("Pancakes", 8.95, r3));
        r3.getMenus().add(new Menu("Salad", 5.95, r3));

        restaurantService.save(r3);
    }
}
