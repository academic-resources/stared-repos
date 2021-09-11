package com.lambdaschool.restaurants;

import com.lambdaschool.restaurants.model.Menu;
import com.lambdaschool.restaurants.model.Payment;
import com.lambdaschool.restaurants.model.Restaurant;
import com.lambdaschool.restaurants.model.RestaurantPayments;
import com.lambdaschool.restaurants.repos.PaymentRepository;
import com.lambdaschool.restaurants.repos.RestaurantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Transactional
@Component
public class SeedData implements CommandLineRunner
{
    private PaymentRepository payrepos;
    private RestaurantRepository restaurantrepos;

    public SeedData(PaymentRepository payrepos, RestaurantRepository restaurantrepos)
    {
        this.payrepos = payrepos;
        this.restaurantrepos = restaurantrepos;
    }

    @Override
    public void run(String[] args) throws Exception
    {
        Payment payType1 = new Payment("Credit Card");
        Payment payType2 = new Payment("Cash");
        Payment payType3 = new Payment ("Mobile Pay");

        ArrayList<RestaurantPayments> allPay = new ArrayList<>();
        allPay.add(new RestaurantPayments(new Restaurant(), payType1));
        allPay.add(new RestaurantPayments(new Restaurant(), payType2));
        allPay.add(new RestaurantPayments(new Restaurant(), payType3));

        ArrayList<RestaurantPayments> cashPay = new ArrayList<>();
        cashPay.add(new RestaurantPayments(new Restaurant(), payType2));

        ArrayList<RestaurantPayments> noCashPay = new ArrayList<>();
        noCashPay.add(new RestaurantPayments(new Restaurant(), payType1));
        noCashPay.add(new RestaurantPayments(new Restaurant(), payType3));

        payrepos.save(payType1);
        payrepos.save(payType2);
        payrepos.save(payType3);

        // Restaurant String name, String address, String city, String state, String telephone
        String rest1Name = "Apple";
        Restaurant r1 = new Restaurant(rest1Name,
                "123 Main Street",
                "City", "ST", "555-555-1234",
                allPay);
        r1.getMenus().add(new Menu("Mac and Cheese", 6.95, r1));
        r1.getMenus().add(new Menu("Lasagna", 8.50, r1));
        r1.getMenus().add(new Menu("Meatloaf", 7.77, r1));
        r1.getMenus().add(new Menu("Tacos", 8.49, r1));
        r1.getMenus().add(new Menu("Chef Salad", 12.50, r1));

        String rest2Name = "Eagle Cafe";
        Restaurant r2 = new Restaurant(rest2Name,
                "321 Uptown Drive",
                "Town", "ST", "555-555-5555",
                cashPay);
        r2.getMenus().add(new Menu("Tacos", 10.49, r2));
        r2.getMenus().add(new Menu("Barbacoa", 12.75, r2));

        restaurantrepos.save(r2);

        String rest3Name = "Number 1 Eats";
        Restaurant r3 = new Restaurant(rest3Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noCashPay);
        r3.getMenus().add(new Menu("Pizza", 15.15, r3));

        restaurantrepos.save(r3);
    }
}
