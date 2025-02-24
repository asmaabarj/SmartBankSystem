package com.customerservice.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.customerservice.dtos.CustomerDTO;
import com.customerservice.entities.Customer;
import com.customerservice.repositories.CustomerRepository;

@ExtendWith(MockitoExtension.class)
public class CustomerServiceImplTest {

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private CustomerServiceImpl customerService;

    private Customer customer;
    private CustomerDTO customerDTO;

    @BeforeEach
    void setUp() {
        customer = new Customer();
        customer.setId(1L);
        customer.setName("John Doe");
        customer.setEmail("john@example.com");

        customerDTO = new CustomerDTO();
        customerDTO.setId(1L);
        customerDTO.setName("John Doe");
        customerDTO.setEmail("john@example.com");
    }

    @Test
    void shouldSaveCustomerSuccessfully() {
        // Given
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);

        // When
        CustomerDTO savedCustomer = customerService.saveCustomer(customerDTO);

        // Then
        assertNotNull(savedCustomer);
        assertEquals(customer.getId(), savedCustomer.getId());
        assertEquals(customer.getName(), savedCustomer.getName());
        assertEquals(customer.getEmail(), savedCustomer.getEmail());
        verify(customerRepository).save(any(Customer.class));
    }

    @Test
    void shouldGetCustomerSuccessfully() {
        // Given
        when(customerRepository.findById(anyLong())).thenReturn(Optional.of(customer));

        // When
        CustomerDTO foundCustomer = customerService.getCustomer(1L);

        // Then
        assertNotNull(foundCustomer);
        assertEquals(customer.getId(), foundCustomer.getId());
        verify(customerRepository).findById(1L);
    }

    @Test
    void shouldGetAllCustomersSuccessfully() {
        // Given
        List<Customer> customers = Arrays.asList(customer);
        when(customerRepository.findAll()).thenReturn(customers);

        // When
        List<CustomerDTO> foundCustomers = customerService.listCustomers();

        // Then
        assertFalse(foundCustomers.isEmpty());
        assertEquals(1, foundCustomers.size());
        verify(customerRepository).findAll();
    }

    @Test
    void shouldThrowExceptionWhenCustomerNotFound() {
        // Given
        when(customerRepository.findById(anyLong())).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            customerService.getCustomer(1L);
        });
        verify(customerRepository).findById(1L);
    }
} 