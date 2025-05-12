package com.roshan.service;

import com.roshan.entity.Users;

public interface IUserService {

    Users findUserByJwtToken(String jwt) throws Exception;

    Users findUserByEmail(String email) throws Exception;
}
