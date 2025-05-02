package com.roshan.service;

import com.roshan.entity.Food;
import com.roshan.entity.Ingredient;
import com.roshan.entity.Restaurant;
import com.roshan.repo.ICategoryRepo;
import com.roshan.repo.IFoodRepo;
import com.roshan.repo.IIngredientRepo;
import com.roshan.request.CreateFoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements IFoodService {

    @Autowired
    IFoodRepo foodRepo;
    @Autowired
    IIngredientRepo ingredientRepo;
    @Autowired
    ICategoryRepo categoryRepo;

    @Override
    public Food createFood(CreateFoodRequest req, Long categoryId, Restaurant restaurant) {
        Food food = new Food();
        food.setFoodCategory(categoryRepo.findById(categoryId).orElseThrow(()-> new RuntimeException("Category with id : " + categoryId + " does not exist!")));
        food.setRestaurant(restaurant);
        food.setDescription(req.getDescription());
        food.setImages(req.getImages());
        food.setName(req.getName());
        food.setPrice(req.getPrice());
        for(Long id: req.getIngredientsIds()) {
            Ingredient i = ingredientRepo.findById(id).orElse(null);
            if(i != null) {
                food.getIngredients().add(i);
            } else {
                throw new RuntimeException("Ingredient with id : " + id + " does not exist!");
            }
        }
        food.setSeasonal(req.isSeasonal());
        food.setVegetarian(req.isVegetarian());
        food.setNonVeg(req.isNonVeg());
        food.setAvailable(true);
        food.setCreationDate(new Date());
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
            foods = filterByVegetarian(foods, isVegetarian);
        }
        if (isNonVeg) {
            foods = filterByNonVeg(foods, isNonVeg);
        }
        if (isSeasonal) {
            foods = filterBySeasonal(foods, isSeasonal);
        }
        if (StringUtils.hasText(foodCategory)) {
            foods = filterByCategory(foods, foodCategory);
        }
        System.out.println("food size:" + foods.size());
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
        return foods.stream().filter(food -> food.isNonVeg() == isNonVeg).collect(Collectors.toList());
    }

    private List<Food> filterByVegetarian(List<Food> foods, boolean isVegetarian) {
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
            throw new Exception("Food does not exist!");
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
