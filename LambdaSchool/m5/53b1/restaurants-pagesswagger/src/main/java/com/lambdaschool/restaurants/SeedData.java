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

        restaurantrepos.save(r1);

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

        ArrayList<RestaurantPayments> noPay = new ArrayList<>();

        // need to add more restaurants
        String rest01Name = "Number 01 Eats";
        Restaurant r01 = new Restaurant(rest01Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r01.getMenus().add(new Menu("Pizza", 15.15, r01));

        restaurantrepos.save(r01);

        // need to add more restaurants
        String rest02Name = "Number 02 Eats";
        Restaurant r02 = new Restaurant(rest02Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r02.getMenus().add(new Menu("Pizza", 15.15, r02));

        restaurantrepos.save(r02);

        // need to add more restaurants
        String rest03Name = "Number 03 Eats";
        Restaurant r03 = new Restaurant(rest03Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r03.getMenus().add(new Menu("Pizza", 15.15, r03));

        restaurantrepos.save(r03);

        // need to add more restaurants
        String rest04Name = "Number 04 Eats";
        Restaurant r04 = new Restaurant(rest04Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r04.getMenus().add(new Menu("Pizza", 15.15, r04));

        restaurantrepos.save(r04);

        // need to add more restaurants
        String rest05Name = "Number 05 Eats";
        Restaurant r05 = new Restaurant(rest05Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r05.getMenus().add(new Menu("Pizza", 15.15, r05));

        restaurantrepos.save(r05);


        // need to add more restaurants
        String rest06Name = "Number 06 Eats";
        Restaurant r06 = new Restaurant(rest06Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r06.getMenus().add(new Menu("Pizza", 15.15, r06));

        restaurantrepos.save(r06);


        // need to add more restaurants
        String rest07Name = "Number 07 Eats";
        Restaurant r07 = new Restaurant(rest07Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r07.getMenus().add(new Menu("Pizza", 15.15, r07));

        restaurantrepos.save(r07);


        // need to add more restaurants
        String rest08Name = "Number 08 Eats";
        Restaurant r08 = new Restaurant(rest08Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r08.getMenus().add(new Menu("Pizza", 15.15, r08));

        restaurantrepos.save(r08);


        // need to add more restaurants
        String rest09Name = "Number 09 Eats";
        Restaurant r09 = new Restaurant(rest09Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r09.getMenus().add(new Menu("Pizza", 15.15, r09));

        restaurantrepos.save(r09);


        // need to add more restaurants
        String rest10Name = "Number 10 Eats";
        Restaurant r10 = new Restaurant(rest10Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r10.getMenus().add(new Menu("Pizza", 15.15, r10));

        restaurantrepos.save(r10);


        // need to add more restaurants
        String rest11Name = "Number 11 Eats";
        Restaurant r11 = new Restaurant(rest11Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r11.getMenus().add(new Menu("Pizza", 15.15, r11));

        restaurantrepos.save(r11);


        // need to add more restaurants
        String rest12Name = "Number 12 Eats";
        Restaurant r12 = new Restaurant(rest12Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r12.getMenus().add(new Menu("Pizza", 15.15, r12));

        restaurantrepos.save(r12);


        // need to add more restaurants
        String rest13Name = "Number 13 Eats";
        Restaurant r13 = new Restaurant(rest13Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r13.getMenus().add(new Menu("Pizza", 15.15, r13));

        restaurantrepos.save(r13);


        // need to add more restaurants
        String rest14Name = "Number 14 Eats";
        Restaurant r14 = new Restaurant(rest14Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r14.getMenus().add(new Menu("Pizza", 15.15, r14));

        restaurantrepos.save(r14);


        // need to add more restaurants
        String rest15Name = "Number 15 Eats";
        Restaurant r15 = new Restaurant(rest15Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r15.getMenus().add(new Menu("Pizza", 15.15, r15));

        restaurantrepos.save(r15);


        // need to add more restaurants
        String rest16Name = "Number 16 Eats";
        Restaurant r16 = new Restaurant(rest16Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r16.getMenus().add(new Menu("Pizza", 15.15, r16));

        restaurantrepos.save(r16);


        // need to add more restaurants
        String rest17Name = "Number 17 Eats";
        Restaurant r17 = new Restaurant(rest17Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r17.getMenus().add(new Menu("Pizza", 15.15, r17));

        restaurantrepos.save(r17);


        // need to add more restaurants
        String rest18Name = "Number 18 Eats";
        Restaurant r18 = new Restaurant(rest18Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r18.getMenus().add(new Menu("Pizza", 15.15, r18));

        restaurantrepos.save(r18);


        // need to add more restaurants
        String rest19Name = "Number 19 Eats";
        Restaurant r19 = new Restaurant(rest19Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r19.getMenus().add(new Menu("Pizza", 15.15, r19));

        restaurantrepos.save(r19);


        // need to add more restaurants
        String rest20Name = "Number 20 Eats";
        Restaurant r20 = new Restaurant(rest20Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r20.getMenus().add(new Menu("Pizza", 15.15, r20));

        restaurantrepos.save(r20);


        // need to add more restaurants
        String rest21Name = "Number 21 Eats";
        Restaurant r21 = new Restaurant(rest21Name,
                "565 Side Avenue",
                "Village", "ST", "555-123-1555",
                noPay);
        r21.getMenus().add(new Menu("Pizza", 15.15, r21));

        restaurantrepos.save(r21);

    }
}
