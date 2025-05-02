package com.roshan.repo;

import com.roshan.entity.Jwt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IJwtRepo extends JpaRepository<Jwt, Long> {
    Jwt findByToken(String token);
}
