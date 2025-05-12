package com.roshan.repo;

import com.roshan.entity.FavoriteRestaurant;
import com.roshan.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IFavoriteRestaurantRepo extends JpaRepository<FavoriteRestaurant, Long> {

    List<FavoriteRestaurant> findByUserId(Long userId);

    Optional<FavoriteRestaurant> findByUserIdAndRestaurantId(Long userId, Long restaurantId);
}
