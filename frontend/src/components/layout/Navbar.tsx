import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Smart Bank
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/customers">
                    Clients
                </Button>
                <Button color="inherit" component={Link} to="/accounts">
                    Comptes
                </Button>
            </Toolbar>
        </AppBar>
    );
};