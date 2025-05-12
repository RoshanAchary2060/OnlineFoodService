package com.roshan.response;

import com.roshan.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrdersResponse {
    private Long id;
    private Users customer;
    private Restaurant restaurant;
    private String orderStatus;
    private LocalDateTime createdAt;
    private Address deliveryAddress;
    private List<OrderItem> items;
    private int totalItems;
    private Long totalPrice;

    public static OrdersResponse mapToDto(Orders order) {
        OrdersResponse dto = new OrdersResponse();
        dto.setId(order.getId());
        dto.setCustomer(order.getCustomer());
//        dto.setRestaurant(order.getRestaurant());
        dto.setOrderStatus(order.getOrderStatus());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setDeliveryAddress(order.getDeliveryAddress());
        dto.setItems(order.getItems());
        dto.setTotalItems(order.getTotalItems());
        dto.setTotalPrice(order.getTotalPrice());
        return dto;
    }
}
