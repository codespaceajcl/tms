const initialState = {
    email: '',
    token: ''
};

export const emailTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_EMAIL_AND_TOKEN':
            return {
                ...state,
                email: action.payload.email,
                token: action.payload.token
            };
        case 'GET_EMAIL_AND_TOKEN':
            return {
                ...state
            };
        default:
            return state;
    }
};