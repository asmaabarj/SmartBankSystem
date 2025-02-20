package com.accountservice.services;

import com.accountservice.dtos.AccountDTO;
import com.accountservice.entities.Account;
import com.accountservice.repositories.AccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import com.accountservice.exceptions.CustomerNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final RestTemplate restTemplate;
    private final String customerServiceUrl = "http://localhost:8081/api/customers/";

    public AccountServiceImpl(AccountRepository accountRepository, RestTemplate restTemplate) {
        this.accountRepository = accountRepository;
        this.restTemplate = restTemplate;
    }

    @Override
    public AccountDTO saveAccount(AccountDTO accountDTO) {
        // Vérifier si le client existe
        try {
            restTemplate.getForObject(customerServiceUrl + accountDTO.getCustomerId(), Object.class);
        } catch (Exception e) {
            throw new CustomerNotFoundException("Client avec ID " + accountDTO.getCustomerId() + " n'existe pas");
        }

        Account account = new Account();
        account.setBalance(accountDTO.getBalance());
        account.setType(accountDTO.getType());
        account.setCustomerId(accountDTO.getCustomerId());
        Account savedAccount = accountRepository.save(account);
        return mapToDTO(savedAccount);
    }

    @Override
    public AccountDTO getAccount(Long id) {
        Account account = accountRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Account not found"));
        return mapToDTO(account);
    }

    @Override
    public List<AccountDTO> getAccountsByCustomer(Long customerId) {
        return accountRepository.findByCustomerId(customerId)
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<AccountDTO> listAccounts() {
        return accountRepository.findAll()
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    private AccountDTO mapToDTO(Account account) {
        return new AccountDTO(
            account.getId(),
            account.getBalance(),
            account.getType(),
            account.getCustomerId()
        );
    }
} 