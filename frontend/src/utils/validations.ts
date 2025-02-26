export const validateCustomer = (values: any) => {
    const errors: any = {};

    if (!values.name) {
        errors.name = 'Le nom est requis';
    } else if (values.name.length < 2) {
        errors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!values.email) {
        errors.email = 'L\'email est requis';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Email invalide';
    }

    return errors;
};

export const validateAccount = (values: any) => {
    const errors: any = {};

    if (!values.type) {
        errors.type = 'Le type de compte est requis';
    }

    if (values.balance === undefined || values.balance === '') {
        errors.balance = 'Le solde initial est requis';
    } else if (isNaN(values.balance) || values.balance < 0) {
        errors.balance = 'Le solde doit être un nombre positif';
    }

    if (!values.customerId) {
        errors.customerId = 'Le client est requis';
    }

    return errors;
};