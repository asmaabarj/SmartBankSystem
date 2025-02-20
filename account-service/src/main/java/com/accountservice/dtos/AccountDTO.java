package com.accountservice.dtos;

import com.accountservice.enums.AccountType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class AccountDTO {
    private Long id;
    private double balance;
    private AccountType type;
    private Long customerId;
}
