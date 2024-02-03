package com.anks.tech.ecommerce.Services.customer;


import com.anks.tech.ecommerce.entity.Order;
import com.anks.tech.ecommerce.entity.OrderDetails;
import com.anks.tech.ecommerce.form.CustomerForm;
import com.anks.tech.ecommerce.form.OrderDetailForm;
import com.anks.tech.ecommerce.repository.ICustomersRepository;
import com.anks.tech.ecommerce.repository.IOrderDetailRepository;
import com.anks.tech.ecommerce.repository.IOrderRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.anks.tech.ecommerce.entity.Customers;

import java.util.List;
import java.util.stream.Collectors;



@Service
@Transactional(rollbackFor = Exception.class)
public class CustomerServices implements ICustomerServices{
    @Autowired
    private ICustomersRepository customersRepository;

    @Autowired
    private IOrderDetailRepository orderDetailRepository;
    @Autowired
    private IOrderRepository orderRepository;

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public Page<Customers> getAllCustomer(Pageable pageable) {
        return customersRepository.findAll(pageable);
    }

    @Override
    public Customers getCustomerById(int id) {
        return null;
    }

    @Override
    public void createOder(CustomerForm form) {
        TypeMap typeMap = modelMapper.getTypeMap(CustomerForm.class, Customers.class);
        if(typeMap==null){
            modelMapper.addMappings(new PropertyMap<CustomerForm, Customers>() {
                @Override
                protected void configure() {
                    skip(destination.getCustomersId());
                }
            });
        }

        Customers customers = modelMapper.map(form, Customers.class);
        customersRepository.save(customers);


        Order order = modelMapper.map(form.getOrderForm(),Order.class);
        order.setCustomers(customers);
        orderRepository.save(order);

//
        List<OrderDetailForm> orderDetailForms = form.getOrderForm().getOrderDetailForms();


        List<OrderDetails> orderDetails = orderDetailForms.stream().map(orderDetail -> modelMapper.map(orderDetail,OrderDetails.class)).collect(Collectors.toList());
//        orderDetailRepository.saveAll(orderDetails);
        orderDetails.forEach(orderDetails1 -> orderDetails1.setOrder(order));
        orderDetailRepository.saveAll(orderDetails);

    }

}
