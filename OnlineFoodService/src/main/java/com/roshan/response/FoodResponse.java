package com.roshan.response;

import com.roshan.entity.Category;
import com.roshan.entity.Ingredient;
import com.roshan.entity.Restaurant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class FoodResponse {

    private Long id;
    private String name;
    private String description;
    private Long price;
    private Category foodCategory;
    private List<String> images;
    private boolean available;
    private Restaurant restaurant;
    private boolean isVegetarian;
    private boolean isNonVeg;
    private boolean isSeasonal;
    private List<Ingredient> ingredients = new ArrayList<>();
    private Date creationDate;
}
