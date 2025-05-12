package com.roshan.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Orders extends BaseEntity<Long> {

    private int totalItems;
    private String orderStatus;
    private Long totalPrice;

    @ManyToOne
    @JsonIgnore
    private Users customer;

//    @JsonManagedReference
//    @ManyToOne
//    private Restaurant restaurant;

    @ManyToOne
    private Address deliveryAddress;

    @OneToMany
    private List<OrderItem> items;
}
