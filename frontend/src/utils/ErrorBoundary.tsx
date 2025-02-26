import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Erreur non gérée:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="80vh"
                >
                    <Typography variant="h5" color="error" gutterBottom>
                        Oups! Une erreur est survenue.
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        {this.state.error?.message}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => window.location.reload()}
                    >
                        Rafraîchir la page
                    </Button>
                </Box>
            );
        }

        return this.props.children;
    }
}