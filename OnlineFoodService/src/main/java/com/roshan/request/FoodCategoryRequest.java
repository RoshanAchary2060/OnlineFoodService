package com.roshan.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodCategoryRequest {
    private String name;
    private Long restaurantId;
}
