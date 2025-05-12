package com.roshan.service;

import com.roshan.dto.RestaurantDTO;
import com.roshan.entity.Restaurant;
import com.roshan.entity.Users;
import com.roshan.request.CreateRestaurantRequest;

import java.util.List;

public interface IRestaurantService {

    Restaurant createRestaurant(CreateRestaurantRequest req, Users user);

    Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception;

    void deleteRestaurant(Long restaurantId) throws Exception;

    List<Restaurant> getAllRestaurants();

    List<Restaurant> searchRestaurant(String keyword);

    Restaurant findRestaurantById(Long id) throws Exception;

    Restaurant getRestaurantByUserId(Long userId) throws Exception;

    RestaurantDTO addToFavorites(Long restaurantId, Users user) throws Exception;

    Restaurant updateRestaurantStatus(Long id) throws Exception;
}
