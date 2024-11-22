package com.roshan.service;

import java.util.List;

import com.roshan.entity.Category;
import com.roshan.entity.Food;
import com.roshan.entity.Restaurant;
import com.roshan.request.CreateFoodRequest;

public interface IFoodService {

	public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);

	public void deleteFood(Long foodId) throws Exception;

	public List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian, boolean isNonVeg, boolean isSeasonal,
			String foodCategory);

	public List<Food> searchFoods(String keyword);

	public Food findFoodById(Long foodId) throws Exception;
	
	public Food updateAvailabilityStatus(Long foodId) throws Exception;
}
