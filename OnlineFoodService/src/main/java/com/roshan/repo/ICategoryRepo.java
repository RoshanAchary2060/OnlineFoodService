package com.roshan.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.roshan.entity.Category;

public interface ICategoryRepo extends JpaRepository<Category, Long> {

	public List<Category> findByRestaurantId(Long id);

}
