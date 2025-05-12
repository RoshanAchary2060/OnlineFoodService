package com.roshan.response;

import com.roshan.entity.Cart;
import com.roshan.entity.CartItem;
import com.roshan.entity.Users;
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
public class CartResponse {
    private Long id;
    private Users customer;
    private Long total;
    private List<CartItem> item = new ArrayList<>();

    public static CartResponse mapToDto(Cart cart) {
        CartResponse dto = new CartResponse();
        dto.setId(cart.getId());
        dto.setCustomer(cart.getCustomer());
        dto.setTotal(cart.getTotal());
//        dto.setItem(cart.getItem());
        return dto;
    }
}
