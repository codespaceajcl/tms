
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

export const getDepartAndDocTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_DEPART_AND_DOC_TYPE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_DEPART_AND_DOC_TYPE_SUCCESS":
            return {
                ...state,
                loading: false,
                departmentAndTypeData: action.payload,
            };
        case "GET_DEPART_AND_DOC_TYPE_FAILED":
            return {
                ...state,
                loading: false,
                departmentAndTypeData: null,
                error: action.payload,
            };
        case "GET_DEPART_AND_DOC_TYPE_RESET":
            return {
                ...state,
                departmentAndTypeData: null,
                error: null
            };
        default:
            return state;
    }
}

export const getAllDepartmentDocsReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_ALL_DEPARTMENT_DOCUMENTS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_ALL_DEPARTMENT_DOCUMENTS_SUCCESS":
            return {
                ...state,
                loading: false,
                departDocData: action.payload,
            };
        case "GET_ALL_DEPARTMENT_DOCUMENTS_FAILED":
            return {
                ...state,
                loading: false,
                departDocData: null,
                error: action.payload,
            };
        case "GET_ALL_DEPARTMENT_DOCUMENTS_RESET":
            return {
                ...state,
                departDocData: null,
                error: null
            };
        default:
            return state;
    }
}