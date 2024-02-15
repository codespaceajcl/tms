export const formCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "FORM_POST_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "FORM_POST_SUCCESS":
            return {
                ...state,
                loading: false,
                formCreateData: action.payload,
            };
        case "FORM_POST_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "FORM_POST_RESET":
            return {
                ...state,
                formCreateData: null,
                error: null
            };
        default:
            return state;
    }
}

export const formSaveReducer = (state = {}, action) => {
    switch (action.type) {
        case "FORM_SAVE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "FORM_SAVE_SUCCESS":
            return {
                ...state,
                loading: false,
                formSaveData: action.payload,
            };
        case "FORM_SAVE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "FORM_SAVE_RESET":
            return {
                ...state,
                formSaveData: null,
                error: null
            };
        default:
            return state;
    }
}

export const applicationGetReducer = (state = {}, action) => {
    switch (action.type) {
        case "APPLICATION_GET_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "APPLICATION_GET_SUCCESS":
            return {
                ...state,
                loading: false,
                tableGetData: action.payload,
            };
        case "APPLICATION_GET_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const ApplicationUploadReducer = (state = {}, action) => {
    switch (action.type) {
        case "APPLICATION_UPLOAD_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "APPLICATION_UPLOAD_SUCCESS":
            return {
                ...state,
                loading: false,
                applicationUploadData: action.payload,
            };
        case "APPLICATION_UPLOAD_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "APPLICATION_UPLOAD_RESET":
            return {
                ...state,
                applicationUploadData: null,
                error: null
            };
        default:
            return state;
    }
}

export const getDocumentLinkReducer = (state = {}, action) => {
    switch (action.type) {
        case "DOCUMENT_LINK_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "DOCUMENT_LINK_SUCCESS":
            return {
                ...state,
                loading: false,
                documentLinkData: action.payload,
            };
        case "DOCUMENT_LINK_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "DOCUMENT_LINK_RESET":
            return {
                ...state,
                documentLinkData: null,
                error: null
            };
        default:
            return state;
    }
}

// ======================

export const dashboardGetReducer = (state = {}, action) => {
    switch (action.type) {
        case "DASHBOARD_GET_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "DASHBOARD_GET_SUCCESS":
            return {
                ...state,
                loading: false,
                dashGetData: action.payload,
            };
        case "DASHBOARD_GET_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const getDepartAndYearReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_DEPART_AND_YEAR_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_DEPART_AND_YEAR_SUCCESS":
            return {
                ...state,
                loading: false,
                departmentYearData: action.payload,
            };
        case "GET_DEPART_AND_YEAR_FAILED":
            return {
                ...state,
                loading: false,
                departmentYearData: null,
                error: action.payload,
            };
        case "GET_DEPART_AND_YEAR_RESET":
            return {
                ...state,
                departmentYearData: null,
                error: null
            };
        default:
            return state;
    }
}

export const getSearchDocumentReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_SEARCH_DOCUMENT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_SEARCH_DOCUMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                getSearchData: action.payload,
            };
        case "GET_SEARCH_DOCUMENT_FAILED":
            return {
                ...state,
                loading: false,
                getSearchData: null,
                error: action.payload,
            };
        case "GET_SEARCH_DOCUMENT_RESET":
            return {
                ...state,
                getSearchData: null,
                error: null
            };
        default:
            return state;
    }
}

export const registerDocumentTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case "REGISTER_DOC_TYPE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "REGISTER_DOC_TYPE_SUCCESS":
            return {
                ...state,
                loading: false,
                postRegisterDocType: action.payload,
            };
        case "REGISTER_DOC_TYPE_FAILED":
            return {
                ...state,
                loading: false,
                postRegisterDocType: null,
                error: action.payload,
            };
        case "REGISTER_DOC_TYPE_RESET":
            return {
                ...state,
                postRegisterDocType: null,
                error: null
            };
        default:
            return state;
    }
}

export const createDocumentReducer = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_DOCUMENT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "CREATE_DOCUMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                documentCreated: action.payload,
            };
        case "CREATE_DOCUMENT_FAILED":
            return {
                ...state,
                loading: false,
                documentCreated: null,
                error: action.payload,
            };
        case "CREATE_DOCUMENT_RESET":
            return {
                ...state,
                documentCreated: null,
                error: null
            };
        default:
            return state;
    }
}