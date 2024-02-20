import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import './DocDepartment.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Utils/Helper';
import { getAllDepartmentDocs } from '../../../Redux/Action/Dashboard';

const DocDepartment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, departDocData } = useSelector((state) => state.AlldepartDocs)

    useEffect(() => {
        const formData = new FormData();
        formData.append("email", login.email)
        formData.append("token", login.token)

        // dispatch(getAllDepartmentDocs(formData))
    }, [])

    const departmentHandler = (department) => {
        navigate(`enquiry?department=${department}`)
    }

    return (
        <div className='dashboard_main' style={{ padding: "15px 10px" }}>
            <Row>
                <Col md={12}>
                    <h1>Department Documents</h1>
                </Col>
            </Row>

            <div className='mt-3 mx-3'>
                <Row style={{ gap: "15px 0" }}>
                    <Col md={4}>
                        <div className='department_box'>
                            <h5>Aviation</h5>
                            <div>
                                <h6>Total Types</h6>
                                <p>20</p>
                            </div>
                            <div>
                                <h6>Total Docs</h6>
                                <p>15</p>
                            </div>
                            <div className='view_btn'>
                                <button onClick={() => departmentHandler("Aviation")}>View</button>
                            </div>
                        </div>
                    </Col>
                    {/* <Col md={4}>
                        <div className='department_box'>
                            <h5>JHolding</h5>
                            <div>
                                <h6>Total Types</h6>
                                <p>20</p>
                            </div>
                            <div>
                                <h6>Total Docs</h6>
                                <p>15</p>
                            </div>
                            <div className='view_btn'>
                                <button onClick={() => departmentHandler("Aviation")}>View</button>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='department_box'>
                            <h5>IT</h5>
                            <div>
                                <h6>Total Types</h6>
                                <p>20</p>
                            </div>
                            <div>
                                <h6>Total Docs</h6>
                                <p>15</p>
                            </div>
                            <div className='view_btn'>
                                <button onClick={() => departmentHandler("Aviation")}>View</button>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='department_box'>
                            <h5>HR</h5>
                            <div>
                                <h6>Total Types</h6>
                                <p>20</p>
                            </div>
                            <div>
                                <h6>Total Docs</h6>
                                <p>15</p>
                            </div>
                            <div className='view_btn'>
                                <button onClick={() => departmentHandler("Aviation")}>View</button>
                            </div>
                        </div>
                    </Col> */}
                </Row>
            </div>
        </div>
    )
}

export default DocDepartment