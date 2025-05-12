package com.roshan.service;

import com.roshan.entity.OrderItem;
import com.roshan.entity.Orders;
import com.roshan.entity.Users;
import com.roshan.request.OrderRequest;
import com.roshan.response.OrdersResponse;
import java.util.List;

public interface IOrderService {

    OrdersResponse createOrder(OrderRequest order, Users user) throws Exception;

    Orders updateOrder(Long orderId, String orderStatus) throws Exception;

    void cancelOrder(Long orderId) throws Exception;

    List<Orders> getUsersOrders(Long userId) throws Exception;

    List<OrderItem> getRestaurantOrders(Long restaurantId, String orderStatus) throws Exception;

    Orders findOrderById(Long orderId) throws Exception;
}
