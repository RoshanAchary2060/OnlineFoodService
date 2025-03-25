package com.roshan.controller;

import com.roshan.entity.Orders;
import com.roshan.service.IOrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    private final IOrderService orderService;
//    private final IUserService userService;

    public AdminOrderController(IOrderService orderService
//            , IUserService userService
    ) {
        this.orderService = orderService;
//        this.userService = userService;
    }

    @GetMapping("/order/restaurant/{id}")
    public ResponseEntity<List<Orders>> getOrderHistory(@PathVariable Long id,
                                                        @RequestParam(required = false) String order_status
//            , @RequestHeader("Authorization") String jwt
    ) throws Exception {
//        Users user = userService.findUserByJwtToken(jwt);
        List<Orders> orders = orderService.getRestaurantOrders(id, order_status);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/order/{orderId}/{orderStatus}")
    public ResponseEntity<Orders> updateOrderStatus(@PathVariable Long orderId,
                                                    @PathVariable String orderStatus
//                                                       , @RequestHeader("Authorization") String jwt
    ) throws Exception {
//        Users user = userService.findUserByJwtToken(jwt);
        Orders order = orderService.updateOrder(orderId, orderStatus);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
