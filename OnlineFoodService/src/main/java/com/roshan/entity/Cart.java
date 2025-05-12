package com.roshan.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.roshan.response.CartItemResponse;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cart extends BaseEntity<Long> {

    private Long total = 0L;

    @OneToOne
    @JsonIgnore
    private Users customer;

    private Set<Long> cartItems = new HashSet<>();

}
