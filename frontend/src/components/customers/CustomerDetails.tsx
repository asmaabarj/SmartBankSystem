import React, { useEffect, useState } from 'react';
import { 
    Card, 
    CardContent, 
    Typography, 
    Box, 
    Button, 
    Grid,
    CircularProgress 
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Customer } from '../../types/Customer';
import { Account } from '../../types/Account';
import { customerService } from '../../services/customerService';
import { accountService } from '../../services/accountService';

export const CustomerDetails = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);
    
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadCustomerData(parseInt(id));
        }
    }, [id]);

    const loadCustomerData = async (customerId: number) => {
        try {
            const [customerData, accountsData] = await Promise.all([
                customerService.getById(customerId),
                accountService.getByCustomerId(customerId)
            ]);
            setCustomer(customerData);
            setAccounts(accountsData);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" m={3}>
                <CircularProgress />
            </Box>
        );
    }

    if (!customer) {
        return (
            <Typography color="error">Client non trouvé</Typography>
        );
    }

    return (
        <Box>
           
            <Typography variant="h6" gutterBottom>
                Comptes associés
            </Typography>
            <Grid container spacing={2}>
                {accounts.map(account => (
                    <Grid item xs={12} md={6} key={account.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1">
                                    <strong>Type:</strong> {account.type}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <strong>Solde:</strong> {account.balance} €
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box mt={3}>
                <Button 
                    variant="contained" 
                    onClick={() => navigate('/customers')}
                    sx={{ mr: 1 }}
                >
                    Retour
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={() => navigate(`/accounts/new?customerId=${customer.id}`)}
                >
                    Ajouter un compte
                </Button>
            </Box>
        </Box>
    );
};