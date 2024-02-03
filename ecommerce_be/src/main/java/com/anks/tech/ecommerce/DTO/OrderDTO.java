package com.anks.tech.ecommerce.DTO;

import com.anks.tech.ecommerce.entity.Enum.Status;
import com.anks.tech.ecommerce.entity.OrderDetails;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class OrderDTO {
    private int orderId;
    private Status status;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date orderDate;
    private double totalPrice;
    private String paymentMethod;
    private List<OrderDetailDTO> orderDetails;

}

