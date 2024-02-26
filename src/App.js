import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MasterAdminLayout from './Layout/MasterAdminLayout';
import Table from './Container/Pages/Table/Table';
import Dashboard from './Container/Dashboard/Dashboard';
import NotFound from './Container/Pages/NotFound/NotFound';
import HomePage from './Container/Pages/HomePage/HomePage';
import AssignedTenders from './Container/Pages/AssignedTenders/AssignedTenders';
import InterestedTenders from './Container/Pages/InterestedTenders/InterestedTenders';
import Documents from './Container/Pages/Documents/Documents';
import TenderResults from './Container/Pages/TenderResults/TenderResults';

const App = () => {
  return (
    <BrowserRouter basename='/tms'>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <Routes>
        <Route path="/dashboard" element={<MasterAdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/all-tenders" element={<Table />} />
          <Route path="/dashboard/assigned-tenders" element={<AssignedTenders />} />
          <Route path="/dashboard/interested-tenders" element={<InterestedTenders />} />
          <Route path="/dashboard/applied-tenders" element={<Documents />} />
          <Route path="/dashboard/tender-results" element={<TenderResults />} />
          <Route path='/dashboard/' />
        </Route>

        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;