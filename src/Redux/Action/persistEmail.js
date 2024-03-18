
export const saveEmailAndLogin = (email, token) => {
    return {
        type: 'SAVE_EMAIL_AND_TOKEN',
        payload: { email, token }
    };
};

export const getEmailAndLogin = () => {
    return {
        type: 'GET_EMAIL_AND_TOKEN'
    };
};