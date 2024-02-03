package com.anks.tech.ecommerce.repository;

import com.anks.tech.ecommerce.entity.Information;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IInformationRespository extends JpaRepository<Information, Integer> {
}
