package com.roshan.repo;

import com.roshan.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepo extends JpaRepository<Users, Long> {

    Users findByEmail(String email);

}
