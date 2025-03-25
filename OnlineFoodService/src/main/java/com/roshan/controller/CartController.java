package com.roshan.controller;

import com.roshan.entity.Cart;
import com.roshan.entity.CartItem;
import com.roshan.entity.Users;
import com.roshan.request.AddCartItemRequest;
import com.roshan.request.UpdateCartItemRequest;
import com.roshan.service.ICartService;
import com.roshan.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CartController {
    private final ICartService cartService;

    private final IUserService userService;

    public CartController(ICartService cartService, IUserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }


    @PutMapping("/cart/add")
    public ResponseEntity<CartItem> addItemToCart(@RequestBody AddCartItemRequest req,
                                                  @RequestHeader("Authorization") String jwt) throws Exception {
        CartItem cartItem = cartService.addItemToCart(req, jwt);

        return new ResponseEntity<CartItem>(cartItem, HttpStatus.OK);
    }

    @PutMapping("/cart_item/update")
    public ResponseEntity<CartItem> updateCartItemQuantity(@RequestBody UpdateCartItemRequest req,
                                                           @RequestHeader("Authorization") String jwt) throws Exception {
        CartItem cartItem = cartService.updateCardItemQuantity(req.getCartItemId(), req.getQuantity());

        return new ResponseEntity<CartItem>(cartItem, HttpStatus.OK);
    }

    @DeleteMapping("/cart_item/{id}/remove")
    public ResponseEntity<Cart> removeCartItem(@PathVariable Long id, @RequestHeader("Authorization") String jwt)
            throws Exception {
        Cart cart = cartService.removeItemFromCart(id, jwt);

        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }

    @PutMapping("/cart/clear")
    public ResponseEntity<Cart> clearCart(@RequestHeader("Authorization") String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.clearCart(user.getId());
        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }

    @GetMapping("/cart")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.findCartByUserId(user.getId());
        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }

}
