package com.roshan.repo;

import com.roshan.entity.OrderItem;
import com.roshan.entity.Restaurant;
import jakarta.transaction.Transactional;
import org.hibernate.query.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IOrderItemRepo extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByRestaurantOrderByIdAsc(Long restaurantId);

    List<OrderItem> findByCustomerId(Long userId);

    @Modifying
    @Transactional
    @Query("UPDATE OrderItem o SET o.orderStatus = :orderStatus WHERE o.id = :itemId")
    void updateStatus(Long itemId, String orderStatus);

}
