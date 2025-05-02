package com.roshan.repo;

import com.roshan.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IIngredientRepo extends JpaRepository<Ingredient, Long> {
    List<Ingredient> findByRestaurantId(Long restaurantId);
}
