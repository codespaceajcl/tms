import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { RiLogoutCircleRLine } from "react-icons/ri";
import './Sidebar.css';

const Sidebar = ({ dashboardSidebar }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [show, setShow] = useState(false)

    const logoutHandler = () => {
        window.location.href = "https://crms.ajcl.net/mainMenu.html"
    }

    const modal = <Modal show={show} centered className='logout_modal'>
        <Modal.Body>
            <h3>Are you sure you want to logout?</h3>
            <div className='d-flex justify-content-center' style={{ gap: "20px" }}>
                <button onClick={logoutHandler}>Yes</button>
                <button className='no_btn' onClick={() => setShow(false)}>No</button>
            </div>
        </Modal.Body>
    </Modal>

    return (
        <div className='sidebar_main'>
            {modal}
            <ul>
                {
                    dashboardSidebar?.map((s) => {
                        return (
                            <li key={s.title} className={pathname.split('/')[2] === s.path.split("/")[2] ? 'side_active' : ''}
                                onClick={s.path.length > 0 ? () => navigate(s.path) : () => setShow(true)}>
                                {s.icon}
                                <span>{s.title}</span>
                            </li>
                        )
                    })
                }
                <li onClick={() => setShow(true)}>
                    <RiLogoutCircleRLine />
                    <span>Logout</span>
                </li>
            </ul>
        </div>
    )
}
export default Sidebar;