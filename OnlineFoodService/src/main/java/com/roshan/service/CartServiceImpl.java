package com.roshan.service;

import com.roshan.entity.Cart;
import com.roshan.entity.CartItem;
import com.roshan.entity.Food;
import com.roshan.entity.Users;
import com.roshan.repo.ICartItemRepo;
import com.roshan.repo.ICartRepo;
import com.roshan.repo.IUserRepo;
import com.roshan.request.AddCartItemRequest;
import com.roshan.response.CartItemResponse;
import com.roshan.response.CartResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements ICartService {

    private final ICartRepo cartRepo;
    private final ICartItemRepo cartItemRepo;
    private final IUserRepo usersRepository;

    private final IFoodService foodService;
    private final IUserService userService;

    @Override
    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        Food food = foodService.findFoodById(req.getFoodId());
        Optional<CartItem> cartItem = cartItemRepo.findByFoodIdAndCart(food.getId(), req.getRestaurantId());

        if (cartItem.isPresent()) {
            CartItem existingItem = cartItem.get();

            int newQuantity = existingItem.getQuantity() + req.getQuantity();
            Long addedPrice = req.getQuantity() * food.getPrice();

            // Update cart item
            existingItem.setIngredients(req.getIngredients());
            existingItem.setQuantity(newQuantity);
            existingItem.setTotalPrice(existingItem.getTotalPrice() + addedPrice);
            return cartItemRepo.save(existingItem);
        }
        // Create new cart item
        CartItem newCartItem = new CartItem();
        newCartItem.setFood(food);
        newCartItem.setCart(user.getId());
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setIngredients(req.getIngredients());
        newCartItem.setRestaurant(req.getRestaurantId());
        Long totalPrice = req.getQuantity() * food.getPrice();
        newCartItem.setTotalPrice(totalPrice);
        return cartItemRepo.save(newCartItem);
    }


//    @Override
//    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception {
//        Users user = userService.findUserByJwtToken(jwt);
//        Food food = foodService.findFoodById(req.getFoodId());
//        Cart cart = cartRepo.findByCustomerId(user.getId());
//        Optional<CartItem>  cartItem = cartItemRepo.findByFoodId(food.getId());
//        if(cartItem.isPresent()) {
//            int newQuantity = cartItem.get().getQuantity() + req.getQuantity();
//            cartItem.get().setIngredients(req.getIngredients());
//            cartItem.get().setTotalPrice(req.getQuantity() * food.getPrice() + cartItem.get().getTotalPrice());
//            cartItem.get().setQuantity(newQuantity + cartItem.get().getQuantity() );
//            return cartItemRepo.save(cartItem.get());
//        }
//        CartItem newCartItem = new CartItem();
//        newCartItem.setFood(food);
//        newCartItem.setCart(cart.getId());
//        newCartItem.setQuantity(req.getQuantity());
//        newCartItem.setIngredients(req.getIngredients());
//        newCartItem.setTotalPrice(req.getQuantity() * food.getPrice());
//        CartItem savedCartItem = cartItemRepo.save(newCartItem);
//        cart.getCartItems().add(savedCartItem.getId());
//        cartRepo.save(cart);
//        return savedCartItem;
//    }

//    @Override
//    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception {
//        Users user = userService.findUserByJwtToken(jwt);
//        Food food = foodService.findFoodById(req.getFoodId());
//        Cart cart = cartRepo.findByCustomerId(user.getId());
//        for (CartItem cartItem : cart.getItem()) {
//            if (cartItem.getFood().equals(food)) {
//                int newQuantity = cartItem.getQuantity() + req.getQuantity();
//                return updateCardItemQuantity(cartItem.getId(), newQuantity);
//            }
//        }
//        CartItem newCartItem = new CartItem();
//        newCartItem.setFood(food);
//        newCartItem.setCart(cart);
//        newCartItem.setQuantity(req.getQuantity());
//        newCartItem.setIngredients(req.getIngredients());
//        newCartItem.setTotalPrice(req.getQuantity() * food.getPrice());
//
//        CartItem savedCartItem = cartItemRepo.save(newCartItem);
//        cart.getItem().add(savedCartItem);
//        return savedCartItem;
//    }

    @Override
    public CartResponse updateCardItemQuantity(Long cartItemId, int quantity) throws Exception {
        Optional<CartItem> opt = cartItemRepo.findById(cartItemId);
        if (opt.isEmpty()) {
            throw new Exception("CartItem not found!");
        }
        CartItem item = opt.get();
        item.setQuantity(quantity);
        item.setTotalPrice(item.getFood().getPrice() * quantity);
        cartItemRepo.save(item);
        List<CartItem> cartItems = cartItemRepo.findByCart(item.getCart());
        CartResponse cartResponse = new CartResponse();
        cartResponse.setId(item.getCart());
        Users user = usersRepository.findById(item.getCart()).get();
        cartResponse.setCustomer(user);
        long total = 0L;
        for(CartItem item2 : cartItems){
            total = total + item2.getTotalPrice();
        }
        cartResponse.setTotal(total);
        cartResponse.setItem(cartItems);
        return cartResponse;
    }

    @Override
    public CartResponse removeItemFromCart(Long cartItemId, String jwt) throws Exception {
        Users user = userService.findUserByJwtToken(jwt);
        Optional<CartItem> opt = cartItemRepo.findById(cartItemId);
        if (opt.isEmpty()) {
            throw new Exception("CartItem not found!");
        }
        CartItem item = opt.get();
        cartItemRepo.deleteById(cartItemId);
        List<CartItem> cartItems = cartItemRepo.findByCart(user.getId());
        CartResponse cartResponse = new CartResponse();
        cartResponse.setId(user.getId());
        cartResponse.setCustomer(user);
        long total = 0L;
        for(CartItem item2 : cartItems){
            total = total + item2.getTotalPrice();
        }
        cartResponse.setTotal(total);
        cartResponse.setItem(cartItems);
        return cartResponse;
    }

    @Override
    public CartResponse findCartById(Long id) throws Exception {
        Optional<Cart> opt = cartRepo.findById(id);
        if (opt.isEmpty()) {
            throw new Exception("Cart not found with id : " + id);
        }
        return CartResponse.mapToDto(opt.get());
    }

    @Override
    public Cart findCartByUserId(Long userId) {
        return cartRepo.findByCustomerId(userId);
    }

    @Override
    public CartResponse clearCart(Long userId) {
        Cart cart = cartRepo.findByCustomerId(userId);
//        cart.getItems().clear();
        return CartResponse.mapToDto(cartRepo.save(cart));
    }
}
