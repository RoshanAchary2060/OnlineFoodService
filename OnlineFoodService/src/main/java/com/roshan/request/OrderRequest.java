package com.roshan.request;

import com.roshan.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {

//    private Long restaurantId;
    private Address deliveryAddress;
}
