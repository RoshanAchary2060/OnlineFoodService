package com.roshan.service;

import com.roshan.entity.Ingredient;
import com.roshan.entity.IngredientCategory;

import java.util.List;

public interface IIngredientService {

    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception;

    public IngredientCategory findIngredientCategoryById(Long id) throws Exception;

    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long restaurantId) throws Exception;

    public Ingredient createIngredient(Long restaurantId, String ingredientName, Long categoryId) throws Exception;

    public List<Ingredient> findRestaurantIngredients(Long restaurantId);

    public Ingredient updateStock(Long id) throws Exception;

}
