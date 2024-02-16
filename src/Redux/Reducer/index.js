import { combineReducers } from "redux";
import {
    createDocumentReducer, dashboardGetReducer, getAllDepartmentDocsReducer, getDepartAndDocTypeReducer, getDepartAndYearReducer,
    getSearchDocumentReducer, registerDocumentTypeReducer
} from "./Dashboard";

const rootReducer = combineReducers({

    getDashboard: dashboardGetReducer,
    departandyear: getDepartAndYearReducer,
    searchDocumentData: getSearchDocumentReducer,
    docTypeRegister: registerDocumentTypeReducer,
    documentCreate: createDocumentReducer,
    departandType: getDepartAndDocTypeReducer,
    AlldepartDocs: getAllDepartmentDocsReducer

})

export default rootReducer;