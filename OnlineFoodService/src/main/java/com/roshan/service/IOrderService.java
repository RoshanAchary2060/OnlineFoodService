package com.roshan.service;

import com.roshan.entity.Orders;
import com.roshan.entity.Users;
import com.roshan.request.OrderRequest;

import java.util.List;

public interface IOrderService {

    public Orders createOrder(OrderRequest order, Users user) throws Exception;

    public Orders updateOrder(Long orderId, String orderStatus) throws Exception;

    public void cancelOrder(Long orderId) throws Exception;

    public List<Orders> getUsersOrders(Long userId) throws Exception;

    public List<Orders> getRestaurantOrders(Long restaurantId, String orderStatus) throws Exception;

    public Orders findOrderById(Long orderId) throws Exception;
}
