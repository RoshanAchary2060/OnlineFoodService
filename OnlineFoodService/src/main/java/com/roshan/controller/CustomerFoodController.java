package com.roshan.controller;

import com.roshan.entity.Food;
import com.roshan.repo.IFoodRepo;
import com.roshan.service.IFoodService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/food")
@RequiredArgsConstructor
public class CustomerFoodController {

    private final IFoodService foodService;

    private final IFoodRepo foodRepo;

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String name) {
        List<Food> foods = foodService.searchFoods(name);
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(
            @RequestParam boolean vegetarian, @RequestParam boolean seasonal, @RequestParam boolean nonveg,
            @RequestParam(required = false) String food_category, @PathVariable Long restaurantId
    ) {
        List<Food> foods = foodService.getRestaurantsFood(restaurantId, vegetarian, nonveg, seasonal, food_category);
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/restaurant/all/{restaurantId}")
    public ResponseEntity<List<Food>> getAllRestaurantFoods( @RequestHeader("Authorization") String jwt, @PathVariable Long restaurantId ) throws Exception {
        List<Food> foods = foodRepo.findByRestaurantId(restaurantId);
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

//    @GetMapping()
//    public ResponseEntity<List<Food>> getAllFoods(@RequestHeader("Authorization") String jwt) {
//        List<Food> foods = foodRepo.findAll();
//        return new ResponseEntity<>(foods, HttpStatus.OK);
//    }
//
//    @GetMapping("/hth")
//    public ResponseEntity<List<Food>> getFoodsSortedLowToHigh() {
//        List<Food> foods = foodRepo.findAll(Sort.by(Sort.Direction.DESC, "price"));
//        return ResponseEntity.ok(foods);
//    }
//
//    @GetMapping("/htl")
//    public ResponseEntity<List<Food>> getFoodsSortedHighToLow() {
//        List<Food> foods = foodRepo.findAll(Sort.by(Sort.Direction.ASC, "price"));
//        return ResponseEntity.ok(foods);
//    }

    @GetMapping()
    public ResponseEntity<List<Food>> getAllFoods(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(required = false) String food,   // search text, optional
            @RequestParam(required = false) String sort    // "htl" or "hth" or null
    ) {
        Sort sortOrder = Sort.unsorted();

        if ("hth".equalsIgnoreCase(sort)) {
            // Price low to high
            sortOrder = Sort.by(Sort.Direction.ASC, "price");
        } else if ("htl".equalsIgnoreCase(sort)) {
            // Price high to low
            sortOrder = Sort.by(Sort.Direction.DESC, "price");
        }

        List<Food> foods;

        if (food != null && !food.isBlank()) {
            // Search by food name with optional sorting
            foods = foodRepo.findByNameContainingIgnoreCase(food, sortOrder);
        } else {
            // No search text; just return all with sorting if specified
            foods = foodRepo.findAll(sortOrder);
        }

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

}
