import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import { dashboardSidebar } from "../Utils/Helper";

const MasterAdminLayout = () => {
    return (
        <div>
            {
                <>
                    <Header />
                    <div className="dashboard_div">
                        <div className="left_dashboard">
                            <Sidebar dashboardSidebar={dashboardSidebar} />
                        </div>
                        <div className="right_dashboard">
                            <Outlet />
                        </div>
                    </div>
                </>
            }
        </div>
    );
};
export default MasterAdminLayout;