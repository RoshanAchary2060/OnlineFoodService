package com.roshan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.roshan.entity.Restaurant;
import com.roshan.entity.Users;
import com.roshan.request.CreateRestaurantRequest;
import com.roshan.response.MessageResponse;
import com.roshan.service.IRestaurantService;
import com.roshan.service.IUserService;

@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestaurantController {

	@Autowired
	private IRestaurantService restaurantService;
	@Autowired
	private IUserService userService;

	@PostMapping("/create")
	public ResponseEntity<Restaurant> createRestaurant(@RequestBody CreateRestaurantRequest req,
			@RequestHeader("Authorization") String jwt) throws Exception {
		Users user = userService.findUserByJwtToken(jwt);
		Restaurant restaurant = restaurantService.createRestaurant(req, user);
		return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Restaurant> updateRestaurant(@RequestBody CreateRestaurantRequest req,
			@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws Exception {
		Restaurant restaurant = restaurantService.updateRestaurant(id, req);
		return new ResponseEntity<>(restaurant, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<MessageResponse> deleteRestaurant(@RequestHeader("Authorization") String jwt,
			@PathVariable Long id) throws Exception {
		restaurantService.deleteRestaurant(id);
		MessageResponse res = new MessageResponse();
		res.setMessage("Restaurant deleted successfully...");
		return new ResponseEntity<MessageResponse>(res, HttpStatus.OK);

	}

	@PutMapping("/{id}/status")
	public ResponseEntity<Restaurant> updateRestaurantStatus(@RequestBody CreateRestaurantRequest req,
			@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws Exception {
		Restaurant restaurant = restaurantService.updateRestaurantStatus(id);

		return new ResponseEntity<>(restaurant, HttpStatus.OK);

	}

	@GetMapping("/user")
	public ResponseEntity<Restaurant> findRestaurantByUserId(@RequestBody CreateRestaurantRequest req,
			@RequestHeader("Authorization") String jwt) throws Exception {
		Users user = userService.findUserByJwtToken(jwt);
		Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());

		return new ResponseEntity<>(restaurant, HttpStatus.OK);

	}
}
