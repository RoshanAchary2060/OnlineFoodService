package com.roshan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.roshan.entity.Users;
import com.roshan.service.IUserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private IUserService userService;

	@GetMapping("/profile")
	public ResponseEntity<Users> findUserByJwtToken(@RequestHeader("Authorization") String jwt) throws Exception {
		Users user = userService.findUserByJwtToken(jwt);

		return new ResponseEntity<>(user, HttpStatus.OK);
	}
}
