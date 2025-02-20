package com.customerservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data @NoArgsConstructor @AllArgsConstructor
public class CustomerDTO {
    private Long id;
    
    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 3, max = 50, message = "Le nom doit contenir entre 3 et 50 caractères")
    private String name;
    
    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format d'email invalide")
    private String email;
} 