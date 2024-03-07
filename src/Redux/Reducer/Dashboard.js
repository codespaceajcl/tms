
// DASHBOARD
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

// ALL TENDERS GET
export const getAllTendersReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_ALL_TENDERS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_ALL_TENDERS_SUCCESS":
            return {
                ...state,
                loading: false,
                allTendersData: action.payload,
            };
        case "GET_ALL_TENDERS_FAILED":
            return {
                ...state,
                loading: false,
                allTendersData: null,
                error: action.payload,
            };
        case "GET_ALL_TENDERS_RESET":
            return {
                ...state,
                allTendersData: null,
                error: null
            };
        default:
            return state;
    }
}

// GET TENDERS GET DEPARTMENTS
export const getDepartmentsReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_DEPARTMENTS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_DEPARTMENTS_SUCCESS":
            return {
                ...state,
                loading: false,
                getDepartmentsData: action.payload,
            };
        case "GET_DEPARTMENTS_FAILED":
            return {
                ...state,
                loading: false,
                getDepartmentsData: null,
                error: action.payload,
            };
        case "GET_DEPARTMENTS_RESET":
            return {
                ...state,
                getDepartmentsData: null,
                error: null
            };
        default:
            return state;
    }
}

// GET TENDERS ADD DEPARTMENTS
export const addDepartmentReducer = (state = {}, action) => {
    switch (action.type) {
        case "ADD_DEPARTMENT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "ADD_DEPARTMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                addDepartmentData: action.payload,
            };
        case "ADD_DEPARTMENT_FAILED":
            return {
                ...state,
                loading: false,
                addDepartmentData: null,
                error: action.payload,
            };
        case "ADD_DEPARTMENT_RESET":
            return {
                ...state,
                addDepartmentData: null,
                error: null
            };
        default:
            return state;
    }
}

// GET TENDERS SELECT DEPARTMENTS
export const selectDepartmentReducer = (state = {}, action) => {
    switch (action.type) {
        case "SELECT_DEPARTMENT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "SELECT_DEPARTMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                selectDepartmentData: action.payload,
            };
        case "SELECT_DEPARTMENT_FAILED":
            return {
                ...state,
                loading: false,
                selectDepartmentData: null,
                error: action.payload,
            };
        case "SELECT_DEPARTMENT_RESET":
            return {
                ...state,
                selectDepartmentData: null,
                error: null
            };
        default:
            return state;
    }
}

// ALL ASSIGNED TENDERS 
export const getAssignedTendersReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_ALL_ASSIGNED_TENDERS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_ALL_ASSIGNED_TENDERS_SUCCESS":
            return {
                ...state,
                loading: false,
                assignedTenderData: action.payload,
            };
        case "GET_ALL_ASSIGNED_TENDERS_FAILED":
            return {
                ...state,
                loading: false,
                assignedTenderData: null,
                error: action.payload,
            };
        case "GET_ALL_ASSIGNED_TENDERS_RESET":
            return {
                ...state,
                assignedTenderData: null,
                error: null
            };
        default:
            return state;
    }
}

// ASSIGNED TENDERS SELECT
export const assignedTenderSelectReducer = (state = {}, action) => {
    switch (action.type) {
        case "ASSIGNED_TENDER_SELECT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "ASSIGNED_TENDER_SELECT_SUCCESS":
            return {
                ...state,
                loading: false,
                assignedTenderSelectData: action.payload,
            };
        case "ASSIGNED_TENDER_SELECT_FAILED":
            return {
                ...state,
                loading: false,
                assignedTenderSelectData: null,
                error: action.payload,
            };
        case "ASSIGNED_TENDER_SELECT_RESET":
            return {
                ...state,
                assignedTenderSelectData: null,
                error: null
            };
        default:
            return state;
    }
}

// INTERESTED TENDERS GET 
export const getInterestedTendersReducer = (state = {}, action) => {
    switch (action.type) {
        case "INTERESTED_TENDERS_GET_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "INTERESTED_TENDERS_GET_SUCCESS":
            return {
                ...state,
                loading: false,
                interestedTendersData: action.payload,
            };
        case "INTERESTED_TENDERS_GET_FAILED":
            return {
                ...state,
                loading: false,
                interestedTendersData: null,
                error: action.payload,
            };
        case "INTERESTED_TENDERS_GET_RESET":
            return {
                ...state,
                interestedTendersData: null,
                error: null
            };
        default:
            return state;
    }
}

// INTERESTED TENDERS DOCUMENT
export const interestedTenderDocumentsReducer = (state = {}, action) => {
    switch (action.type) {
        case "INTERESTED_TENDER_DOCUMENTS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "INTERESTED_TENDER_DOCUMENTS_SUCCESS":
            return {
                ...state,
                loading: false,
                interestedTenderDocumentData: action.payload,
            };
        case "INTERESTED_TENDER_DOCUMENTS_FAILED":
            return {
                ...state,
                loading: false,
                interestedTenderDocumentData: null,
                error: action.payload,
            };
        case "INTERESTED_TENDER_DOCUMENTS_RESET":
            return {
                ...state,
                interestedTenderDocumentData: null,
                error: null
            };
        default:
            return state;
    }
}

// APPLIED TENDERS GET
export const getAppliedTendersReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_APPLIED_TENDERS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_APPLIED_TENDERS_SUCCESS":
            return {
                ...state,
                loading: false,
                appliedTendersData: action.payload,
            };
        case "GET_APPLIED_TENDERS_FAILED":
            return {
                ...state,
                loading: false,
                appliedTendersData: null,
                error: action.payload,
            };
        case "GET_APPLIED_TENDERS_RESET":
            return {
                ...state,
                appliedTendersData: null,
                error: null
            };
        default:
            return state;
    }
}

// APPLIED TENDER DOCUMENT
export const appliedTenderDocumentReducer = (state = {}, action) => {
    switch (action.type) {
        case "APPLIED_TENDER_DOCUMENT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "APPLIED_TENDER_DOCUMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                appliedTenderDocumentData: action.payload,
            };
        case "APPLIED_TENDER_DOCUMENT_FAILED":
            return {
                ...state,
                loading: false,
                appliedTenderDocumentData: null,
                error: action.payload,
            };
        case "APPLIED_TENDER_DOCUMENT_RESET":
            return {
                ...state,
                appliedTenderDocumentData: null,
                error: null
            };
        default:
            return state;
    }
}

// TENDERS RESULTS GET
export const getTendersResultsReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_TENDERS_RESULTS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_TENDERS_RESULTS_SUCCESS":
            return {
                ...state,
                loading: false,
                getTendersResultsData: action.payload,
            };
        case "GET_TENDERS_RESULTS_FAILED":
            return {
                ...state,
                loading: false,
                getTendersResultsData: null,
                error: action.payload,
            };
        case "GET_TENDERS_RESULTS_RESET":
            return {
                ...state,
                getTendersResultsData: null,
                error: null
            };
        default:
            return state;
    }
}

// TENDERS RESULTS WIN
export const tendersResultsWinReducer = (state = {}, action) => {
    switch (action.type) {
        case "TENDERS_RESULT_WIN_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "TENDERS_RESULT_WIN_SUCCESS":
            return {
                ...state,
                loading: false,
                TendersResultsWinData: action.payload,
            };
        case "TENDERS_RESULT_WIN_FAILED":
            return {
                ...state,
                loading: false,
                TendersResultsWinData: null,
                error: action.payload,
            };
        case "TENDERS_RESULT_WIN_RESET":
            return {
                ...state,
                TendersResultsWinData: null,
                error: null
            };
        default:
            return state;
    }
}

// TENDERS RESULTS LOSS
export const tendersResultsLossReducer = (state = {}, action) => {
    switch (action.type) {
        case "TENDERS_RESULT_LOSS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "TENDERS_RESULT_LOSS_SUCCESS":
            return {
                ...state,
                loading: false,
                TendersResultsLossData: action.payload,
            };
        case "TENDERS_RESULT_LOSS_FAILED":
            return {
                ...state,
                loading: false,
                TendersResultsLossData: null,
                error: action.payload,
            };
        case "TENDERS_RESULT_LOSS_RESET":
            return {
                ...state,
                TendersResultsLossData: null,
                error: null
            };
        default:
            return state;
    }
}