package com.lambdaschool.j52c1.controllers;

import com.lambdaschool.j52c1.models.Restaurant;
import com.lambdaschool.j52c1.services.RestaurantService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    // GET all restaurants
    // http://localhost:2019/restaurants/restaurants
    @GetMapping(value = "/restaurants/restaurants",
                produces = {"application/json"})
    public ResponseEntity<?> listAllRestaurants(){

        List<Restaurant> myRestaurants = restaurantService.findAll();
        return new ResponseEntity<>(myRestaurants, HttpStatus.OK);
    }

    // GET one restaurant by id
    // http://localhost:2019/restaurants/restaurant/{restaurantid}
    @GetMapping(value = "/restaurant/{restaurantId}",
            produces = {"application/json"})
    public ResponseEntity<?> getRestaurantById(@PathVariable Long restaurantId) {
        Restaurant r = restaurantService.findRestaurantById(restaurantId);
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

    // GET one restaurant by name
    // http://localhost:2019/restaurants/restaurant/{restaurantName}
    @GetMapping(value = "/restaurant/name/{restaurantName}",
            produces = {"application/json"})
    public ResponseEntity<?> getRestaurantByName(@PathVariable String restaurantName) {
        Restaurant r = restaurantService.findRestaurantByName(restaurantName);
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

    // GET one restaurant by telephone
    // http://localhost:2019/restaurants/restaurant/{restaurantPhone}
    @GetMapping(value = "/restaurant/phone/{restaurantPhone}",
            produces = {"application/json"})
    public ResponseEntity<?> getRestaurantByTelephone(@PathVariable String restaurantPhone) {
        Restaurant r = restaurantService.findRestaurantByTelephone(restaurantPhone);
        return new ResponseEntity<>(r, HttpStatus.OK);
    }
    // DELETE one restaurant
    // http://localhost:2019/restaurants/restaurant/{restaurantid}
    @DeleteMapping(value = "/restaurant/{restaurantId}")
    public ResponseEntity<?> deleteRestaurantById(@PathVariable Long restaurantId) {
        restaurantService.delete(restaurantId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // PUT one restaurant
    // http://localhost:2019/restaurants/restaurant/{restaurantid}
    @PutMapping(value = "/restaurant/{restaurantId}",
                produces = {"application/json"},
                consumes = {"application/json"})
    public ResponseEntity<?> updateRestaurant(@RequestBody Restaurant updateRestaurant,
                                              @PathVariable Long restaurantId) {
        restaurantService.update(updateRestaurant, restaurantId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // POST one restaurant
    @PostMapping(value = "/restaurant",
            produces = {"application/json"},
            consumes = {"application/json"})
    public ResponseEntity<?> addNewRestaurant(@Valid
                                              @RequestBody Restaurant newRestaurant) throws URISyntaxException{
        newRestaurant = restaurantService.save(newRestaurant);

        // set location header for newly created resource
        HttpHeaders responseHeaders = new HttpHeaders();
        URI newRestaurantURI = ServletUriComponentsBuilder.fromCurrentRequest().path("/{restaurantid}")
                .buildAndExpand(newRestaurant.getRestaurantid()).toUri();
                responseHeaders.setLocation(newRestaurantURI);

        return new ResponseEntity<>(null, responseHeaders, HttpStatus.CREATED);
    }
}
