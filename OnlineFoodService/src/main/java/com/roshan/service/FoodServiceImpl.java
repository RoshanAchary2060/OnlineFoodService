package com.roshan.service;

import com.roshan.entity.Category;
import com.roshan.entity.Food;
import com.roshan.entity.Ingredient;
import com.roshan.entity.Restaurant;
import com.roshan.repo.ICategoryRepo;
import com.roshan.repo.IFoodRepo;
import com.roshan.repo.IIngredientRepo;
import com.roshan.request.CreateFoodRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class FoodServiceImpl implements IFoodService {

    private final IFoodRepo foodRepo;
    private final IIngredientRepo ingredientRepo;
    private final ICategoryRepo categoryRepo;

    @Override
    public Food createFood(CreateFoodRequest req, Long categoryId, Restaurant restaurant) {
        Food food = new Food();
        Optional<Category> byId = categoryRepo.findById(categoryId);
        food.setFoodCategoryId(byId.get().getId());
        food.setRestaurantId(restaurant.getId());
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
        food.setCreationDate(new Date());
        Food savedFood = foodRepo.save(food);
//        restaurant.getFoods().add(savedFood);
        return savedFood;
    }

    @Override
    public void deleteFood(Long foodId) throws Exception {
        Food food = foodRepo.findById(foodId).orElseThrow(() -> new RuntimeException("Food not found"));
        food.getImages().clear();
        foodRepo.delete(food);
    }

//    @Override
//    public List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian, boolean isNonVeg, boolean isSeasonal,
//                                         String foodCategory) {
//        List<Food> foods = foodRepo.findByRestaurantId(restaurantId);
//        if (isVegetarian) {
//            foods = filterByVegetarian(foods);
//        }
//        if (isNonVeg) {
//            foods = filterByNonVeg(foods);
//        }
//        if (isSeasonal) {
//            foods = filterBySeasonal(foods);
//        }
//        if (StringUtils.hasText(foodCategory)) {
//            foods = filterByCategory(foods, foodCategory);
//        }
//        System.out.println("food size:" + foods.size());
//        return foods;
//    }
//
//    private List<Food> filterByCategory(List<Food> foods, String foodCategory) {
//        return foods.stream().filter(food -> {
//            if (food.getFoodCategory() != null) {
//                return food.getFoodCategory().getName().equals(foodCategory);
//            }
//            return false;
//        }).collect(Collectors.toList());
//    }

//    @Override
//    public List<Food> getRestaurantsFood(
//            Long restaurantId,
//            boolean isVegetarian,
//            boolean isNonVeg,
//            boolean isSeasonal,
//            String foodCategory
//    ) {
//        // 1. Fetch all foods for restaurant (using categoryId)
//        List<Food> foods = foodRepo.findByRestaurantId(restaurantId);
//
//        // 2. Preload categories for better performance (single query)
//        Set<Long> categoryIds = foods.stream()
//                .map(Food::getFoodCategoryId)
//                .filter(Objects::nonNull)
//                .collect(Collectors.toSet());
//
//        Map<Long, Category> categoryMap = categoryRepo.findAllById(categoryIds)
//                .stream()
//                .collect(Collectors.toMap(Category::getId, Function.identity()));
//
//        foods = applyFilters(foods, isVegetarian, isNonVeg, isSeasonal, foodCategory, categoryMap);
//
//        return foods;
//    }

    @Override
    public List<Food> getRestaurantsFood(
            Long restaurantId,
            boolean isVegetarian,
            boolean isNonVeg,
            boolean isSeasonal,
            String foodCategory
    ) {
        // 1. Get all foods for the restaurant
        List<Food> allFoods = foodRepo.findByRestaurantId(restaurantId);

        // 2. If no filters are applied, return all foods
        if (!isVegetarian && !isNonVeg && !isSeasonal && !StringUtils.hasText(foodCategory)) {
            return allFoods;
        }

        // 3. Preload categories only if foodCategory filter is needed
        Map<Long, Category> categoryMap;
        if (StringUtils.hasText(foodCategory)) {
            Set<Long> categoryIds = allFoods.stream()
                    .map(Food::getFoodCategoryId)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet());

            categoryMap = categoryRepo.findAllById(categoryIds)
                    .stream()
                    .collect(Collectors.toMap(Category::getId, Function.identity()));
        } else {
            categoryMap = Collections.emptyMap();
        }

        // 4. Apply filters
        return allFoods.stream()
                .filter(food -> {
                    // Handle food type filters
                    boolean matchesType = true;
                    if (isVegetarian || isNonVeg || isSeasonal) {
                        matchesType = (!isVegetarian || food.isVegetarian()) &&
                                (!isNonVeg || food.isNonVeg()) &&
                                (!isSeasonal || food.isSeasonal());
                    }

                    // Handle category filter
                    boolean matchesCategory = true;
                    if (StringUtils.hasText(foodCategory)) {
                        Category category = categoryMap.get(food.getFoodCategoryId());
                        matchesCategory = category != null && foodCategory.equals(category.getName());
                    }

                    return matchesType && matchesCategory;
                })
                .collect(Collectors.toList());
    }

    private List<Food> applyFilters(
            List<Food> foods,
            boolean isVegetarian,
            boolean isNonVeg,
            boolean isSeasonal,
            String foodCategory,
            Map<Long, Category> categoryMap
    ) {
        Stream<Food> stream = foods.stream();

        if (isVegetarian) {
            stream = stream.filter(Food::isVegetarian);
        }

        if (isNonVeg) {
            stream = stream.filter(Food::isNonVeg);
        }

        if (isSeasonal) {
            stream = stream.filter(Food::isSeasonal);
        }

        if (StringUtils.hasText(foodCategory)) {
            stream = stream.filter(food -> {
                Category category = categoryMap.get(food.getFoodCategoryId());
                return category != null && foodCategory.equals(category.getName());
            });
        }

        return stream.collect(Collectors.toList());
    }

    private List<Food> filterBySeasonal(List<Food> foods) {
        return foods.stream().filter(Food::isSeasonal).collect(Collectors.toList());
    }

    private List<Food> filterByNonVeg(List<Food> foods) {
        return foods.stream().filter(Food::isNonVeg).collect(Collectors.toList());
    }

    private List<Food> filterByVegetarian(List<Food> foods) {
        return foods.stream().filter(Food::isVegetarian).collect(Collectors.toList());
    }

    @Override
    public List<Food> searchFoods(String keyword) {
//        return foodRepo.searchFood(keyword);
        return null;
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
        boolean available = food.isAvailable();
        food.setAvailable(!available);
        return foodRepo.save(food);
    }
}
