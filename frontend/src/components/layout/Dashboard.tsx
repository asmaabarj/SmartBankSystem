import React, { useEffect, useState } from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
    CircularProgress
} from '@mui/material';
import { Customer } from '../../types/Customer';
import { Account } from '../../types/Account';
import { customerService } from '../../services/customerService';
import { accountService } from '../../services/accountService';
import { PeopleAlt, AccountBalance, Savings } from '@mui/icons-material';

export const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalCustomers: 0,
        totalAccounts: 0,
        totalBalance: 0,
        currentAccounts: 0,
        savingsAccounts: 0
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [customers, accounts] = await Promise.all([
                customerService.getAll(),
                accountService.getAll()
            ]);

            const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
            const currentAccounts = accounts.filter(account => account.type === 'CURRENT').length;
            const savingsAccounts = accounts.filter(account => account.type === 'SAVINGS').length;

            setStats({
                totalCustomers: customers.length,
                totalAccounts: accounts.length,
                totalBalance,
                currentAccounts,
                savingsAccounts
            });
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, mt: 3 }}>
            <Typography variant="h4" gutterBottom>
                Tableau de Bord
            </Typography>
            <Grid container spacing={3}>
                {/* Statistiques Clients */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: 'primary.light' }}>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <PeopleAlt sx={{ fontSize: 40, color: 'white', mr: 2 }} />
                                <Box>
                                    <Typography color="white" variant="h6">
                                        Total Clients
                                    </Typography>
                                    <Typography color="white" variant="h4">
                                        {stats.totalCustomers}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Statistiques Comptes */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: 'success.light' }}>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <AccountBalance sx={{ fontSize: 40, color: 'white', mr: 2 }} />
                                <Box>
                                    <Typography color="white" variant="h6">
                                        Total Comptes
                                    </Typography>
                                    <Typography color="white" variant="h4">
                                        {stats.totalAccounts}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Solde Total */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: 'info.light' }}>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Savings sx={{ fontSize: 40, color: 'white', mr: 2 }} />
                                <Box>
                                    <Typography color="white" variant="h6">
                                        Solde Total
                                    </Typography>
                                    <Typography color="white" variant="h4">
                                        {stats.totalBalance.toFixed(2)} €
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};