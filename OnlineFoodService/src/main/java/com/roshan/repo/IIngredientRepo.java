package com.roshan.repo;

import com.roshan.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IIngredientRepo extends JpaRepository<Ingredient, Long> {

}
