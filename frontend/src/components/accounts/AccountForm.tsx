import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Paper,
    Box,
    Typography,
    Alert,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import { Account, AccountType } from '../../types/Account';
import { Customer } from '../../types/Customer';
import { accountService } from '../../services/accountService';
import { customerService } from '../../services/customerService';
import { useNavigate } from 'react-router-dom';

export const AccountForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [account, setAccount] = useState<Account>({
        balance: 0,
        type: AccountType.CURRENT,
        customerId: 0
    });

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const data = await customerService.getAll();
            setCustomers(data);
        } catch (err) {
            setError('Erreur lors du chargement des clients');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await accountService.create(account);
            navigate('/accounts');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Une erreur est survenue');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Nouveau Compte
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Type de Compte</InputLabel>
                    <Select
                        value={account.type}
                        label="Type de Compte"
                        name="type"
                        onChange={(e) => setAccount({
                            ...account,
                            type: e.target.value as AccountType
                        })}
                    >
                        <MenuItem value={AccountType.CURRENT}>Courant</MenuItem>
                        <MenuItem value={AccountType.SAVINGS}>Épargne</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="Solde Initial"
                    name="balance"
                    type="number"
                    value={account.balance}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Client</InputLabel>
                    <Select
                        value={account.customerId}
                        label="Client"
                        name="customerId"
                        onChange={(e) => setAccount({
                            ...account,
                            customerId: e.target.value as number
                        })}
                    >
                        {customers.map(customer => (
                            <MenuItem key={customer.id} value={customer.id}>
                                {customer.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ mt: 2 }}>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        sx={{ mr: 1 }}
                    >
                        Enregistrer
                    </Button>
                    <Button 
                        variant="outlined" 
                        onClick={() => navigate('/accounts')}
                    >
                        Annuler
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};