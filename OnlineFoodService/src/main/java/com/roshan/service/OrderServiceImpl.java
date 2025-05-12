package com.roshan.service;

import com.roshan.entity.*;
import com.roshan.repo.*;
import com.roshan.request.OrderRequest;
import com.roshan.response.CartItemResponse;
import com.roshan.response.OrdersResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {

    private final IOrderRepo orderRepo;
    private final IOrderItemRepo orderItemRepo;
    private final IAddressRepository addressRepository;
    private final IUserRepo userRepo;
    private final IRestaurantService restaurantService;
    private final ICartRepo cartRepo;
    private final ICartItemRepo cartItemRepo;

    @Override
    public OrdersResponse createOrder(OrderRequest order, Users user) throws Exception {
        Address shipingAddress = order.getDeliveryAddress();
        Address savedAddress = addressRepository.save(shipingAddress);
//        if (!user.getAddresses().contains(savedAddress)) {
//            user.getAddresses().add(savedAddress);
//            userRepo.save(user);
//        }
        Orders createdOrder = new Orders();
        createdOrder.setCustomer(user);
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setDeliveryAddress(savedAddress);

        List<CartItem> cartItems = cartItemRepo.findByCart(user.getId());
        List<OrderItem> orderItems = new ArrayList<>();
        cartItems.forEach(cartItem -> {
            orderItems.add(new OrderItem(cartItem.getQuantity(), cartItem.getTotalPrice(), cartItem.getIngredients(),"PENDING", cartItem.getRestaurant(), user, cartItem.getFood()));
        });
        createdOrder.setItems(orderItems);
        createdOrder.setTotalItems(orderItems.size());
        createdOrder.setTotalPrice(2 + orderItems.stream().mapToLong(OrderItem::getTotalPrice).sum() );
        orderItemRepo.saveAll(orderItems);
        Orders savedOrder = orderRepo.save(createdOrder);
        cartItemRepo.deleteAll();
        return OrdersResponse.mapToDto(savedOrder);
    }

    @Override
    public Orders updateOrder(Long orderId, String orderStatus) throws Exception {
        Orders order = findOrderById(orderId);
        if (orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED") || orderStatus.equals("COMPLETED") || orderStatus.equals("PENDING")) {
            order.setOrderStatus(orderStatus);
            return orderRepo.save(order);
        }
        throw new Exception("Please select a valid order status!");
    }

    @Override
    public void cancelOrder(Long orderId) {
        orderRepo.deleteById(orderId);
    }

    @Override
    public List<Orders> getUsersOrders(Long userId) {
        return orderRepo.findByCustomerId(userId);
    }

    @Override
    public List<OrderItem> getRestaurantOrders(Long restaurantId, String orderStatus) {

        List<OrderItem> orderItems = orderItemRepo.findByRestaurantOrderByIdAsc(restaurantId);
        if(orderStatus == null || orderStatus.equals("ALL") )
        {
            return orderItems;
        }
        return orderItems.stream()
                .filter(orderItem -> orderItem.getOrderStatus().equals(orderStatus))
                .collect(Collectors.toList());
    }

    @Override
    public Orders findOrderById(Long orderId) throws Exception {
        Optional<Orders> order = orderRepo.findById(orderId);
        if (order.isEmpty()) {
            throw new Exception("Order not found!");
        }
        return order.get();
    }
}
