package com.roshan.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.roshan.entity.Category;
import com.roshan.entity.Food;
import com.roshan.entity.Restaurant;
import com.roshan.repo.IFoodRepo;
import com.roshan.request.CreateFoodRequest;

@Service
public class FoodServiceImpl implements IFoodService {

	@Autowired
	IFoodRepo foodRepo;

	@Override
	public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant) {
		Food food = new Food();
		food.setFoodCategory(category);
		food.setRestaurant(restaurant);
		food.setDescription(req.getDescription());
		food.setImages(req.getImages());
		food.setName(req.getName());
		food.setPrice(req.getPrice());
		food.setIngredients(req.getIngredients());
		food.setSeasonal(req.isSeasonal());
		food.setVegetarian(req.isVegetarian());

		Food savedFood = foodRepo.save(food);
		restaurant.getFoods().add(savedFood);
		return savedFood;
	}

	@Override
	public void deleteFood(Long foodId) throws Exception {
		Food food = findFoodById(foodId);
		food.setRestaurant(null);
		foodRepo.save(food);
	}

	@Override
	public List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian, boolean isNonVeg, boolean isSeasonal,
			String foodCategory) {
		List<Food> foods = foodRepo.findByRestaurantId(restaurantId);
		if (isVegetarian) {
			foods = filterByVegeterian(foods, isVegetarian);
		}
		if (isNonVeg) {
			foods = filterByNonVeg(foods, isNonVeg);
		}
		if (isSeasonal) {
			foods = filterBySeasonal(foods, isSeasonal);
		}
		if (foodCategory != null && !foodCategory.equals("")) {
			foods = filterByCategory(foods, foodCategory);
		}
		return foods;

	}

	private List<Food> filterByCategory(List<Food> foods, String foodCategory) {
		return foods.stream().filter(food -> {
			if (food.getFoodCategory() != null) {
				return food.getFoodCategory().getName().equals(foodCategory);
			}
			return false;
		}).collect(Collectors.toList());
	}

	private List<Food> filterBySeasonal(List<Food> foods, boolean isSeasonal) {

		return foods.stream().filter(food -> food.isSeasonal() == isSeasonal).collect(Collectors.toList());
	}

	private List<Food> filterByNonVeg(List<Food> foods, boolean isNonVeg) {
		return foods.stream().filter(food -> food.isVegetarian() == false).collect(Collectors.toList());
	}

	private List<Food> filterByVegeterian(List<Food> foods, boolean isVegetarian) {

		return foods.stream().filter(food -> food.isVegetarian() == isVegetarian).collect(Collectors.toList());
	}

	@Override
	public List<Food> searchFoods(String keyword) {

		return foodRepo.searchFood(keyword);
	}

	@Override
	public Food findFoodById(Long foodId) throws Exception {
		Optional<Food> opt = foodRepo.findById(foodId);
		if (opt.isEmpty()) {
			throw new Exception("Food doesnot exist!");
		}
		return opt.get();
	}

	@Override
	public Food updateAvailabilityStatus(Long foodId) throws Exception {
		Food food = findFoodById(foodId);
		food.setAvailable(!food.isAvailable());
		return foodRepo.save(food);
	}

}
