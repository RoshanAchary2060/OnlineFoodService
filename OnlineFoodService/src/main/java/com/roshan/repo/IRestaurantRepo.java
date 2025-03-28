package com.roshan.repo;

import com.roshan.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRestaurantRepo extends JpaRepository<Restaurant, Long> {

    Restaurant findByOwnerId(Long userId);

    @Query("SELECT r FROM Restaurant r WHERE lower(r.name) LIKE lower(concat('%',:query,'%'))"
            + " OR lower(r.cuisineType) LIKE " + "lower(concat('%',:query,'%'))")
    List<Restaurant> findBySearchQuery(String query);
}
