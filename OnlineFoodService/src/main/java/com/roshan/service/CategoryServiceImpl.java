package com.roshan.service;

import com.roshan.entity.Category;
import com.roshan.entity.Restaurant;
import com.roshan.repo.ICategoryRepo;
import com.roshan.request.FoodCategoryRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements ICategoryService {

    private final ICategoryRepo categoryRepo;

    private final IRestaurantService restaurantService;

    @Override
    public Category createCategory(FoodCategoryRequest request) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(request.getRestaurantId());
        Category category = new Category();
        category.setName(request.getName());
        category.setRestaurant(restaurant);
        return categoryRepo.save(category);
    }

    @Override
    public List<Category> findCategoryByRestaurantId(Long id) {
        return categoryRepo.findByRestaurantId(id);
    }

    @Override
    public Category findCategoryById(Long id) throws Exception {
        Optional<Category> opt = categoryRepo.findById(id);
        if (opt.isEmpty()) {
            throw new Exception("Category not found!");
        }
        return opt.get();
    }
}
