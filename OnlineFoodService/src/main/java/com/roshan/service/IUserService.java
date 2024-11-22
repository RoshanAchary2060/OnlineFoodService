package com.roshan.service;

import com.roshan.entity.Users;

public interface IUserService {

	public Users findUserByJwtToken(String jwt) throws Exception;
	
	public Users findUserByEmail(String email) throws Exception;
}
