import { MdClose } from "react-icons/md";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import userAvatar from "../../images/user_avatar.png"

function MobileSidebar({ navbarRef, NavHandler, sideBarItems }) {
    const { pathname } = useLocation();
    const getEmail = localStorage.getItem("email")

    useEffect(() => {
        navbarRef.current.style.width = "0%";
    }, [pathname]);

    const logoutHandler = () => {
        window.location.href = "https://crms.ajcl.net/mainMenu.html"
    }

    return (
        <div className="overlay" ref={navbarRef}>
            <span className="closebtn" onClick={NavHandler}> <MdClose /> </span>
            <div className={"overlay-content"}>
                <div className="d-flex align-items-center text-white gap-2 mb-3">
                    <div className="mobile_sidebar_avatar">
                        <img src={userAvatar} alt="" />
                    </div>
                    <div>
                        <h6>{getEmail?.split("@")[0]}</h6>
                    </div>
                </div>
                {sideBarItems?.map((item, index) => {
                    return (
                        <Link key={item.path} to={item.path} className={pathname === item.path ? "nav-active" : "nav-link"}>
                            <span className="overlay-content-number"> {index < 9 ? `0${index + 1}` : `${index + 1}`} - </span>
                            {item.title}
                        </Link>
                    );
                })}
                <Link className={"nav-link"} onClick={logoutHandler}>
                    <span className="overlay-content-number"> 0{sideBarItems?.length + 1} - </span>
                    Logout
                </Link>
            </div>
        </div>
    );
}
export default MobileSidebar;