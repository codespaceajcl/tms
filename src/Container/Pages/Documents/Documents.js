import React, { useEffect, useState } from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { departmentStyles } from '../../../Utils/Helper';
import { AppliedTendersGet, appliedTenderDocument, selectedTotalDepartments } from '../../../Redux/Action/Dashboard';
import { MdOutlineClose, MdOutlineFileDownload } from "react-icons/md";
import Select from "react-select";
import Loader from '../../../Utils/Loader';
import './Documents.css';

const Documents = () => {
    const dispatch = useDispatch();

    const [department, setDepartment] = useState(null);
    const [show, setShow] = useState(false)
    const [detailShow, setDetailShow] = useState(false)
    const [docDetails, setDocDetails] = useState({})
    const [appliedTenders, setAppliedTenders] = useState([]);
    const [tab, setTab] = useState("all");

    useEffect(() => {
        dispatch(selectedTotalDepartments())
        dispatch(AppliedTendersGet())
    }, [])

    const { loading: departmentLoading, getTotalDepartments } = useSelector((state) => state.selectedTendersDepartments)
    const { loading, getAppliedTendersData } = useSelector((state) => state.appliedTendersData)

    useEffect(() => {
        if (getAppliedTendersData?.response) {
            setAppliedTenders(getAppliedTendersData?.response)
        }
    }, [getAppliedTendersData])

    const submitDocHandler = (data) => {
        setDocDetails(data)
        setShow(true)
    }

    const departOption = Array.isArray(getTotalDepartments?.response) && getTotalDepartments?.response?.map((d) => {
        return {
            value: d?.department, label: d.department
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

    const commentHandler = (value, name) => {
        const updatedUploadedDocuments = { ...docDetails.uploadedComments };
        updatedUploadedDocuments[name] = value;
        setDocDetails({
            ...docDetails,
            uploadedComments: updatedUploadedDocuments
        });
    }

    const docFileHandler = (value, name) => {
        const updatedUploadedDocuments = { ...docDetails.uploadedDocuments };
        updatedUploadedDocuments[name] = value.files[0];
        setDocDetails({
            ...docDetails,
            uploadedDocuments: updatedUploadedDocuments
        });
    }

    const submitDocsHandler = () => {
        const formData = new FormData();
        for (let i in docDetails) {
            if (i === 'uploadedComments') {
                formData.append(i, JSON.stringify(docDetails[i]))
            }
            else if (i === 'uploadedDocuments') {
                formData.append(i, JSON.stringify(docDetails[i]))
            }
            else if (i === 'uploadedDocuments') {
                for (let v in docDetails["uploadedDocuments"]) {
                    formData.append(v, docDetails["uploadedDocuments"][v])
                }
            }
            else {
                formData.append(i, docDetails[i])
            }
        }

        for (let v of formData) {
            console.log(v)
        }

        // dispatch(appliedTenderDocument(formData))
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
                            docDetails?.documentNames?.split(",")?.map((n, i) => {
                                return (
                                    <>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className='d-flex justify-content-between'>
                                                    <p>{n}<span> *</span> </p>
                                                    {
                                                        !docDetails.uploadedDocuments[n] &&
                                                        <span>Deadline: {docDetails?.documentDeadlines?.split(",")[i]}</span>
                                                    }
                                                </Form.Label>
                                                {
                                                    docDetails.uploadedDocuments[n] ?
                                                        <button type='button' className='download_btn'>Download</button> :
                                                        <Form.Control type="file" onChange={(e) => docFileHandler(e.target, n)} />
                                                }
                                            </Form.Group>
                                        </Col>
                                    </>
                                )
                            })
                        }

                        <Col md={12}> <h6>Comments</h6> </Col>
                        {
                            docDetails?.commenterNames?.split(",")?.map((c, i) => {
                                return (
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>{c} Comment <span>*</span></Form.Label>
                                            <Form.Control type="text" placeholder={`Enter ${c} Comment`}
                                                value={docDetails?.uploadedComments[c] ? docDetails.uploadedComments[c] : null}
                                                onChange={(e) => commentHandler(e.target.value, c)} />
                                        </Form.Group>
                                    </Col>
                                )
                            })
                        }
                        <Col md={12}>
                            <div className='next_btn'>
                                <button type='button' onClick={submitDocsHandler}> Submit </button>
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

    const searchByDepartmentHandler = () => {
        let filterTender = getAppliedTendersData?.response?.filter((t) => t.department === department)
        setAppliedTenders(filterTender)
    }

    return (
        <div className='dashboard_main' style={{ padding: "15px 10px" }}>
            {modal}
            {modal2}

            <h1>Applied Tenders</h1>

            <Row className='align-items-end pb-3' style={{ borderBottom: "1px solid #8080804d" }}>
                <Col md={3}>
                    <Form.Group className="form_field">
                        <Form.Label>Department <span>*</span> </Form.Label>
                        <Select isLoading={departmentLoading} onChange={(d) => setDepartment(d.value)} options={departOption} placeholder="Select Department" styles={departmentStyles} />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <button className='search_btn' onClick={searchByDepartmentHandler}> Search </button>
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
                                appliedTenders?.map((t) => {
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
                            {appliedTenders?.length === 0 && <h5 style={{ fontWeight: "600" }} className='text-center my-3'>No Data Found</h5>}
                        </Row>
                }
            </div>
        </div>
    )
}
export default Documents;