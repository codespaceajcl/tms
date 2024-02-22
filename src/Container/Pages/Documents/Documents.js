import React, { useEffect, useState } from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardColorStyles, login } from '../../../Utils/Helper';
// import { getAllDepartmentDocs, getDepartments } from '../../../Redux/Action/Dashboard';
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import './Documents.css';

const Documents = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const [department, setDepartment] = useState(null);
    const [show, setShow] = useState(false)
    const [tab, setTab] = useState("all")

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

    const modal = <Modal centered className='doc_type' show={show} size='lg'>
        <Modal.Body>
            <div className='add_doc_type' style={{ transition: "all 0.3s ease" }}>
                <div className='head'>
                    <h5>Required Documents</h5>
                    <MdOutlineClose onClick={() => setShow(false)} />
                </div>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name 1 <span>*</span></Form.Label>
                                <Form.Control type="text" placeholder="Enter Name 1" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Document 1 <span>*</span></Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name 2 <span>*</span></Form.Label>
                                <Form.Control type="text" placeholder="Enter Name 2" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Document 2 <span>*</span></Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                        </Col>
                        <hr />
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Comments 1 <span>*</span></Form.Label>
                                <Form.Control type="text" placeholder="Enter Comment 1" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Comments 2 <span>*</span></Form.Label>
                                <Form.Control type="text" placeholder="Enter Comments 2" />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <div className='next_btn'>
                                <button> Apply </button>
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
                    <h1>Documents</h1>
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

            <div className='documents_tabs'>
                <button onClick={() => setTab("all")} className={tab === "all" && 'active'}>All Documents</button>
                <button onClick={() => setTab("pending")} className={tab === "pending" && 'active'}>Pending Documents</button>
                <button onClick={() => setTab("completed")} className={tab === "completed" && 'active'}>Completed Documents</button>
            </div>

            <div className='mt-3 mx-3'>
                <Row style={{ gap: "15px 0" }}>
                    <Col md={6}>
                        <div className='interested_tender_box'>
                            <Row className='align-items-center'>
                                <Col md={12}>
                                    <div>
                                        <p><span>Tender Name: </span> Testing1</p>
                                        <p><span>Tender Due Date: </span> <b className='urgent'> 29-2-2024 </b> </p>
                                        <p><span>Status: </span> <b className='urgent'>Pending</b></p>
                                        <p><span>Tender Description: </span>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.....
                                        </p>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='d-flex' style={{ gap: "15px" }}>
                                        <button>Details</button>
                                        <button onClick={() => proceedHandler("Aviation")}>Submit Docs.</button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='interested_tender_box'>
                            <Row className='align-items-center'>
                                <Col md={12}>
                                    <div>
                                        <p><span>Tender Name: </span> Testing2</p>
                                        <p><span>Tender Due Date: </span> <b className='not_urgent'> 29-2-2024 </b></p>
                                        <p><span>Status: </span> <b className='urgent'>Pending</b></p>
                                        <p><span>Tender Description: </span>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry....
                                        </p>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='d-flex' style={{ gap: "15px" }}>
                                        <button>Details</button>
                                        <button onClick={() => proceedHandler("Aviation")}>Submit Docs.</button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='interested_tender_box'>
                            <Row className='align-items-center'>
                                <Col md={12}>
                                    <div>
                                        <p><span>Tender Name: </span> Testing3</p>
                                        <p><span>Tender Due Date: </span> <b className='near_by'> 29-2-2024 </b></p>
                                        <p><span>Status: </span> <b className='not_urgent'>Submitted</b></p>
                                        <p><span>Tender Description: </span>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.....
                                        </p>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='d-flex' style={{ gap: "15px" }}>
                                        <button>Details</button>
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
export default Documents;