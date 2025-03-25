package com.roshan.repo;

import com.roshan.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICategoryRepo extends JpaRepository<Category, Long> {

    public List<Category> findByRestaurantId(Long id);

}
