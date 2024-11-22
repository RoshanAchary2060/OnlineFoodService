package com.roshan.service;

import java.util.List;

import com.roshan.entity.Ingredient;
import com.roshan.entity.IngredientCategory;

public interface IIngredientService {

	public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception;

	public IngredientCategory findIngredientCategoryById(Long id) throws Exception;

	public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long restaurantId) throws Exception;

	public Ingredient createIngredient(Long restaurantId, String ingredientName, Long categoryId) throws Exception;

	public List<Ingredient> findRestaurantIngredients(Long restaurantId);

	public Ingredient updateStock(Long id) throws Exception;

}
