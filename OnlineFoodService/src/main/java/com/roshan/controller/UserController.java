package com.roshan.controller;

import com.roshan.entity.FavoriteRestaurant;
import com.roshan.entity.Restaurant;
import com.roshan.entity.Users;
import com.roshan.repo.IFavoriteRestaurantRepo;
import com.roshan.repo.IRestaurantRepo;
import com.roshan.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    private final IFavoriteRestaurantRepo favoriteRestaurantRepo;
    private final IRestaurantRepo restaurantRepo;;

    @GetMapping("/profile")
    public ResponseEntity<Users> findUserByJwtToken(@RequestHeader("Authorization") String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<Restaurant>> getAllUsersFavorites(@RequestHeader("Authorization") String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        List<FavoriteRestaurant> fav = favoriteRestaurantRepo.findByUserId(user.getId());
        List<Restaurant> restaurants = new ArrayList<>();

        for (FavoriteRestaurant fr : fav) {
            restaurantRepo.findById(fr.getRestaurantId())
                    .ifPresent(restaurants::add);
        }
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

}
