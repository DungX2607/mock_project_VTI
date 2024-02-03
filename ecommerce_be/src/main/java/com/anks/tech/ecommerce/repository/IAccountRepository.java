package com.anks.tech.ecommerce.repository;

import com.anks.tech.ecommerce.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IAccountRepository extends JpaRepository<Account,Integer> {
    Optional<Account> findByUsername (String username);
}
