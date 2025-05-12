package com.roshan.entity;

import com.fasterxml.jackson.annotation.*;
import com.roshan.dto.ContactInformation;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Restaurant extends BaseEntity<Long> {

    private String name;
    private String description;
    private String cuisineType;
    private LocalDateTime registrationDate;
    private boolean open = true;
    private String openingHours;

    @Embedded
    private ContactInformation contactInformation;

    @ElementCollection(fetch = FetchType.EAGER)
    @Column(length = 1000)
    private List<String> images;

    @OneToOne(cascade = CascadeType.REMOVE)
    private Users owner;

    @OneToOne(cascade = CascadeType.REMOVE)
    private Address address;

//    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.REMOVE, orphanRemoval = true)
//    @JsonBackReference
//    @JsonIgnore
//    private List<Orders> orders = new ArrayList<>();

//    @OneToMany(mappedBy = "restaurant")
//    @JsonManagedReference("food-restaurant")  // Matches food's back reference
//    private List<Food> foods;
}
