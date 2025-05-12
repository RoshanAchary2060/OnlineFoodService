package com.roshan.controller;

import com.roshan.entity.OrderItem;
import com.roshan.entity.Orders;
import com.roshan.repo.IOrderItemRepo;
import com.roshan.service.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminOrderController {

    private final IOrderService orderService;

    private final IOrderItemRepo orderItemRepo;



    @GetMapping("/order/restaurant/{id}")
    public ResponseEntity<List<OrderItem>> getOrderHistory(@PathVariable Long id, @RequestParam(required = false) String order_status) throws Exception {
        List<OrderItem> orders = orderService.getRestaurantOrders(id, order_status);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @Transactional
    @PutMapping("/order/{orderId}/{orderStatus}/{restaurantId}")
    public ResponseEntity<List<OrderItem>> updateOrderStatus(@PathVariable Long orderId, @PathVariable String orderStatus, @PathVariable Long restaurantId) throws Exception {
        orderItemRepo.updateStatus(orderId, orderStatus);
        List<OrderItem> orders = orderItemRepo.findByRestaurantOrderByIdAsc(restaurantId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
