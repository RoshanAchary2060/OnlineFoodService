package com.roshan.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ingredient extends BaseEntity<Long> {

    private String name;
    private boolean inStock = true;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private IngredientCategory category;

    @ManyToOne
    @JsonIgnore
    private Restaurant restaurant;
}
