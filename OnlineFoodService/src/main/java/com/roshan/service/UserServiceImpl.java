package com.roshan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.roshan.config.JwtProvider;
import com.roshan.entity.Users;
import com.roshan.repo.IUserRepo;

@Service
public class UserServiceImpl implements IUserService {

	@Autowired
	IUserRepo userRepo;

	@Autowired
	private JwtProvider provider;

	@Override
	public Users findUserByJwtToken(String jwt) throws Exception {
		String email = provider.getEmailFromJwtToken(jwt);
		Users user = findUserByEmail(email);
		return user;

	}

	@Override
	public Users findUserByEmail(String email) throws Exception {
		Users user = userRepo.findByEmail(email);
		if (user == null) {
			throw new Exception("User not found!");
		}
		return user;
	}
}
