package com.roshan.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping
    public ResponseEntity<String> homeController() {
        return ResponseEntity.ok().body("Welcome to Online Food Service Backend Application");
    }
}
