package com.roshan.service;

import com.roshan.entity.*;
import com.roshan.repo.IOrderItemRepo;
import com.roshan.repo.IOrderRepo;
import com.roshan.repo.IUserRepo;
import com.roshan.request.OrderRequest;
import com.roshan.response.IAddressRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements IOrderService {
    final IOrderRepo orderRepo;
    final IOrderItemRepo orderItemRepo;
    final IAddressRepository addressRepository;
    final IUserRepo userRepo;
    final IRestaurantService restaurantService;
    final ICartService cartService;

    public OrderServiceImpl(IOrderRepo orderRepo, IOrderItemRepo orderItemRepo, IAddressRepository addressRepository, IUserRepo userRepo, IRestaurantService restaurantService, ICartService cartService) {
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.addressRepository = addressRepository;
        this.userRepo = userRepo;
        this.restaurantService = restaurantService;
        this.cartService = cartService;
    }

    @Override
    public Orders createOrder(OrderRequest order, Users user) throws Exception {
        Address shipingAddress = order.getDeliveryAddress();
        Address savedAddress = addressRepository.save(shipingAddress);
        if (!user.getAddresses().contains(savedAddress)) {
            user.getAddresses().add(savedAddress);
            userRepo.save(user);
        }
        Restaurant restaurant = restaurantService.findRestaurantById(order.getRestaurantId());
        Orders createdOrder = new Orders();
        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setRestaurant(restaurant);

        Cart cart = cartService.findCartByUserId(user.getId());
        List<OrderItem> orderItems = new ArrayList<OrderItem>();
        for (CartItem cartItem : cart.getItem()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setFood(cartItem.getFood());
            orderItem.setIngredients(cartItem.getIngredients());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotalPrice());
            OrderItem savedOrderItem = orderItemRepo.save(orderItem);
            orderItems.add(savedOrderItem);
        }
        Long totalPrice = cartService.calculateCartTotals(cart);
        createdOrder.setItems(orderItems);
        createdOrder.setTotalPrice(totalPrice);
        Orders savedOrder = orderRepo.save(createdOrder);
        restaurant.getOrders().add(savedOrder);
        return createdOrder;
    }

    @Override
    public Orders updateOrder(Long orderId, String orderStatus) throws Exception {
        Orders order = findOrderById(orderId);
        if (
                orderStatus.equals("OUT_FOR_DELIVERY")
                        || orderStatus.equals("DELIVERED")
                        || orderStatus.equals("COMPLETED")
                        || orderStatus.equals("PENDING")) {
            order.setOrderStatus(orderStatus);
            return orderRepo.save(order);
        }
        throw new Exception("Please select a valid order status!");
    }

    @Override
    public void cancelOrder(Long orderId) throws Exception {
        Orders order = findOrderById(orderId);
        orderRepo.deleteById(orderId);
    }

    @Override
    public List<Orders> getUsersOrders(Long userId) throws Exception {
        return orderRepo.findByCustomerId(userId);
    }

    @Override
    public List<Orders> getRestaurantOrders(Long restaurantId, String orderStatus) throws Exception {
        List<Orders> orders = orderRepo.findByRestaurantId(restaurantId);
        if (orderStatus != null) {
            orders = orders
                    .stream().
                    filter(order -> order.getOrderStatus().equals(orderStatus)).toList();
        }
        return orders;
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
