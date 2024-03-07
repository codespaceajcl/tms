import { combineReducers } from "redux";
import {
    getDepartmentsReducer, dashboardGetReducer, getAllTendersReducer, addDepartmentReducer, selectDepartmentReducer,
    getAssignedTendersReducer, assignedTenderSelectReducer, getInterestedTendersReducer, interestedTenderDocumentsReducer,
    getAppliedTendersReducer, appliedTenderDocumentReducer, getTendersResultsReducer, tendersResultsWinReducer
} from "./Dashboard";

const rootReducer = combineReducers({
    getDashboard: dashboardGetReducer,
    TendersAllData: getAllTendersReducer,
    departmentsGet: getDepartmentsReducer,
    departmentAdd: addDepartmentReducer,
    departmentSelect: selectDepartmentReducer,
    assignedTendersGet: getAssignedTendersReducer,
    selectAssignedTenders: assignedTenderSelectReducer,
    interestedTendersGet: getInterestedTendersReducer,
    documentInterestedTender: interestedTenderDocumentsReducer,
    appliedTendersData: getAppliedTendersReducer,
    appliedTenderDocumentData: appliedTenderDocumentReducer,
    getTendersResultsData: getTendersResultsReducer,
    tendersResultsWinData: tendersResultsWinReducer,


})

export default rootReducer;