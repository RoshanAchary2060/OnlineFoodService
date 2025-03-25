package com.roshan.repo;

import com.roshan.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderItemRepo extends JpaRepository<OrderItem, Long> {

}
