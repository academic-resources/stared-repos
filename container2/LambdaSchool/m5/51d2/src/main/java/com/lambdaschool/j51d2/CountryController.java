package com.lambdaschool.j51d2;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import static com.lambdaschool.j51d2.J51d2Application.ourCountryList;


@RestController
@RequestMapping("/countries")
public class CountryController {
    // /names/all
    @GetMapping(value = "/names/all",
                produces = {"application/json"})
    public ResponseEntity<?> getAllCountries(){
        J51d2Application.ourCountryList.countryList.sort(
                (e1, e2) -> e1.getName().compareToIgnoreCase(e2.getName())
        );
        return new ResponseEntity<>(J51d2Application.ourCountryList, HttpStatus.OK);
    }

    // /names/start/{letter}
    @GetMapping(value="/names/start/{letter}",
               produces = {"application/json"})
    public ResponseEntity<?> getCountriesByFirstLettr(@PathVariable char letter) {
        ArrayList<Country> rtnCountries = ourCountryList.findCountries(
                c -> c.getName().toUpperCase().charAt(0) ==
                        Character.toUpperCase((letter))
        );
        return new ResponseEntity<>(rtnCountries, HttpStatus.OK);
    }

    // /names/size/{number}
    @GetMapping(value = "/names/size/{number}",
            produces = {"application/json"})
    public ResponseEntity<?> getCountriesByNameSize(@PathVariable long number) {
        return new ResponseEntity<>((J51d2Application.ourCountryList.findCountries(c ->(c.getName().length() >= number))), HttpStatus.OK);
    }

    // /population/size/{people} - countries that have a population equal to or greater than the given population
    @GetMapping(value = "/population/size/{people}",
            produces = {"application/json"})
    public ResponseEntity<?> getCountriesByGTPopulation(@PathVariable long people) {
        return new ResponseEntity<>((J51d2Application.ourCountryList.findCountries(c ->(c.getPopulation() >= people))), HttpStatus.OK);
    }

    // /population/min - country with the smallest population
    @GetMapping(value = "/population/min",
            produces = {"application/json"}
    )
    public Country getMinPop(){
        Country minPop = J51d2Application.ourCountryList.countryList.get(1);
        for(Country c : J51d2Application.ourCountryList.countryList){
            if(c.getPopulation() < minPop.getPopulation()){
                minPop = c;
            }
        }

        return minPop;
    }

    // /population/max - country with the largest population
    @GetMapping(value = "/population/max",
            produces = {"application/json"}
    )
    public Country getMaxPop(){
        // sort list
        Country maxPop = J51d2Application.ourCountryList.countryList.get(1);
        for(Country c : J51d2Application.ourCountryList.countryList){
            if(c.getPopulation() > maxPop.getPopulation()){
                maxPop = c;
            }
        }

        return maxPop;
    }

/*
    // /population/median - country with the median population
    @GetMapping(value = "/population/max",
            produces = {"application/json"}
    )
    public Country getMedianPop(){
        // sort list
        J51d2Application.ourCountryList.countryList.sort((c1, c2) -> c2.getPopulation() - c1.getPopulation());
        int middle = (J51d2Application.ourCountryList.countryList.length())/2;
         if((J51d2Application.ourCountryList.countryList % 2) == 1) {
             return J51d2Application.ourCountryList[middle];
         }else{
             return (J51d2Application.ourCountryList[middle-1] + J51d2Application.ourCountryList[middle]) / 2.0;
         }
    }
*/

    // /age/age/{age} - countries that have a median age equal to or greater than the given age
    @GetMapping(value = "/age/age/{age}",
            produces = {"application/json"}
    )
    public ResponseEntity<?> getMedianGTAge(@PathVariable long age) {
        return new ResponseEntity<>((J51d2Application.ourCountryList.findCountries(c ->(c.getMedianAge() >= age))), HttpStatus.OK);
    }


    // /age/min - country with the smallest median age
    @GetMapping(value = "/age/min",
            produces = {"application/json"}
    )
    public Country getSmallestMedianAge(){
        Country minAge = J51d2Application.ourCountryList.countryList.get(1);
        for(Country c : J51d2Application.ourCountryList.countryList){
            if(c.getMedianAge() < minAge.getMedianAge()){
                minAge = c;
            }
        }

        return minAge;
    }


    // /age/max - country with the greatest median age
    @GetMapping(value = "/age/max",
            produces = {"application/json"}
    )
    public Country getLargestMedianAge(){

        Country maxAge = J51d2Application.ourCountryList.countryList.get(1);
        for(Country c : J51d2Application.ourCountryList.countryList){
            if(c.getMedianAge() > maxAge.getMedianAge()){
                maxAge = c;
            }
        }

        return maxAge;
    }
/*
    // /age/median - country with the median median age
    @GetMapping(value = "/age/median",
            produces = {"application/json"}
    )
    public Country getMedianAge(){
        // sort list
        J51d2Application.ourCountryList.countryList.sort((c1, c2) -> c2.getMedianAge() - c1.getMedianAge());
        int middle = J51d2Application.ourCountryList.countryList.length/2;
        if((J51d2Application.ourCountryList.countryList % 2) == 1) {
            return J51d2Application.ourCountryList[middle];
        }else{
            return (J51d2Application.ourCountryList[middle-1] + J51d2Application.ourCountryList[middle]) / 2.0;
        }
    }
*/
}
