import { combineReducers } from "redux";
import {
    getDepartmentsReducer, dashboardGetReducer, getAllTendersReducer, addDepartmentReducer, selectDepartmentReducer,
    getAssignedTendersReducer, assignedTenderSelectReducer, getInterestedTendersReducer, interestedTenderDocumentsReducer,
    getAppliedTendersReducer, appliedTenderDocumentReducer, getTendersResultsReducer, tendersResultsWinReducer, getAllTendersCompaniesReducer, getIntrestedTenderCompaniesReducer, userCompaniesFilterReducer, selectedTotalDepartmentsReducer, assignedTenderStatusReducer
} from "./Dashboard";
import { emailTokenReducer } from "./persistEmail";

const rootReducer = combineReducers({
    getDashboard: dashboardGetReducer,
    TendersCompaniesData: getAllTendersCompaniesReducer,
    interestedTenderCompaniesData: getIntrestedTenderCompaniesReducer,
    TendersAllData: getAllTendersReducer,
    userCompaniesFilterData: userCompaniesFilterReducer,
    departmentsGet: getDepartmentsReducer,
    departmentAdd: addDepartmentReducer,
    departmentSelect: selectDepartmentReducer,
    selectedTendersDepartments: selectedTotalDepartmentsReducer,
    assignedTendersGet: getAssignedTendersReducer,
    selectAssignedTenders: assignedTenderStatusReducer,
    interestedTendersGet: getInterestedTendersReducer,
    documentInterestedTender: interestedTenderDocumentsReducer,
    appliedTendersData: getAppliedTendersReducer,

    
    appliedTenderDocumentData: appliedTenderDocumentReducer,
    getTendersResultsData: getTendersResultsReducer,
    tendersResultsWinData: tendersResultsWinReducer,


    getEmailToken: emailTokenReducer
})

export default rootReducer;