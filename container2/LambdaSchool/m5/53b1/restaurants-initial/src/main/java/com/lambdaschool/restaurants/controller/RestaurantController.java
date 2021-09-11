package com.lambdaschool.restaurants.controller;

import com.lambdaschool.restaurants.model.ErrorDetail;
import com.lambdaschool.restaurants.model.Restaurant;
import com.lambdaschool.restaurants.service.RestaurantService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
@RequestMapping("/restaurants")
public class RestaurantController
{
    @Autowired
    private RestaurantService restaurantService;


    // http://localhost:2019/restaurants/restaurants?page=1&size=1
    // http://localhost:2019/restaurants/restaurants?sort=anyfieldinrestaurant
    // http://localhost:2019/restaurants/restaurants?sort=city,desc&sort=name,asc&page=1&size=1
    @ApiOperation(value = "return all restaurants using paging and sorting",
                  response = Restaurant.class,
                  responseContainer = "List")
    @ApiImplicitParams({
            @ApiImplicitParam(name="page", dataType = "integer", paramType = "query", value="Results page you want to retrieve(0..N)"),
            @ApiImplicitParam(name = "size", dataType = "integer", paramType = "query", value="Results size you want to retrieve per page(0..N)"),
            @ApiImplicitParam(name = "sort",
                              allowMultiple = true,
                              dataType = "string",
                              paramType = "query",
                              value = "Sorting criteria in the format:  property(,asc|desc).  Default sort order is ascending.  Multiple sort criteria are supported.")
    })
    @GetMapping(value = "/restaurants",
                produces = {"application/json"})
    public ResponseEntity<?> listAllRestaurantsWithPaging(@PageableDefault(page = 0,
                                                                 size = 5)
                                                                 Pageable pageable)
    {
        List<Restaurant> myRestaurants = restaurantService.findAll(pageable);
        return new ResponseEntity<>(myRestaurants, HttpStatus.OK);
    }

    @GetMapping(value = "/allrestaurants",
            produces = {"application/json"})
    public ResponseEntity<?> listAllRestaurants()
    {
        List<Restaurant> myRestaurants = restaurantService.findAll(Pageable.unpaged());
        return new ResponseEntity<>(myRestaurants, HttpStatus.OK);
    }



    @ApiOperation(value = "Retrieve restaurant associated with the restaurant id.", response = Restaurant.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Restaurant Found", response = Restaurant.class),
            @ApiResponse(code = 404, message = "Restaurant Not Found", response = ErrorDetail.class)
    })
    @GetMapping(value = "/restaurant/{restaurantId}",
                produces = {"application/json"})
    public ResponseEntity<?> getRestaurantById(
            @ApiParam(value = "Restaurant ID", required = true, example = "1")
            @PathVariable
                    Long restaurantId)
    {
        Restaurant r = restaurantService.findRestaurantById(restaurantId);
        return new ResponseEntity<>(r, HttpStatus.OK);
    }


    @GetMapping(value = "/restaurant/name/{name}",
                produces = {"application/json"})
    public ResponseEntity<?> getRestaurantByName(
            @PathVariable
                    String name)
    {
        Restaurant r = restaurantService.findRestaurantByName(name);
        return new ResponseEntity<>(r, HttpStatus.OK);
    }


    @ApiOperation(value = "Creates a new restaurant", notes = "The newly created restaurant ID will be sent in the location header.", response = void.class)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Restaurant created successfully.", response = void.class),
            @ApiResponse(code = 500, message = "Error creating restaurant.", response = ErrorDetail.class)
    })
    @PostMapping(value = "/restaurant",
                 consumes = {"application/json"},
                 produces = {"application/json"})
    public ResponseEntity<?> addNewRestaurant(@Valid
                                              @RequestBody
                                              Restaurant newRestaurant) throws URISyntaxException
    {
        newRestaurant = restaurantService.save(newRestaurant);

        // set the location header for the newly created resource
        HttpHeaders responseHeaders = new HttpHeaders();
        URI newRestaurantURI = ServletUriComponentsBuilder.fromCurrentRequest().path("/{restaurantid}").buildAndExpand(newRestaurant.getRestaurantid()).toUri();
        responseHeaders.setLocation(newRestaurantURI);

        return new ResponseEntity<>(null, responseHeaders, HttpStatus.CREATED);
    }


    @PutMapping(value = "/restaurant/{restaurantid}")
    public ResponseEntity<?> updateRestaurant(
            @RequestBody
                    Restaurant updateRestaurant,
            @ApiParam(value = "Restaurant ID", required = true, example = "1")
            @PathVariable
                    long restaurantid)
    {
        restaurantService.update(updateRestaurant, restaurantid);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @DeleteMapping("/restaurant/{restaurantid}")
    public ResponseEntity<?> deleteRestaurantById(
            @PathVariable
                    long restaurantid)
    {
        restaurantService.delete(restaurantid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

