package com.roshan.service;

import com.roshan.entity.Cart;
import com.roshan.entity.CartItem;
import com.roshan.request.AddCartItemRequest;
import com.roshan.response.CartItemResponse;
import com.roshan.response.CartResponse;

public interface ICartService {

    CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception;

    CartResponse updateCardItemQuantity(Long cartItemId, int quantity) throws Exception;

    CartResponse removeItemFromCart(Long cartItemId, String jwt) throws Exception;

    CartResponse findCartById(Long id) throws Exception;

    Cart findCartByUserId(Long userId) throws Exception;

    CartResponse clearCart(Long userId) throws Exception;
}
