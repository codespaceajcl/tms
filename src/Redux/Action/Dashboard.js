import axios from "axios";

// =====================

export const dashboardGet = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "DASHBOARD_GET_REQUEST",
        });

        const { data } = await axios.post("archival/getDashboard/", formData);

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

export const getDepartAndYear = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_DEPART_AND_YEAR_REQUEST",
        });

        const { data } = await axios.post("archival/getDepartmentAndYears/", formData);

        dispatch({
            type: "GET_DEPART_AND_YEAR_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "GET_DEPART_AND_YEAR_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const getSearchDocument = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_SEARCH_DOCUMENT_REQUEST",
        });

        const { data } = await axios.post("archival/searchDocument/", formData);

        dispatch({
            type: "GET_SEARCH_DOCUMENT_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "GET_SEARCH_DOCUMENT_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const registerDocumentType = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "REGISTER_DOC_TYPE_REQUEST",
        });

        const { data } = await axios.post("archival/registerDocType/", formData);

        dispatch({
            type: "REGISTER_DOC_TYPE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "REGISTER_DOC_TYPE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const createDocument = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "CREATE_DOCUMENT_REQUEST",
        });

        const { data } = await axios.post("archival/createDocument/", formData);

        dispatch({
            type: "CREATE_DOCUMENT_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "CREATE_DOCUMENT_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};