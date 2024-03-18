import React, { useEffect, useState } from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardColorStyles, departmentStyles, login } from '../../../Utils/Helper';
import { AppliedTendersGet } from '../../../Redux/Action/Dashboard';
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { MdOutlineFileDownload } from "react-icons/md";
import './Documents.css';
import Loader from '../../../Utils/Loader';

const Documents = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const [department, setDepartment] = useState(null);
    const [show, setShow] = useState(false)
    const [detailShow, setDetailShow] = useState(false)
    const [docDetails, setDocDetails] = useState({})
    const [tab, setTab] = useState("all");

    useEffect(() => {
        const formData = new FormData();
        formData.append("email", login.email)
        formData.append("token", login.token)

        dispatch(AppliedTendersGet())

        return () => {
            dispatch({ type: "GET_SEARCH_DOCUMENT_RESET" })
        }
    }, [])

    const { loading: departmentLoading, departmentsData } = useSelector((state) => state.departmentsGet)
    const { loading, getAppliedTendersData } = useSelector((state) => state.appliedTendersData)

    const submitDocHandler = (data) => {
        setDocDetails(data)
        setShow(true)
    }

    const departOption = departmentsData?.response?.map((d) => {
        return {
            value: d?.id, label: d?.name
        }
    })

    const tenderDate = (closingDate) => {
        let currentDate = new Date();
        let dueDate = new Date(closingDate);

        let differenceInDays = Math.floor((dueDate - currentDate) / (1000 * 60 * 60 * 24))

        if (differenceInDays < 10) {
            return "urgent";
        }
        else if (differenceInDays <= 30 && differenceInDays > 10) {
            return "near_by";
        }
        else {
            return "not_urgent";
        }
    }

    const modal = <Modal centered className='doc_type' show={show} size='lg'>
        <Modal.Body>
            <div className='add_doc_type req_documents' style={{ transition: "all 0.3s ease" }}>
                <div className='head'>
                    <h5>Required Documents</h5>
                    <MdOutlineClose onClick={() => setShow(false)} />
                </div>
                <Form>
                    <Row>
                        <Col md={12}> <h6>Documents</h6> </Col>
                        {
                            docDetails?.documentNames?.split(",").map((n, i) => {
                                return (
                                    <>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{n} <span>(Deadline: {docDetails?.documentDeadlines?.split(",")[i]})</span>
                                                    <span> *</span></Form.Label>
                                                <Form.Control type="file" />
                                            </Form.Group>
                                        </Col>
                                    </>
                                )
                            })
                        }

                        <Col md={12}> <h6>Comments</h6> </Col>
                        {
                            docDetails?.commenterNames?.split(",")?.map((c) => {
                                return (
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>{c} Comment <span>*</span></Form.Label>
                                            <Form.Control type="text" placeholder={`Enter ${c} Comment`} />
                                        </Form.Group>
                                    </Col>
                                )
                            })
                        }
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

    const modal2 = <Modal centered className='doc_type' show={detailShow} size='lg'>
        <Modal.Body>
            <div className='add_doc_type' style={{ transition: "all 0.3s ease" }}>
                <div className='head'>
                    <h5>Document Detail</h5>
                    <MdOutlineClose onClick={() => setDetailShow(false)} />
                </div>
                <div className='doc_details'>
                    <div>
                        <h6>Tender Company:</h6>
                        <p>{docDetails.company}</p>
                    </div>
                    <div>
                        <h6>Advertise Date:</h6>
                        <p>{docDetails.advertiseDate}</p>
                    </div>
                    <div>
                        <h6>Department:</h6>
                        <p>{docDetails.department}</p>
                    </div>
                    <div>
                        <h6>Selected By:</h6>
                        <p>{docDetails.selectedBy}</p>
                    </div>
                    <div>
                        <h6>Tender Description</h6>
                        <p>{docDetails.detail}</p>
                    </div>
                </div>
            </div>
        </Modal.Body>
    </Modal>

    return (
        <div className='dashboard_main' style={{ padding: "15px 10px" }}>
            {modal}
            {modal2}
            <Row>
                <Col md={12}>
                    <h1>Documents</h1>
                </Col>
            </Row>

            <Row className='m-3 align-items-end pb-3' style={{ borderBottom: "1px solid #8080804d" }}>
                <Col md={3}>
                    <Form.Group className="form_field">
                        <Form.Label>Department <span>*</span> </Form.Label>
                        <Select isLoading={departmentLoading} onChange={(d) => setDepartment(d.value)} options={departOption} placeholder="Select Department" styles={departmentStyles} />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <button className='search_btn'>
                        Search
                    </button>
                </Col>
            </Row>

            <div className='documents_tabs'>
                <button onClick={() => setTab("all")} className={tab === "all" ? 'active' : undefined}>All Documents</button>
                <button onClick={() => setTab("pending")} className={tab === "pending" ? 'active' : undefined}>Pending Documents</button>
                <button onClick={() => setTab("completed")} className={tab === "completed" ? 'active' : undefined}>Completed Documents</button>
            </div>

            <div className='mt-3 mx-3'>
                {
                    loading ? <Loader /> :
                        <Row style={{ gap: "15px 0" }}>
                            {
                                getAppliedTendersData?.response?.map((t) => {
                                    return (
                                        <Col md={6}>
                                            <div className='interested_tender_box'>
                                                <Row className='align-items-center'>
                                                    <Col md={12}>
                                                        <div>
                                                            <p><span>Company Name: </span> {t.company} <a href={t.document} target='_blank' style={{ paddingLeft: "25px", fontSize: "20px" }}><MdOutlineFileDownload /></a></p>
                                                            <p><span>Tender No.</span> {t.tenderNo}</p>
                                                            <p><span>Tender Closing Date: </span> <b className={tenderDate(t.closingDate)}> {t.closingDate} - {t.closingTime} </b> </p>
                                                            <p><span>Docs. Requirements: </span> <b className='urgent'>Pending</b></p>
                                                            <p><span>Tender Description: </span> {t.detail} </p>
                                                        </div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='d-flex' style={{ gap: "15px" }}>
                                                            <button onClick={() => {
                                                                setDetailShow(true)
                                                                setDocDetails(t)
                                                            }}>Details</button>
                                                            <button onClick={() => submitDocHandler(t)}>Submit Docs.</button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                }
            </div>
        </div>
    )
}
export default Documents;