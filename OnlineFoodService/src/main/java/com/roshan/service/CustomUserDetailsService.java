package com.roshan.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.roshan.entity.Users;
import com.roshan.model.USER_ROLE;
import com.roshan.repo.IUserRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
	private IUserRepo repo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Users user = repo.findByEmail(username);
		if (user != null) {
			USER_ROLE role = user.getRole();
			if (role == null) {
				role = USER_ROLE.ROLE_CUSTOMER;

			}
			List<GrantedAuthority> authorities = new ArrayList<>();
			authorities.add(new SimpleGrantedAuthority(role.toString()));
			return new User(user.getEmail(), user.getPassword(),
					authorities);

		} else {
			throw new UsernameNotFoundException("User not found with email " + username);
		}
	}
}
