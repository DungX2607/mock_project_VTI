package com.anks.tech.ecommerce.Services.Account;

import com.anks.tech.ecommerce.entity.Account;
import com.anks.tech.ecommerce.form.AccountForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface IAccountService {

    Page<Account> getAllAccounts(Pageable pageable);
    void createNewAccount (AccountForm form);
    Optional<Account> getAccountById(Integer id);
}
