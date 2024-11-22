package com.roshan.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.roshan.entity.Users;

public interface IUserRepo extends JpaRepository<Users, Long> {
	
	Users findByEmail(String email);
	
}
