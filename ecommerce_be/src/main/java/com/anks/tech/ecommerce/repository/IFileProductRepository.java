package com.anks.tech.ecommerce.repository;

import com.anks.tech.ecommerce.entity.FileProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFileProductRepository extends JpaRepository<FileProduct, String> {
}
