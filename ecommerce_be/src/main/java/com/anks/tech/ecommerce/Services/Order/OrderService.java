package com.anks.tech.ecommerce.Services.Order;


import com.anks.tech.ecommerce.DTO.OrderDTO;
import com.anks.tech.ecommerce.entity.Account;
import com.anks.tech.ecommerce.entity.Enum.Status;
import com.anks.tech.ecommerce.entity.Order;
import com.anks.tech.ecommerce.repository.IAccountRepository;
import com.anks.tech.ecommerce.repository.IOrderRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(rollbackFor = Exception.class)
public class OrderService implements IOrderService {



}
