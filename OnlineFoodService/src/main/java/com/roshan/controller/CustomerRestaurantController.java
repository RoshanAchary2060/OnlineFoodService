package com.roshan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.roshan.dto.RestaurantDTO;
import com.roshan.entity.Restaurant;
import com.roshan.entity.Users;
import com.roshan.service.IRestaurantService;
import com.roshan.service.IUserService;

@RestController
@RequestMapping("/api/restaurants")
public class CustomerRestaurantController {
	@Autowired
	private IRestaurantService restaurantService;
	@Autowired
	private IUserService userService;

	@GetMapping("/search")
	public ResponseEntity<List<Restaurant>> searchRestaurant(@RequestParam String keyword,
			@RequestHeader("Authorization") String jwt) throws Exception {
		List<Restaurant> restaurants = restaurantService.searchRestaurant(keyword);
		return new ResponseEntity<>(restaurants, HttpStatus.OK);
	}

	@GetMapping("")
	public ResponseEntity<List<Restaurant>> getAllRestaurant(@RequestHeader("Authorization") String jwt)
			throws Exception {
		List<Restaurant> restaurants = restaurantService.getAllRestaurants();
		return new ResponseEntity<>(restaurants, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Restaurant> findRestaurantById(@PathVariable Long id,
			@RequestHeader("Authorization") String jwt) throws Exception {
		Restaurant restaurant = restaurantService.findRestaurantById(id);
		return new ResponseEntity<>(restaurant, HttpStatus.OK);
	}

	@PutMapping("/{id}/add_favorite")
	public ResponseEntity<RestaurantDTO> addToFavorite(@PathVariable Long id,
			@RequestHeader("Authorization") String jwt) throws Exception {
		Users user = userService.findUserByJwtToken(jwt);
		RestaurantDTO dto = restaurantService.addToFavorites(id, user);
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
}
