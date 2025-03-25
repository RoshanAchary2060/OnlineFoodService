package com.roshan.service;

import com.roshan.dto.RestaurantDTO;
import com.roshan.entity.Restaurant;
import com.roshan.entity.Users;
import com.roshan.request.CreateRestaurantRequest;

import java.util.List;

public interface IRestaurantService {

    public Restaurant createRestaurant(CreateRestaurantRequest req, Users user);

    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception;

    public void deleteRestaurant(Long restaurantId) throws Exception;

    public List<Restaurant> getAllRestaurants();

    public List<Restaurant> searchRestaurant(String keyword);

    public Restaurant findRestaurantById(Long id) throws Exception;

    public Restaurant getRestaurantByUserId(Long userId) throws Exception;

    public RestaurantDTO addToFavorites(Long restaurantId, Users user) throws Exception;

    public Restaurant updateRestaurantStatus(Long id) throws Exception;
}
