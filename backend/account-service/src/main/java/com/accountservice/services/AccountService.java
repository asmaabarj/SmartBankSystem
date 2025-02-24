package com.accountservice.services;

import com.accountservice.dtos.AccountDTO;
import java.util.List;

public interface AccountService {
    AccountDTO saveAccount(AccountDTO accountDTO);
    AccountDTO getAccount(Long id);
    List<AccountDTO> getAccountsByCustomer(Long customerId);
    List<AccountDTO> listAccounts();
} 