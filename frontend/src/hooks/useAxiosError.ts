import { useState } from 'react';
import { AxiosError } from 'axios';

export const useAxiosError = () => {
    const [error, setError] = useState<string | null>(null);

    const handleError = (error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.response) {
                // Erreur de réponse du serveur
                setError(error.response.data.message || 'Une erreur est survenue');
            } else if (error.request) {
                // Pas de réponse du serveur
                setError('Impossible de communiquer avec le serveur');
            } else {
                // Erreur de configuration de la requête
                setError('Erreur lors de la configuration de la requête');
            }
        } else {
            setError('Une erreur inattendue est survenue');
        }
    };

    return { error, setError, handleError };
};