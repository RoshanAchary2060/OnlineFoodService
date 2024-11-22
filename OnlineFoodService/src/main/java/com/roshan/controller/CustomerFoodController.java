package com.roshan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.roshan.entity.Food;
import com.roshan.service.IFoodService;
import com.roshan.service.IRestaurantService;
import com.roshan.service.IUserService;

@RestController
@RequestMapping("/api/food")
public class CustomerFoodController {
	@Autowired
	IFoodService foodService;
	@Autowired
	IUserService userService;
	@Autowired
	IRestaurantService restaurantService;

	@GetMapping("/search")
	public ResponseEntity<List<Food>> searchFood(@RequestParam String name, @RequestHeader("Authorization") String jwt)
			throws Exception {
//		Users user = userService.findUserByJwtToken(jwt);

		List<Food> foods = foodService.searchFoods(name);
		return new ResponseEntity<>(foods, HttpStatus.OK);
	}

	@GetMapping("/restaurant/{restaurantId}")
	public ResponseEntity<List<Food>> getRestaurantFood(@RequestParam boolean vegetarian,
			@RequestParam boolean seasonal, @RequestParam boolean nonveg,
			@RequestParam(required = false) String food_category,

			@PathVariable Long restaurantId, @RequestHeader("Authorization") String jwt) throws Exception {
//		Users user = userService.findUserByJwtToken(jwt);

		List<Food> foods = foodService.getRestaurantsFood(restaurantId, vegetarian, nonveg, seasonal, food_category);
		return new ResponseEntity<>(foods, HttpStatus.OK);
	}
}
