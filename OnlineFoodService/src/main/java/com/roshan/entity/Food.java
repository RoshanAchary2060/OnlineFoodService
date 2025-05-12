package com.roshan.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.roshan.entity.BaseEntity;
import com.roshan.entity.Category;
import com.roshan.entity.Ingredient;
import com.roshan.entity.Restaurant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class Food extends BaseEntity<Long> {

    @EqualsAndHashCode.Include
    private String name;
    private String description;
    private Long price;

    private Long foodCategoryId;

    private Long restaurantId;

    @ManyToMany
    private List<Ingredient> ingredients = new ArrayList<>();

    private Date creationDate;
    private boolean available = true;
    private boolean isVegetarian;
    private boolean isNonVeg;
    private boolean isSeasonal;

    @ElementCollection
    @Column(length = 1000)
    private List<String> images;
}
