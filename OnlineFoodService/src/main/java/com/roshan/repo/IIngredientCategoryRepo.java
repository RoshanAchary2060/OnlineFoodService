package com.roshan.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.roshan.entity.IngredientCategory;

@Service
public interface IIngredientCategoryRepo extends JpaRepository<IngredientCategory, Long> {

}
