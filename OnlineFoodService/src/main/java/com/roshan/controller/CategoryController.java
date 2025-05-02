package com.roshan.controller;

import com.roshan.entity.Category;
import com.roshan.entity.Users;
import com.roshan.request.FoodCategoryRequest;
import com.roshan.service.ICategoryService;
import com.roshan.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
public class CategoryController {

    @Autowired
    private ICategoryService categoryService;
    @Autowired
    private IUserService userService;

    @PostMapping("/admin/category/create")
    public ResponseEntity<Category> createCategory(@RequestBody FoodCategoryRequest category,
                                                   @RequestHeader("Authorization") String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        Category createdCategory = categoryService.createCategory(category);

        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/category/restaurant/{restaurantId}")
    public ResponseEntity<List<Category>> getRestaurantCategory(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long restaurantId) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        List<Category> categories = categoryService.findCategoryByRestaurantId(restaurantId);
        return new ResponseEntity<>(categories, HttpStatus.CREATED);
    }
}
