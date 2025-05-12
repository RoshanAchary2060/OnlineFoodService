package com.roshan.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Category extends BaseEntity<Long> {

    private String name;

//    @OneToMany(mappedBy = "foodCategory")
//    @JsonManagedReference("food-category")  // Matches food's back reference
//    private List<Food> foods;

    @JsonIgnore
    @ManyToOne
    private Restaurant restaurant;
}
