import React, { useState } from 'react';
import { 
    TextField, 
    Button, 
    Paper, 
    Box, 
    Typography,
    Alert 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { customerService } from '../../services/customerService';
import { validateCustomer } from '../../utils/validations';

export const CustomerForm = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({ name: '', email: '' });
    const [errors, setErrors] = useState<any>({});
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateCustomer(values);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await customerService.create(values);
            navigate('/customers');
        } catch (err: any) {
            setSubmitError(err.response?.data?.message || 'Une erreur est survenue');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors((prev: Record<string, string | undefined>) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Nouveau Client
            </Typography>
            
            {submitError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {submitError}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Nom"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                />
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
                        onClick={() => navigate('/customers')}
                    >
                        Annuler
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};