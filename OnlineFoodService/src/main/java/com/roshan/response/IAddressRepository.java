package com.roshan.response;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.roshan.entity.Address;

@Repository
public interface IAddressRepository extends JpaRepository<Address, Long> {

}
