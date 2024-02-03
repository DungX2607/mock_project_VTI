package com.anks.tech.ecommerce.repository;

import com.anks.tech.ecommerce.entity.Account;
import com.anks.tech.ecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrderRepository extends JpaRepository<Order,Integer> {

}
