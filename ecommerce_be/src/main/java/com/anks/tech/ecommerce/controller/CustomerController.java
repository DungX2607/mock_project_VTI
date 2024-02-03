package com.anks.tech.ecommerce.controller;

import com.anks.tech.ecommerce.DTO.CustomerDTO;
import com.anks.tech.ecommerce.Services.customer.ICustomerServices;
import com.anks.tech.ecommerce.form.CustomerForm;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.anks.tech.ecommerce.entity.Customers;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/customer")
@ResponseBody
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:3000", "http://localhost:3001"})

public class CustomerController {

    @Autowired

    private ICustomerServices customerServices;

    @Autowired
    private  ModelMapper modelMapper;
    @GetMapping("/hello")
    ResponseEntity<String> hello(){
        return ResponseEntity.ok().body("hello");
    }

    @GetMapping("/all-customer")
    public ResponseEntity<Page<CustomerDTO>> getAllCustomer(Pageable pageable){
        Page<Customers> customersPage = customerServices.getAllCustomer(pageable);
        List<Customers> customers = customersPage.getContent();
        List<CustomerDTO> customerDTOS = customers.stream().map(customer -> modelMapper.map(customer, CustomerDTO.class)).collect(Collectors.toList());


        return ResponseEntity.ok().body(new PageImpl<>(customerDTOS,pageable,customersPage.getTotalElements()));
    }

    @PostMapping("/new-order")
    public ResponseEntity<String> createOrder(@RequestBody CustomerForm form){

        customerServices.createOder(form);

        return ResponseEntity.ok().body("create order successfully!");
    }
}
