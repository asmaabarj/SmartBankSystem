import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ErrorBoundary } from './utils/ErrorBoundary';
import { Navbar } from './components/layout/Navbar';
import { Dashboard } from './components/layout/Dashboard';
import { CustomerList } from './components/customers/CustomerList';
import { CustomerForm } from './components/customers/CustomerForm';
import { AccountList } from './components/accounts/AccountList';
import { AccountForm } from './components/accounts/AccountForm';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary>
                <Router>
                    <Navbar />
                    <Container sx={{ mt: 4, mb: 4 }}>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/customers" element={<CustomerList />} />
                            <Route path="/customers/new" element={<CustomerForm />} />
                            <Route path="/accounts" element={<AccountList />} />
                            <Route path="/accounts/new" element={<AccountForm />} />
                            <Route path="/accounts/customer/:customerId" element={<AccountList />} />
                        </Routes>
                    </Container>
                </Router>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;