package com.roshan.controller;

import com.roshan.repo.IJwtRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jwt")
public class JwtController {
    private IJwtRepo jwtRepo;
    public JwtController(IJwtRepo jwtRepo) {
        this.jwtRepo = jwtRepo;
    }

    @GetMapping()
    ResponseEntity<String> getJwtToken() {
        System.out.println("In getJwtToken controller");
        return jwtRepo.findAll().stream().findFirst().map(jwt -> ResponseEntity.ok().body(jwt.getToken())).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping
    public ResponseEntity<Void> clearJwtToken() {
        System.out.println("In clearJwtToken controller");
        jwtRepo.deleteAll();
        return ResponseEntity.ok().build();
    }
}
