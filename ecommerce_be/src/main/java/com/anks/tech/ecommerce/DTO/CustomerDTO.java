package com.anks.tech.ecommerce.DTO;

import com.anks.tech.ecommerce.entity.Enum.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor

public class CustomerDTO {
    private int customersId;
    private String fullName;
    private String email;
    private String phone;

    private String address;
    private String city;

    List<OrderDTO> orders;

}
