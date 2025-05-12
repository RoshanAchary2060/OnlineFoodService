package com.roshan.controller;

import com.roshan.entity.Food;
import com.roshan.repo.IFoodRepo;
import com.roshan.service.IFoodService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
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
}
