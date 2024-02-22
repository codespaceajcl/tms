import React, { useEffect, useState } from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardColorStyles, login } from '../../../Utils/Helper';
// import { getAllDepartmentDocs, getDepartments } from '../../../Redux/Action/Dashboard';
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import './InterestedTender.css';

const InterestedTenders = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const [department, setDepartment] = useState(null);
    const [show, setShow] = useState(false)

    useEffect(() => {
        const formData = new FormData();
        formData.append("email", login.email)
        formData.append("token", login.token)

        // dispatch(getDepartments(formData))

        return () => {
            dispatch({ type: "GET_SEARCH_DOCUMENT_RESET" })
        }
    }, [])

    // const { loading, departDocData } = useSelector((state) => state.AlldepartDocs)
    const { loading: departmentLoading, departmentsData } = useSelector((state) => state.departmentGet)

    const proceedHandler = (department) => {
        setShow(true)
    }

    const departOption = departmentsData?.response?.map((d) => {
        return {
            value: d?.id, label: d.name
        }
    })

    const modal = <Modal centered className='doc_type' show={show}>
        <Modal.Body>
            <div className='add_doc_type' style={{ transition: "all 0.3s ease" }}>
                <div className='head'>
                    <h5>Required Documents</h5>
                    <MdOutlineClose onClick={() => setShow(false)} />
                </div>
                <Form>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>No of Documents <span>*</span></Form.Label>
                                <Form.Control type="Number" placeholder="Enter No of Document" />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>No of Comments <span>*</span></Form.Label>
                                <Form.Control type="Number" placeholder="Enter No of Comments" />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <div className='next_btn'>
                                <button> Submit </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal.Body>
    </Modal>

    return (
        <div className='dashboard_main' style={{ padding: "15px 10px" }}>
            {modal}
            <Row>
                <Col md={12}>
                    <h1>Departmental Interested Tender Requests</h1>
                </Col>
            </Row>

            <Row className='m-3 align-items-end pb-3' style={{ borderBottom: "1px solid #8080804d" }}>
                <Col md={3}>
                    <Form.Group className="form_field">
                        <Form.Label>Department <span>*</span> </Form.Label>
                        <Select isLoading={departmentLoading} onChange={(d) => setDepartment(d.value)} options={departOption} placeholder="Select Department" styles={dashboardColorStyles} />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <button className='search_btn'>
                        Search
                    </button>
                </Col>
            </Row>

            <div className='mt-3 mx-3'>
                <Row style={{ gap: "15px 0" }}>
                    <Col md={12}>
                        <div className='interested_tender_box'>
                            <Row className='align-items-center'>
                                <Col md={10}>
                                    <div>
                                        <p><span>Tender Name: </span> Testing1</p>
                                        <p><span>Tender Due Date: </span> <b className='urgent'> 29-2-2024 </b> </p>
                                        <p><span>Tender Description: </span>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                            when an unknown printer took a galley of type and scrambled
                                            it to make a type specimen book.
                                        </p>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className=''>
                                        <button onClick={() => proceedHandler("Aviation")}>Proceed</button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='interested_tender_box'>
                            <Row className='align-items-center'>
                                <Col md={10}>
                                    <div>
                                        <p><span>Tender Name: </span> Testing2</p>
                                        <p><span>Tender Due Date: </span> <b className='not_urgent'> 29-2-2024 </b></p>
                                        <p><span>Tender Description: </span>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                            when an unknown printer took a galley of type and scrambled
                                            it to make a type specimen book.
                                        </p>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className=''>
                                        <button onClick={() => proceedHandler("Aviation")}>Proceed</button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='interested_tender_box'>
                            <Row className='align-items-center'>
                                <Col md={10}>
                                    <div>
                                        <p><span>Tender Name: </span> Testing3</p>
                                        <p><span>Tender Due Date: </span> <b className='near_by'> 29-2-2024 </b></p>
                                        <p><span>Tender Description: </span>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                            when an unknown printer took a galley of type and scrambled
                                            it to make a type specimen book.
                                        </p>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className=''>
                                        <button onClick={() => proceedHandler("Aviation")}>Proceed</button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default InterestedTenders