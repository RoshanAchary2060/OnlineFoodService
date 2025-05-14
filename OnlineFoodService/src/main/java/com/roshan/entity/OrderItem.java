package com.roshan.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.aspectj.apache.bcel.classfile.Module;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem extends BaseEntity<Long> {

    private int quantity;
    private Long totalPrice;
    private List<String> ingredients;
    private String orderStatus;
    private Long restaurant;

    @ManyToOne
    private Users customer;

    @ManyToOne
    private Food food;
}
