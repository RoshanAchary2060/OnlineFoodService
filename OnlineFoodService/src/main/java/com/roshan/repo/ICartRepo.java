package com.roshan.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.roshan.entity.Cart;

@Repository
public interface ICartRepo extends JpaRepository<Cart, Long>{

}
