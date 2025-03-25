package com.roshan.controller;

import com.roshan.entity.Orders;
import com.roshan.entity.Users;
import com.roshan.request.OrderRequest;
import com.roshan.service.IOrderService;
import com.roshan.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {
    private final IOrderService orderService;
    private final IUserService userService;

    public OrderController(IOrderService orderService, IUserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping("/order")
    public ResponseEntity<Orders> createOrder(@RequestBody OrderRequest req,
                                              @RequestHeader("Authorization") String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        Orders order = orderService.createOrder(req, user);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Orders>> getOrderHistory(
            @RequestHeader("Authorization") String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        List<Orders> orders = orderService.getUsersOrders(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
