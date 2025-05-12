package com.roshan.service;

import com.roshan.entity.Food;
import com.roshan.entity.Restaurant;
import com.roshan.request.CreateFoodRequest;
import java.util.List;

public interface IFoodService {

    Food createFood(CreateFoodRequest req, Long categoryId, Restaurant restaurant);

    void deleteFood(Long foodId) throws Exception;

    List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian, boolean isNonVeg, boolean isSeasonal, String foodCategory);

    List<Food> searchFoods(String keyword);

    Food findFoodById(Long foodId) throws Exception;

    Food updateAvailabilityStatus(Long foodId) throws Exception;
}
