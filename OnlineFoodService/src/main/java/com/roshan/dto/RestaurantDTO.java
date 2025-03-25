package com.roshan.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor

public class RestaurantDTO {


    private Long id;

    private String title;

    @Column(length = 1000)
    private List<String> images;

    private String description;


}
