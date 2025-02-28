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
    CircularProgress,
    Alert
} from '@mui/material';
import { Customer } from '../../types/Customer';
import { customerService } from '../../services/customerService';
import { Link } from 'react-router-dom';

export const CustomerList = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            setLoading(true);
            setError('');
            console.log('Chargement des clients...');
            const data = await customerService.getAll();
            console.log('Données reçues:', data);
            setCustomers(data);
        } catch (error: any) {
            console.error('Erreur complète:', error);
            setError(
                error.response?.data?.message || 
                error.message || 
                'Erreur lors du chargement des clients'
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <div>
            <h2>Liste des Clients</h2>
            <Button 
                variant="contained" 
                color="primary" 
                component={Link} 
                to="/customers/new"
                style={{ marginBottom: 20 }}
            >
                Nouveau Client
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell>{customer.id}</TableCell>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>
                                    <Button 
                                        component={Link} 
                                        to={`/customers/${customer.id}`}
                                        color="primary"
                                    >
                                        Détails
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};