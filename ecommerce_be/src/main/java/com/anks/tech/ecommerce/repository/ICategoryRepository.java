package com.anks.tech.ecommerce.repository;

import com.anks.tech.ecommerce.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category, Integer> {
}
