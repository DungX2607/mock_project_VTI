package com.anks.tech.ecommerce.repository;

import com.anks.tech.ecommerce.entity.Order;
import com.anks.tech.ecommerce.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrderDetailRepository extends JpaRepository<OrderDetails, Integer> {

}
