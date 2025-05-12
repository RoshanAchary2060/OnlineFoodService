package com.roshan.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateFoodRequest {

    private String name;
    private String description;
    private Long price;
    private Long categoryId;
    private List<String> images;
    private Long restaurantId;
    private boolean vegetarian;
    private boolean isNonVeg;
    private boolean seasonal;
    private List<Long> ingredientsIds;
}
