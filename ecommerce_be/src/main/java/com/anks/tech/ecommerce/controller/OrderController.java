package com.anks.tech.ecommerce.controller;

import com.anks.tech.ecommerce.Services.Account.AccountService;
import com.anks.tech.ecommerce.Services.Order.OrderService;
import com.anks.tech.ecommerce.Services.orderDetails.OrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private AccountService accountService;
    @Autowired
    private OrderDetailsService orderDetailsService;

}
