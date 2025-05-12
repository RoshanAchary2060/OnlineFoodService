package com.roshan.service;

import com.roshan.config.JwtProvider;
import com.roshan.entity.Users;
import com.roshan.repo.IUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final IUserRepo userRepo;

    private final JwtProvider provider;

    @Override
    public Users findUserByJwtToken(String jwt) throws Exception {
        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }
        String email = provider.getEmailFromJwtToken(jwt);
        return findUserByEmail(email);
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
