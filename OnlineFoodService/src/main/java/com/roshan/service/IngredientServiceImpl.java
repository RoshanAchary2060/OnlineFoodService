package com.roshan.service;

import com.roshan.entity.Ingredient;
import com.roshan.entity.IngredientCategory;
import com.roshan.entity.Restaurant;
import com.roshan.repo.IIngredientCategoryRepo;
import com.roshan.repo.IIngredientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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
        Ingredient ingredient = new Ingredient();
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        IngredientCategory category = ingredientCategoryRepo.findById(categoryId).orElse(null);
        if(category != null) {
            ingredient.setCategory(category);
        }
        if(restaurant != null) {
            ingredient.setRestaurant(restaurant);
        }
        ingredient.setName(ingredientName);
        ingredient = ingredientRepo.save(ingredient);
        return ingredient;
    }

    @Override
    public List<Ingredient> findRestaurantIngredients(Long restaurantId) {
        return ingredientRepo.findByRestaurantId(restaurantId);
    }

    @Override
    public Ingredient updateStock(Long id) throws Exception {
        // TODO Auto-generated method stub
        return null;
    }

}
