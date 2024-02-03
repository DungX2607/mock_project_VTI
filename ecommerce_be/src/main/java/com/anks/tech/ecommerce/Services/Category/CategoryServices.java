package com.anks.tech.ecommerce.Services.Category;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
public class CategoryServices implements ICategoryServices{
}
