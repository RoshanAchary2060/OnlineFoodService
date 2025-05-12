package com.roshan.controller;

import com.roshan.entity.Category;
import com.roshan.request.FoodCategoryRequest;
import com.roshan.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CategoryController {

    private final ICategoryService categoryService;

    @PostMapping("/admin/category/create")
    public ResponseEntity<Category> createCategory(@RequestBody FoodCategoryRequest category) throws Exception {
        Category createdCategory = categoryService.createCategory(category);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/category/restaurant/{restaurantId}")
    public ResponseEntity<List<Category>> getRestaurantCategory(@PathVariable Long restaurantId) throws Exception {
        List<Category> categories = categoryService.findCategoryByRestaurantId(restaurantId);
        return new ResponseEntity<>(categories, HttpStatus.CREATED);
    }
}
