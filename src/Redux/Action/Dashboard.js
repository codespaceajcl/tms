import axios from "axios";

// DASHBOARD
export const dashboardGet = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "DASHBOARD_GET_REQUEST",
        });

        const { data } = await axios.post("docuware/getDashboardData/", formData);

        dispatch({
            type: "DASHBOARD_GET_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "DASHBOARD_GET_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// ALL TENDERS GET
export const getAllTenders = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_ALL_TENDERS_REQUEST",
        });

        const { data } = await axios.post("docuware/getAllTenders/", formData);

        dispatch({
            type: "GET_ALL_TENDERS_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "GET_ALL_TENDERS_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// GET TENDERS GET DEPARTMENTS
export const getDepartments = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_DEPARTMENTS_REQUEST",
        });

        const { data } = await axios.post("archival/getDepartments/", formData);

        dispatch({
            type: "GET_DEPARTMENTS_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "GET_DEPARTMENTS_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// GET TENDERS ADD DEPARTMENT
export const addDepartment = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "ADD_DEPARTMENT_REQUEST",
        });

        const { data } = await axios.post("archival/addDepartment/", formData);

        dispatch({
            type: "ADD_DEPARTMENT_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "ADD_DEPARTMENT_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// GET TENDERS SELECT DEPARTMENT
export const selectDepartment = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "SELECT_DEPARTMENT_REQUEST",
        });

        const { data } = await axios.post("archival/selectDepartment/", formData);

        dispatch({
            type: "SELECT_DEPARTMENT_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "SELECT_DEPARTMENT_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// ALL ASSIGNED TENDERS 
export const getAssignedTenders = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_ALL_ASSIGNED_TENDERS_REQUEST",
        });

        const { data } = await axios.post("archival/selectDepartment/", formData);

        dispatch({
            type: "GET_ALL_ASSIGNED_TENDERS_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "GET_ALL_ASSIGNED_TENDERS_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// ASSIGNED TENDERS SELECT 
export const assignedTenderSelect = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "ASSIGNED_TENDER_SELECT_REQUEST",
        });

        const { data } = await axios.post("archival/selectDepartment/", formData);

        dispatch({
            type: "ASSIGNED_TENDER_SELECT_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "ASSIGNED_TENDER_SELECT_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// INTERESTED TENDERS GET 
export const getInterestedTenders = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "INTERESTED_TENDERS_GET_REQUEST",
        });

        const { data } = await axios.post("archival/selectDepartment/", formData);

        dispatch({
            type: "INTERESTED_TENDERS_GET_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "INTERESTED_TENDERS_GET_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// INTERESTED TENDERS DOCUMENT 
export const interestedTenderDocuments = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "INTERESTED_TENDER_DOCUMENTS_REQUEST",
        });

        const { data } = await axios.post("archival/selectDepartment/", formData);

        dispatch({
            type: "INTERESTED_TENDER_DOCUMENTS_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "INTERESTED_TENDER_DOCUMENTS_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// APPLIED TENDERS GET 
export const getAppliedTenders = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_APPLIED_TENDERS_REQUEST",
        });

        const { data } = await axios.post("archival/selectDepartment/", formData);

        dispatch({
            type: "GET_APPLIED_TENDERS_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "GET_APPLIED_TENDERS_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// APPLIED TENDER DOCUMENT 
export const appliedTenderDocument = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "APPLIED_TENDER_DOCUMENT_REQUEST",
        });

        const { data } = await axios.post("archival/selectDepartment/", formData);

        dispatch({
            type: "APPLIED_TENDER_DOCUMENT_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "APPLIED_TENDER_DOCUMENT_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// TENDERS RESULTS GET 
export const getTendersResults = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_TENDERS_RESULTS_REQUEST",
        });

        const { data } = await axios.post("archival/selectDepartment/", formData);

        dispatch({
            type: "GET_TENDERS_RESULTS_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "GET_TENDERS_RESULTS_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// TENDERS RESULTS WIN 
export const tendersResultsWin = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "TENDERS_RESULT_WIN_REQUEST",
        });

        const { data } = await axios.post("archival/selectDepartment/", formData);

        dispatch({
            type: "TENDERS_RESULT_WIN_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "TENDERS_RESULT_WIN_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// TENDERS RESULTS LOSS 
export const tendersResultsLoss = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "TENDERS_RESULT_LOSS_REQUEST",
        });

        const { data } = await axios.post("archival/selectDepartment/", formData);

        dispatch({
            type: "TENDERS_RESULT_LOSS_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "TENDERS_RESULT_LOSS_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};