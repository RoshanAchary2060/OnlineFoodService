package com.roshan.controller;

import com.roshan.config.JwtProvider;
import com.roshan.entity.Cart;
import com.roshan.entity.Users;
import com.roshan.model.USER_ROLE;
import com.roshan.repo.ICartRepo;
import com.roshan.repo.IUserRepo;
import com.roshan.request.LoginRequest;
import com.roshan.response.AuthResponse;
import com.roshan.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final PasswordEncoder encoder;
    private final JwtProvider jwtProvider;

    private final CustomUserDetailsService udService;

    private final ICartRepo cartRepo;
    private final IUserRepo userRepo;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody Users user) throws Exception {
        Users isEmailExist = userRepo.findByEmail(user.getEmail());
        if (isEmailExist != null) {
            throw new Exception("Email is already used with another account!");
        }
        Users createdUser = new Users();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setPassword(encoder.encode(user.getPassword()));
        createdUser.setRole(user.getRole());
        Users savedUser = userRepo.save(createdUser);
        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepo.save(cart);
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setRole(savedUser.getRole());
        authResponse.setMessage("Registration successful...");
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@RequestBody LoginRequest request) {
        String username = request.getEmail();
        String password = request.getPassword();
        Authentication authentication = authenticate(username, password);
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String role = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();
        String jwt = jwtProvider.generateToken(authentication);
        System.out.println("jwt:" + jwt);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Login Successful...");
        authResponse.setRole(USER_ROLE.valueOf(role));
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = udService.loadUserByUsername(username);
        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username!");
        }
        if (!encoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password!");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
