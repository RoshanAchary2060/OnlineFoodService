package com.roshan.repo;

import com.roshan.entity.Food;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface IFoodRepo extends JpaRepository<Food, Long> {

    List<Food> findByRestaurantId(Long restaurantId);

    List<Food> findByNameContainingIgnoreCase(String name, Sort sort);
    List<Food> findAll(Sort sort);


//    @Query("SELECT f FROM Food f WHERE f.name LIKE %:keyword% OR f.foodCategory.name LIKE %:keyword%")
//    List<Food> searchFood(@Param("keyword") String keyword);
}
