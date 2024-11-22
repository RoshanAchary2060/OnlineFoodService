package com.roshan.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.roshan.entity.Ingredient;

@Repository
public interface IIngredientRepo extends JpaRepository<Ingredient, Long>{

}
