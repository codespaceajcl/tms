import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import { dashboardSidebar } from "../Utils/Helper";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";

const MasterAdminLayout = () => {
    const [sidebarClose, setSidebarClose] = useState(false)

    const closeHandler = () => {
        setSidebarClose(!sidebarClose)
    }

    return (
        <div>
            {
                <>
                    <Header />
                    <div className={sidebarClose ? "dashboard_div close_leftsider" : "dashboard_div"}>
                        <div className="left_dashboard">
                            <div className="close_sidebar">
                                {
                                    !sidebarClose ?
                                        <IoMdCloseCircleOutline onClick={closeHandler} /> :
                                        <GiHamburgerMenu onClick={closeHandler} />
                                }
                            </div>
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