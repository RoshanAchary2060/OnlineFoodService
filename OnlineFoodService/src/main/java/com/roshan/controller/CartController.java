package com.roshan.controller;

import com.roshan.entity.Cart;
import com.roshan.entity.CartItem;
import com.roshan.entity.Users;
import com.roshan.repo.ICartItemRepo;
import com.roshan.request.AddCartItemRequest;
import com.roshan.request.UpdateCartItemRequest;
import com.roshan.response.CartItemResponse;
import com.roshan.response.CartResponse;
import com.roshan.service.ICartService;
import com.roshan.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CartController {

    private final ICartService cartService;
    private final IUserService userService;
    private final ICartItemRepo iCartItemRepo;

    @PutMapping("/cart/add")
    public ResponseEntity<CartItem> addItemToCart(@RequestBody AddCartItemRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        CartItem cartItem = cartService.addItemToCart(req, jwt);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @PutMapping("/cart_item/update")
    public ResponseEntity<CartResponse> updateCartItemQuantity(@RequestBody UpdateCartItemRequest req) throws Exception {
        CartResponse cartItem = cartService.updateCardItemQuantity(req.getCartItemId(), req.getQuantity());
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @DeleteMapping("/cart_item/{id}/remove")
    public ResponseEntity<CartResponse> removeCartItem(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {
        CartResponse cart = cartService.removeItemFromCart(id, jwt);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PutMapping("/cart/clear")
    public ResponseEntity<CartResponse> clearCart(@RequestHeader("Authorization") String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        CartResponse cart = cartService.clearCart(user.getId());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/cart")
    public ResponseEntity<CartResponse> findUserCart(@RequestHeader("Authorization") String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
//        Cart cart = cartService.findCartByUserId(user.getId());
        List<CartItem> cartItems = iCartItemRepo.findByCart(user.getId());
//        Set<Long> cartItemset = cart.getCartItems();
//        List<CartItem> cartItems = new ArrayList<>();
//        for (Long cartItemId : cartItemset) {
//            CartItem c = iCartItemRepo.findById(cartItemId).get();
//            cartItems.add(c);
//        }
        CartResponse cartResponse = new CartResponse();
        cartResponse.setId(user.getId());
        cartResponse.setCustomer(user);
        Long total = 0L;
        for(CartItem item : cartItems){
            total = total + item.getTotalPrice();
        }
        cartResponse.setTotal(total);
        cartResponse.setItem(cartItems);
        return new ResponseEntity<>(cartResponse, HttpStatus.OK);
    }
}
