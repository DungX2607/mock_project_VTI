package com.anks.tech.ecommerce.repository;

import com.anks.tech.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductRepository extends JpaRepository<Product,Integer> {
}
