package com.roshan.service;

import java.util.List;

import com.roshan.entity.Category;

public interface ICategoryService {

	public Category createCategory(String name, Long userId) throws Exception;

	public List<Category> findCategoryByRestaurantId(Long id) throws Exception;

	public Category findCategoryById(Long id) throws Exception;
}
