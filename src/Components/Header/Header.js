import React, { useRef } from 'react';
import { Container, Nav, Navbar } from "react-bootstrap"
import MobileSidebar from './MobileSidebar';
import dashboardSidebar from '../../Container/Dashboard/Routes/Routes';
import mainLogo from "../../images/ajcl_logo.png";
import userAvatar from "../../images/user_avatar.png";
import './Header.css';

const Header = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const navbarRef = useRef();

    const NavHandler = () => {
        if (navbarRef.current.style.width === "100%")
            navbarRef.current.style.width = "0%";
        else navbarRef.current.style.width = "100%";
    };

    return (
        <div>
            <MobileSidebar
                navbarRef={navbarRef}
                NavHandler={NavHandler}
                sideBarItems={dashboardSidebar}
            />
            <Navbar className="main_header" collapseOnSelect expand="lg">
                <Container fluid>
                    <Navbar.Brand>
                        <div>
                            <img src={mainLogo} alt='' />
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={NavHandler} />

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <div className='user_detail'>
                                <div>
                                    <p>Greetings,</p>
                                    <h6>{currentUser?.name}</h6>
                                </div>
                                <div className='user_img'>
                                    <img src={userAvatar} alt='' />
                                </div>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default Header;