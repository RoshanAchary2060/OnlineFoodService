package com.roshan.repo;

import com.roshan.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ICartItemRepo extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCart(Long cartId);
    Optional<CartItem> findByFoodIdAndRestaurant(Long foodId, Long restaurantId);
    Optional<CartItem> findByFoodIdAndCart(Long foodId, Long cartId);

    @Modifying
    @Query("DELETE FROM CartItem")
    void deleteAll();
}
