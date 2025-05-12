package com.roshan.service;

import com.roshan.entity.Ingredient;
import com.roshan.entity.IngredientCategory;
import java.util.List;

public interface IIngredientService {

    IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception;

    IngredientCategory findIngredientCategoryById(Long id) throws Exception;

    List<IngredientCategory> findIngredientCategoryByRestaurantId(Long restaurantId) throws Exception;

    Ingredient createIngredient(Long restaurantId, String ingredientName, Long categoryId) throws Exception;

    List<Ingredient> findRestaurantIngredients(Long restaurantId);

    Ingredient updateStock(Long id) throws Exception;
}
