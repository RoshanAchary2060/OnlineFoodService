package com.roshan.service;

import com.roshan.entity.Ingredient;
import com.roshan.entity.IngredientCategory;
import com.roshan.entity.Restaurant;
import com.roshan.repo.IIngredientCategoryRepo;
import com.roshan.repo.IIngredientRepo;
import com.roshan.repo.IRestaurantRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IngredientServiceImpl implements IIngredientService {

    private final IIngredientRepo ingredientRepo;
    private final IIngredientCategoryRepo ingredientCategoryRepo;

    private final IRestaurantRepo restaurantRepo;

    @Override
    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantRepo.findById(restaurantId).orElse(null);
        IngredientCategory category = new IngredientCategory();
        category.setRestaurant(restaurant);
        category.setName(name);
        return ingredientCategoryRepo.save(category);
    }

    @Override
    public IngredientCategory findIngredientCategoryById(Long id) {
        return null;
    }

    @Override
    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long restaurantId) {
        return ingredientCategoryRepo.findByRestaurantId(restaurantId);
    }

    @Override
    public Ingredient createIngredient(Long restaurantId, String ingredientName, Long categoryId) throws Exception {
        Ingredient ingredient = new Ingredient();
        Restaurant restaurant = restaurantRepo.findById(restaurantId).orElse(null);
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
        return ingredientRepo.findByRestaurantIdOrderByIdAsc(restaurantId);
    }

    @Override
    public Ingredient updateStock(Long id) {
        Ingredient ingredient = ingredientRepo.findById(id).orElse(null);
        if (ingredient != null) {
            ingredient.setInStock(!ingredient.isInStock());
            ingredientRepo.save(ingredient);
        }
        return ingredient;
    }
}
