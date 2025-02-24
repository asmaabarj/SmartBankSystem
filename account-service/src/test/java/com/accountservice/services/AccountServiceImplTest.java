package com.accountservice.services;

import com.accountservice.dtos.AccountDTO;
import com.accountservice.entities.Account;
import com.accountservice.enums.AccountType;
import com.accountservice.exceptions.CustomerNotFoundException;
import com.accountservice.repositories.AccountRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AccountServiceImplTest {

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private AccountServiceImpl accountService;

    private Account account;
    private AccountDTO accountDTO;

    @BeforeEach
    void setUp() {
        account = new Account();
        account.setId(1L);
        account.setBalance(1000.0);
        account.setType(AccountType.CURRENT);
        account.setCustomerId(1L);

        accountDTO = new AccountDTO();
        accountDTO.setId(1L);
        accountDTO.setBalance(1000.0);
        accountDTO.setType(AccountType.CURRENT);
        accountDTO.setCustomerId(1L);
    }

    @Test
    void shouldSaveAccountSuccessfully() {
        // Given
        when(restTemplate.getForObject(anyString(), any())).thenReturn(new Object());
        when(accountRepository.save(any(Account.class))).thenReturn(account);

        // When
        AccountDTO savedAccount = accountService.saveAccount(accountDTO);

        // Then
        assertNotNull(savedAccount);
        assertEquals(account.getId(), savedAccount.getId());
        assertEquals(account.getBalance(), savedAccount.getBalance());
        assertEquals(account.getType(), savedAccount.getType());
        verify(accountRepository).save(any(Account.class));
    }

    @Test
    void shouldThrowExceptionWhenCustomerNotFound() {
        // Given
        when(restTemplate.getForObject(anyString(), any())).thenThrow(new RuntimeException());

        // When & Then
        assertThrows(CustomerNotFoundException.class, () -> {
            accountService.saveAccount(accountDTO);
        });
        verify(accountRepository, never()).save(any(Account.class));
    }

    @Test
    void shouldGetAccountSuccessfully() {
        // Given
        when(accountRepository.findById(anyLong())).thenReturn(Optional.of(account));

        // When
        AccountDTO foundAccount = accountService.getAccount(1L);

        // Then
        assertNotNull(foundAccount);
        assertEquals(account.getId(), foundAccount.getId());
        verify(accountRepository).findById(1L);
    }

    @Test
    void shouldGetAccountsByCustomerSuccessfully() {
        // Given
        List<Account> accounts = Arrays.asList(account);
        when(accountRepository.findByCustomerId(anyLong())).thenReturn(accounts);

        // When
        List<AccountDTO> foundAccounts = accountService.getAccountsByCustomer(1L);

        // Then
        assertFalse(foundAccounts.isEmpty());
        assertEquals(1, foundAccounts.size());
        verify(accountRepository).findByCustomerId(1L);
    }
} 