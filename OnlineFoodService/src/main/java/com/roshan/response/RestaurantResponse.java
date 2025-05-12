package com.roshan.response;

import com.roshan.dto.ContactInformation;
import com.roshan.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantResponse {

    private Long id;
    private Users owner;
    private String name;
    private String description;
    private String cuisineType;
    private Address address;
    private ContactInformation contactInformation;
    private String openingHours;
    private List<Orders> orders = new ArrayList<>();
    private List<String> images;
    private LocalDateTime registrationDate;
    private boolean open;
    private List<Food> foods = new ArrayList<>();

    public static RestaurantResponse mapToDto(Restaurant entity) {
        RestaurantResponse dto = new RestaurantResponse();
        dto.setId(entity.getId());
        dto.setOwner(entity.getOwner());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setCuisineType(entity.getCuisineType());
        dto.setAddress(entity.getAddress());
        dto.setContactInformation(entity.getContactInformation());
        dto.setOpeningHours(entity.getOpeningHours());
//        dto.setOrders(entity.getOrders());
        dto.setImages(entity.getImages());
        dto.setRegistrationDate(entity.getRegistrationDate());
        dto.setOpen(entity.isOpen());
//        dto.setFoods(entity.getFoods());
        return dto;
    }
}
