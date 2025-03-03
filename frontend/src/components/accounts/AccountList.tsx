import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Box
} from '@mui/material';
import { Account, AccountType } from '../../types/Account';
import { accountService } from '../../services/accountService';
import { Link, useParams } from 'react-router-dom';

export const AccountList = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const { customerId } = useParams<{ customerId: string }>();

    useEffect(() => {
        loadAccounts();
    }, [customerId]);

    const loadAccounts = async () => {
        try {
            const data = customerId 
                ? await accountService.getByCustomerId(parseInt(customerId))
                : await accountService.getAll();
            setAccounts(data);
        } catch (error) {
            console.error('Erreur lors du chargement des comptes:', error);
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5">
                    {customerId ? 'Comptes du Client' : 'Tous les Comptes'}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/accounts/new"
                >
                    Nouveau Compte
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Solde</TableCell>
                            <TableCell>Custumer id</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((account) => (
                            <TableRow key={account.id}>
                                <TableCell>{account.id}</TableCell>
                                <TableCell>
                                    {account.type === AccountType.CURRENT ? 'Courant' : 'Épargne'}
                                </TableCell>
                                <TableCell>{account.balance} €</TableCell>
                                <TableCell>{account.customerId}</TableCell>   
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};