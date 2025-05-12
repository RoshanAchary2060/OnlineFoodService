package com.roshan.controller;

import com.roshan.entity.Food;
import com.roshan.entity.Restaurant;
import com.roshan.request.CreateFoodRequest;
import com.roshan.response.MessageResponse;
import com.roshan.service.IFoodService;
import com.roshan.service.IRestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/food")
@RequiredArgsConstructor
public class AdminFoodController {

    private final IFoodService foodService;
    private final IRestaurantService restaurantService;

    @PostMapping("/create")
    public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());
        if(!req.isVegetarian()) {
            req.setNonVeg(true);
        }
        Food food = foodService.createFood(req, req.getCategoryId(), restaurant);
        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> DeleteFood(@PathVariable Long id) throws Exception {
        foodService.deleteFood(id);
        MessageResponse response = new MessageResponse();
        response.setMessage("Food deleted successfully...");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Food> updateFoodAvailabilityStatus(@PathVariable Long id) throws Exception {
        Food food = foodService.updateAvailabilityStatus(id);
        return new ResponseEntity<>(food, HttpStatus.OK);
    }
}
