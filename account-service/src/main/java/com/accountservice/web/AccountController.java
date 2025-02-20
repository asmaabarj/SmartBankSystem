package com.accountservice.web;

import com.accountservice.dtos.AccountDTO;
import com.accountservice.services.AccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public AccountDTO saveAccount(@RequestBody AccountDTO accountDTO) {
        return accountService.saveAccount(accountDTO);
    }

    @GetMapping("/{id}")
    public AccountDTO getAccount(@PathVariable Long id) {
        return accountService.getAccount(id);
    }

    @GetMapping("/customer/{customerId}")
    public List<AccountDTO> getAccountsByCustomer(@PathVariable Long customerId) {
        return accountService.getAccountsByCustomer(customerId);
    }

    @GetMapping
    public List<AccountDTO> listAccounts() {
        return accountService.listAccounts();
    }
} 