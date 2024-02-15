import { combineReducers } from "redux";
import { ApplicationUploadReducer, applicationGetReducer, createDocumentReducer, dashboardGetReducer, 
    formCreateReducer, formSaveReducer, getDepartAndYearReducer, getDocumentLinkReducer, getSearchDocumentReducer, registerDocumentTypeReducer } from "./Dashboard";

const rootReducer = combineReducers({

    //FORM
    postForm: formCreateReducer,
    saveForm: formSaveReducer,

    //TABLE
    getTable: applicationGetReducer,

    //DASHBOARD
    postApplicationUpload: ApplicationUploadReducer,
    postDocumentLink: getDocumentLinkReducer,
    
    // ===================
    
    getDashboard: dashboardGetReducer,
    departandyear: getDepartAndYearReducer,
    searchDocumentData: getSearchDocumentReducer,
    docTypeRegister: registerDocumentTypeReducer,
    documentCreate: createDocumentReducer

})

export default rootReducer;