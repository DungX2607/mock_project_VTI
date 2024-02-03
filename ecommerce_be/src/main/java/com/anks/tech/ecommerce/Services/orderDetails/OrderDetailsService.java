package com.anks.tech.ecommerce.Services.orderDetails;

import com.anks.tech.ecommerce.entity.Order;
import com.anks.tech.ecommerce.entity.OrderDetails;
import com.anks.tech.ecommerce.repository.IOrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class OrderDetailsService implements IOrderDetailsService {

}
