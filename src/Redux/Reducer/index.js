import { combineReducers } from "redux";
import {
    createDocumentReducer, dashboardGetReducer, getAllDepartmentDocsReducer, getDepartAndDocTypeReducer, getDepartmentsReducer,
    getDocTypesReducer,
    getSearchDocumentReducer, getYearsReducer, registerDocumentTypeReducer
} from "./Dashboard";

const rootReducer = combineReducers({

    getDashboard: dashboardGetReducer,
    departmentGet: getDepartmentsReducer,
    docTypesGet: getDocTypesReducer,
    searchDocumentData: getSearchDocumentReducer,
    docTypeRegister: registerDocumentTypeReducer,
    documentCreate: createDocumentReducer,
    departandType: getDepartAndDocTypeReducer,
    AlldepartDocs: getAllDepartmentDocsReducer,
    yearsGet: getYearsReducer

})

export default rootReducer;