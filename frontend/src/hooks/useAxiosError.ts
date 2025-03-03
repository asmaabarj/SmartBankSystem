import { useState } from 'react';
import { AxiosError } from 'axios';

export const useAxiosError = () => {
    const [error, setError] = useState<string | null>(null);

    const handleError = (error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.response) {
                setError(error.response.data.message || 'Une erreur est survenue');
            } else if (error.request) {
                setError('Impossible de communiquer avec le serveur');
            } else {
                setError('Erreur lors de la configuration de la requête');
            }
        } else {
            setError('Une erreur inattendue est survenue');
        }
    };

    return { error, setError, handleError };
};