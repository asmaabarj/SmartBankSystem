package com.customerservice.services;

import com.customerservice.dtos.CustomerDTO;
import java.util.List;

public interface CustomerService {
    CustomerDTO saveCustomer(CustomerDTO customerDTO);
    CustomerDTO getCustomer(Long id);
    List<CustomerDTO> listCustomers();
}
