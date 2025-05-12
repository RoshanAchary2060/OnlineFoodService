package com.roshan.service;

import com.roshan.entity.Category;
import com.roshan.request.FoodCategoryRequest;

import java.util.List;

public interface ICategoryService {

    Category createCategory(FoodCategoryRequest request) throws Exception;

    List<Category> findCategoryByRestaurantId(Long id) throws Exception;

    Category findCategoryById(Long id) throws Exception;
}
