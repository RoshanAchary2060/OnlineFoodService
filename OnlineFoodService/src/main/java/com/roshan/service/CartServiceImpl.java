package com.roshan.service;

import com.roshan.entity.Cart;
import com.roshan.entity.CartItem;
import com.roshan.entity.Food;
import com.roshan.entity.Users;
import com.roshan.repo.ICartItemRepo;
import com.roshan.repo.ICartRepo;
import com.roshan.request.AddCartItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements ICartService {

    @Autowired
    private ICartRepo cartRepo;
    @Autowired
    private IUserService userService;
    @Autowired
    private ICartItemRepo cartItemRepo;
    @Autowired
    private IFoodService foodService;

    @Override
    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        Food food = foodService.findFoodById(req.getFoodId());
        Cart cart = cartRepo.findByCustomerId(user.getId());
        for (CartItem cartItem : cart.getItem()) {
            if (cartItem.getFood().equals(food)) {
                int newQuantity = cartItem.getQuantity() + req.getQuantity();
                return updateCardItemQuantity(cartItem.getId(), newQuantity);
            }
        }
        CartItem newCartItem = new CartItem();
        newCartItem.setFood(food);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setIngredients(req.getIngredients());
        newCartItem.setTotalPrice(req.getQuantity() * food.getPrice());

        CartItem savedCartItem = cartItemRepo.save(newCartItem);
        cart.getItem().add(savedCartItem);
        return savedCartItem;
    }

    @Override
    public CartItem updateCardItemQuantity(Long cartItemId, int quantity) throws Exception {
        Optional<CartItem> opt = cartItemRepo.findById(cartItemId);
        if (opt.isEmpty()) {
            throw new Exception("CartItem not found!");
        }
        CartItem item = opt.get();
        item.setQuantity(quantity);
        item.setTotalPrice(item.getFood().getPrice() * quantity);
        return cartItemRepo.save(item);
    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        Cart cart = cartRepo.findByCustomerId(user.getId());
        Optional<CartItem> opt = cartItemRepo.findById(cartItemId);
        if (opt.isEmpty()) {
            throw new Exception("CartItem not found!");
        }
        CartItem item = opt.get();
        cart.getItem().remove(item);
        return cartRepo.save(cart);
    }

    @Override
    public Long calculateCartTotals(Cart cart) throws Exception {
        Long total = 0L;
        for (CartItem cartItem : cart.getItem()) {
            total = cartItem.getFood().getPrice() + cartItem.getQuantity();
        }
        return total;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {
        Optional<Cart> opt = cartRepo.findById(id);
        if (opt.isEmpty()) {
            throw new Exception("Cart not found with id : " + id);
        }
        return opt.get();
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {
//		Users user = userService.findUserByJwtToken(jwt);
        Cart cart = cartRepo.findByCustomerId(userId);
        cart.setTotal(calculateCartTotals(cart));
        return cart;
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {
//		Users user = userService.findUserByJwtToken(jwt);
        Cart cart = findCartByUserId(userId);
        cart.getItem().clear();
        return cartRepo.save(cart);
    }

}
