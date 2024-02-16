import React, { useEffect } from 'react';
import './HomePage.css';
import { useLocation, useNavigate } from 'react-router-dom';
// import { getCurrentUserProfile } from '../../../Redux/Action/Admin';
import { useDispatch } from 'react-redux';
import { errorNotify } from '../../../Utils/Toast';

const HomePage = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search)
    const email = searchParams.get("email")
    const access = searchParams.get("access")

    useEffect(() => {
        if (email && access) {
            localStorage.setItem("email", email)
            localStorage.setItem("token", access)
        }
    }, [email & access])

    // useEffect(() => {

    //     const formData = new FormData()
    //     formData.append("email", email)
    //     formData.append("token", access)

    //     dispatch(getCurrentUserProfile(formData))
    // }, [])

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            if (email && access) {
                navigate('/dashboard');
            }
            else {
                errorNotify("Access Denied")
            }
        }, 3000);

        return () => clearTimeout(redirectTimer);
    }, []);

    return (
        <div className='loading_main home_page'>
            <div class="spinner"></div>
            <h6>Archival Loading...</h6>
        </div>
    )
}

export default HomePage