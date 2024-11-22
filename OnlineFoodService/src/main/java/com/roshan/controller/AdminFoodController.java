package com.roshan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.roshan.entity.Food;
import com.roshan.entity.Restaurant;
import com.roshan.entity.Users;
import com.roshan.request.CreateFoodRequest;
import com.roshan.response.MessageResponse;
import com.roshan.service.IFoodService;
import com.roshan.service.IRestaurantService;
import com.roshan.service.IUserService;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {

	@Autowired
	IFoodService foodService;
	@Autowired
	IUserService userService;
	@Autowired
	IRestaurantService restaurantService;

	@PostMapping("/create")
	public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req,
			@RequestHeader("Authorization") String jwt) throws Exception {
//		Users user = userService.findUserByJwtToken(jwt);
		Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());
		Food food = foodService.createFood(req, req.getCategory(), restaurant);

		return new ResponseEntity<>(food, HttpStatus.CREATED);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<MessageResponse> DeleteFood(@PathVariable Long id, @RequestHeader("Authorization") String jwt)
			throws Exception {
//		Users user = userService.findUserByJwtToken(jwt);
		foodService.deleteFood(id);
		MessageResponse response = new MessageResponse();
		response.setMessage("Food deleted successfully...");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PutMapping("status/{id}")
	public ResponseEntity<Food> updateFoodAvailabilityStatus(@PathVariable Long id,
			@RequestHeader("Authorization") String jwt) throws Exception {
//		Users user = userService.findUserByJwtToken(jwt);

		Food food = foodService.updateAvailabilityStatus(id);

		return new ResponseEntity<>(food, HttpStatus.OK);
	}
}
