package com.anks.tech.ecommerce.form;

import com.anks.tech.ecommerce.entity.Order;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class OrderDetailForm {


    private int productQuantity;

    private int orderId;
    private int productId;

}
