package com.roshan.repo;

import com.roshan.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICartItemRepo extends JpaRepository<CartItem, Long> {


}
