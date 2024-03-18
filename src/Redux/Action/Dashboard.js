import axios from "axios";
import { login } from "../../Utils/Helper";

const config = {
    headers: {
        Authorization: `Bearer ${login.token}`
    }
};

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

// ALL TENDER COMPANIES GET
export const getAllTendersCompanies = () => async (dispatch) => {
    try {
        dispatch({
            type: "GET_ALL_TENDERS_COMPANIES_REQUEST",
        });

        const { data } = await axios.get("tms/getActiveTendersCompany/", config);

        dispatch({
            type: "GET_ALL_TENDERS_COMPANIES_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "GET_ALL_TENDERS_COMPANIES_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// INTERESTED COMPANIES
export const getIntrestedTenderCompanies = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_INTERESTED_TENDERS_COMPANIES_REQUEST",
        });

        const { data } = await axios.post("tms/getTotalCompanyTenders/", formData, config);

        dispatch({
            type: "GET_INTERESTED_TENDERS_COMPANIES_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "GET_INTERESTED_TENDERS_COMPANIES_FAILED",
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

        const { data } = await axios.post("tms/getCompanyTenders/", formData, config);

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

// USER INTERESTED COMPANIES
export const userCompaniesFilter = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "SAVE_USER_INTERESTED_COMPANIES_REQUEST",
        });

        const { data } = await axios.post("tms/setUserCompanyFilter/", formData, config);

        dispatch({
            type: "SAVE_USER_INTERESTED_COMPANIES_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "SAVE_USER_INTERESTED_COMPANIES_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// GET DEPARTMENTS
export const getDepartments = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_DEPARTMENTS_REQUEST",
        });

        const { data } = await axios.post("tms/getDepartments/", formData, config);

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

// ADD DEPARTMENT
export const addDepartment = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "ADD_DEPARTMENT_REQUEST",
        });

        const { data } = await axios.post("tms/addDepartment/", formData, config);

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

// TENDERS SELECTED DEPARTMENT
export const selectDepartment = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "SELECT_DEPARTMENT_REQUEST",
        });

        const { data } = await axios.post("tms/selectTender/", formData, config);

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

// SELECTED TOTAL DEPARTMENTAL
export const selectedTotalDepartments = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "SELECTED_TOTAL_DEPARTMENT_REQUEST",
        });

        const { data } = await axios.post("tms/getTotalDepartmentTenders/", formData, config);

        dispatch({
            type: "SELECTED_TOTAL_DEPARTMENT_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "SELECTED_TOTAL_DEPARTMENT_FAILED",
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

        const { data } = await axios.post("tms/getDepartmentTenders/", formData, config);

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

// ASSIGNED TENDERS STATUS 
export const assignedTenderStatus = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "ASSIGNED_TENDER_STATUS_REQUEST",
        });

        const { data } = await axios.post("tms/updateTenderStatus/", formData, config);

        dispatch({
            type: "ASSIGNED_TENDER_STATUS_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "ASSIGNED_TENDER_STATUS_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// INTERESTED TENDERS GET 
export const getInterestedTenders = () => async (dispatch) => {
    try {
        dispatch({
            type: "INTERESTED_TENDERS_GET_REQUEST",
        });

        const { data } = await axios.get("tms/getDepartmentInterestedTenders/", config);

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

        const { data } = await axios.post("tms/proceedTenderForDocumentation/", formData, config);

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
export const AppliedTendersGet = () => async (dispatch) => {
    try {
        dispatch({
            type: "GET_APPLIED_TENDERS_REQUEST",
        });

        const { data } = await axios.get("tms/getAppliedTenders/", config);

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