package com.lambda.clientrestaurants.client;

import com.lambda.clientrestaurants.model.Restaurant;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

public class RestaurantsClientRest
{
    private RestTemplate restTemplate = new RestTemplate();

    public ArrayList<Restaurant> getAllRestaurants()
    {
        ParameterizedTypeReference<ArrayList<Restaurant>> responseType =
                new ParameterizedTypeReference<ArrayList<Restaurant>>() {};
        ResponseEntity<ArrayList<Restaurant>> responseEntity =
                restTemplate.exchange("http://localhost:2019/restaurants/restaurants/?size=3",
                        HttpMethod.GET, null, responseType);
        ArrayList<Restaurant> allRestaurants = responseEntity.getBody();

        return allRestaurants;
    }

    public static void main(String[] args)
    {
        RestaurantsClientRest client = new RestaurantsClientRest();
        List<Restaurant> allEmployees = client.getAllRestaurants();
        System.out.println(allEmployees);
    }
}
