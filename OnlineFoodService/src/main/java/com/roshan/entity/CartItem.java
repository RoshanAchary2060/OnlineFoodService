package com.roshan.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem extends BaseEntity<Long> {

    private int quantity;
    private Long totalPrice;
    private List<String> ingredients = new ArrayList<>();

    private Long cart;

    private Long restaurant;

    @ManyToOne
//    @JsonIgnore
    private Food food;
}
