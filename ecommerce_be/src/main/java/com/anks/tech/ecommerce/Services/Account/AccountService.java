package com.anks.tech.ecommerce.Services.Account;

import com.anks.tech.ecommerce.entity.Account;

import com.anks.tech.ecommerce.entity.FileProduct;
import com.anks.tech.ecommerce.form.AccountForm;
import com.anks.tech.ecommerce.repository.IAccountRepository;
import com.anks.tech.ecommerce.repository.IFileProductRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(rollbackFor = Exception.class)
public class AccountService implements IAccountService {

    @Autowired
    private IAccountRepository accountRepository;
    @Autowired
    private IFileProductRepository fileProductRespository;
    @Autowired
    private ModelMapper modelMapper;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    @Override
    public Page<Account> getAllAccounts(Pageable pageable) {
        return accountRepository.findAll(pageable);
    }

    @Override
    public void createNewAccount(AccountForm form) {
        TypeMap typeMap = modelMapper.getTypeMap(AccountForm.class, Account.class);

        if (typeMap == null) {
            modelMapper.addMappings(new PropertyMap<AccountForm, Account>() {
                @Override
                protected void configure() {
                    skip(destination.getPassword()); //bỏ qua mapping password
                }
            });
        }

        Account account = modelMapper.map(form, Account.class);

        // Mã hóa mật khẩu và set nó sau khi mapping
        String encodedPassword = form.getPassword();
        account.setPassword(encodedPassword);
        accountRepository.save(account);

        FileProduct fileAvatar = account.getFileProduct();
        fileProductRespository.save(fileAvatar);
    }

    @Override
    public Optional<Account> getAccountById(Integer id) {
        Optional<Account> account = accountRepository.findById(id);
        return account;
    }

}
