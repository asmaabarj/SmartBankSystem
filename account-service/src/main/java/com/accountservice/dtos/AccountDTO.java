package com.accountservice.dtos;

import com.accountservice.enums.AccountType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data @NoArgsConstructor @AllArgsConstructor
public class AccountDTO {
    private Long id;
    
    @Positive(message = "Le solde doit être positif")
    private double balance;
    
    @NotNull(message = "Le type de compte est obligatoire")
    private AccountType type;
    
    @NotNull(message = "L'ID du client est obligatoire")
    private Long customerId;
}
