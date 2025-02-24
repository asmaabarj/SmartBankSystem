package com.customerservice.controllers;

import com.customerservice.dtos.CustomerDTO;
import com.customerservice.services.CustomerService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public CustomerDTO saveCustomer(@Valid @RequestBody CustomerDTO customerDTO) {
        return customerService.saveCustomer(customerDTO);
    }

    @GetMapping("/{id}")
    public CustomerDTO getCustomer(@PathVariable Long id) {
        return customerService.getCustomer(id);
    }

    @GetMapping
    public List<CustomerDTO> listCustomers() {
        return customerService.listCustomers();
    }
}
