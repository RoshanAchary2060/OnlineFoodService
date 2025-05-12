package com.roshan.response;

import com.roshan.entity.Cart;
import com.roshan.entity.CartItem;
import com.roshan.entity.Food;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartItemResponse {

    private Long id;
    private Long cartId;
    private Food food;
    private int quantity;
    private List<String> ingredients = new ArrayList<>();
    private Long totalPrice;

    public static CartItemResponse mapToDto(CartItem entity) {
        CartItemResponse dto = new CartItemResponse();
        dto.setId(entity.getId());
        dto.setCartId(entity.getCart());
        dto.setFood(entity.getFood());
        dto.setQuantity(entity.getQuantity());
        dto.setIngredients(entity.getIngredients());
        dto.setTotalPrice(entity.getTotalPrice());
        return dto;
    }
}
