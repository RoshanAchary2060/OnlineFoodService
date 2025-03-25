package com.roshan.repo;

import com.roshan.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrderRepo extends JpaRepository<Orders, Long> {


    public List<Orders> findByCustomerId(Long userId);

    public List<Orders> findByRestaurantId(Long restaurantId);
}
