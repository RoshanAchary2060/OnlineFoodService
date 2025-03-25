package com.roshan.repo;

import com.roshan.entity.IngredientCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface IIngredientCategoryRepo extends JpaRepository<IngredientCategory, Long> {

}
