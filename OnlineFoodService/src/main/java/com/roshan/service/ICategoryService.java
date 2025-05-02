package com.roshan.service;

import com.roshan.entity.Category;
import com.roshan.request.FoodCategoryRequest;

import java.util.List;

public interface ICategoryService {

    public Category createCategory(FoodCategoryRequest request) throws Exception;

    public List<Category> findCategoryByRestaurantId(Long id) throws Exception;

    public Category findCategoryById(Long id) throws Exception;
}
