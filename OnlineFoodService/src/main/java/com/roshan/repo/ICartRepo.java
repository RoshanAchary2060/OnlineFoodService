package com.roshan.repo;

import com.roshan.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICartRepo extends JpaRepository<Cart, Long> {

    Cart findByCustomerId(Long userId);
}
