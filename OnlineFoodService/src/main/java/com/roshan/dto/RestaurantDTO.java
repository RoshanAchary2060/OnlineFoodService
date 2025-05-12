package com.roshan.dto;

import jakarta.persistence.Column;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDTO {

    private Long id;
    private String title;
    private String description;

    @Column(length = 1000)
    private List<String> images;
}
