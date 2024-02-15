const getEmail = localStorage.getItem("email")
const Token = localStorage.getItem("token")

export const login = {
    email: getEmail,
    token: Token
}

export const validateData = (data) => {
    for (const key in data) {
        if (data[key] === null || data[key] === undefined || data[key] === '') {
            throw new Error(`Please filled up all fields`);
        }
        if (typeof data[key] === 'object') {
            validateData(data[key]);
        }
    }
};

export function getToken() {
    let userAuth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
    return userAuth?.token;
}

export function getCurrentUser() {
    let userAuth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
    return userAuth;
}

export const dashboardColorStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'white', borderRadius: "5px", cursor: "pointer", fontSize: "13px", boxShadow: "none",
        borderColor: state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#A9C23F' : '#787878',
        '&:hover': {
            borderColor: state.isFocused || state.isActive ? '#A9C23F' : '#787878',
        },
    }),
    option: (styles) => {
        return {
            ...styles,
            fontSize: "13px",
        };
    },
};

export const chartStyle = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'white', borderRadius: "5px", cursor: "pointer", fontSize: "13px", boxShadow: "none",
        borderColor: state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#A9C23F' : '#787878',
        '&:hover': {
            borderColor: state.isFocused || state.isActive ? '#A9C23F' : '#787878',
        },
        width: "140px"
    }),
    option: (styles) => {
        return {
            ...styles,
            fontSize: "13px",
        };
    },
};