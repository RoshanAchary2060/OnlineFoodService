package com.roshan.controller;

import com.roshan.entity.OrderItem;
import com.roshan.entity.Orders;
import com.roshan.entity.Users;
import com.roshan.repo.IOrderItemRepo;
import com.roshan.request.OrderRequest;
import com.roshan.response.OrdersResponse;
import com.roshan.service.IOrderService;
import com.roshan.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OrderController {

    private final IOrderService orderService;
    private final IUserService userService;

    private final IOrderItemRepo orderItemRepo;

    @PostMapping("/order")
    public ResponseEntity<OrdersResponse> createOrder(@RequestBody OrderRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        OrdersResponse order = orderService.createOrder(req, user);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

//    @GetMapping("/order/restaurant/{id}")
//    public ResponseEntity<List<OrderItem>> getOrderHistory(@PathVariable Long id, @RequestParam(required = false) String order_status) throws Exception {
//        List<OrderItem> orders = orderService.getRestaurantOrders(id, order_status);
//        return new ResponseEntity<>(orders, HttpStatus.OK);
//    }

    @GetMapping("/order/user")
    public ResponseEntity<List<OrderItem>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        List<OrderItem> orders = orderItemRepo.findByCustomerId(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
