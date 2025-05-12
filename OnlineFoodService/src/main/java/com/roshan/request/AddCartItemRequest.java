package com.roshan.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCartItemRequest {
    private long restaurantId;
    private Long foodId;
    private int quantity;
    private List<String> ingredients;
}
