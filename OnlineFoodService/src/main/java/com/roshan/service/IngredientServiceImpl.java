package com.roshan.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.roshan.entity.Ingredient;
import com.roshan.entity.IngredientCategory;
import com.roshan.entity.Restaurant;
import com.roshan.repo.IIngredientCategoryRepo;
import com.roshan.repo.IIngredientRepo;

public class IngredientServiceImpl implements IIngredientService {

	@Autowired
	IIngredientRepo ingredientRepo;
	@Autowired
	IIngredientCategoryRepo ingredientCategoryRepo;
	@Autowired
	IRestaurantService restaurantService;

	@Override
	public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
		Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);

		IngredientCategory category = new IngredientCategory();
		category.setRestaurant(restaurant);
		category.setName(name);

		return ingredientCategoryRepo.save(category);
	}

	@Override
	public IngredientCategory findIngredientCategoryById(Long id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long restaurantId) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Ingredient createIngredient(Long restaurantId, String ingredientName, Long categoryId) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Ingredient> findRestaurantIngredients(Long restaurantId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Ingredient updateStock(Long id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
