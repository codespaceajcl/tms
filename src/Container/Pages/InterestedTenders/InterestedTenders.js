import React, { useEffect, useState } from 'react'
import { Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { departmentStyles, login } from '../../../Utils/Helper';
import Select from "react-select";
import { MdOutlineFileDownload, MdOutlineClose } from "react-icons/md";
import { getInterestedTenders, interestedTenderDocuments, selectedTotalDepartments } from '../../../Redux/Action/Dashboard';
import Loader from '../../../Utils/Loader';
import { errorNotify, successNotify } from '../../../Utils/Toast';
import './InterestedTender.css';

const InterestedTenders = () => {
    const dispatch = useDispatch();

    const [department, setDepartment] = useState(null);
    const [show, setShow] = useState(false)
    const [numDocs, setNumDocs] = useState(undefined);
    const [docDetails, setDocDetails] = useState([{ name: "", deadline: "" }]);
    const [numComment, setNumComment] = useState(undefined);
    const [commentNames, setCommentNames] = useState([{ name: "" }]);
    const [interestedTenders, setInterestedTenders] = useState([]);
    const [tenderId, setTenderId] = useState('')

    useEffect(() => {
        dispatch(selectedTotalDepartments())
        dispatch(getInterestedTenders())

        return () => {
            dispatch({ type: "GET_SEARCH_DOCUMENT_RESET" })
        }
    }, [])

    const { loading: departmentLoading, getTotalDepartments } = useSelector((state) => state.selectedTendersDepartments)
    const { loading, interestedTendersData } = useSelector((state) => state.interestedTendersGet)
    const { loading: interestedLoading, interestedTenderDocumentData } = useSelector((state) => state.documentInterestedTender)

    useEffect(() => {
        if (interestedTendersData?.response) {
            setInterestedTenders(interestedTendersData?.response)
        }
    }, [interestedTendersData])

    useEffect(() => {
        if (interestedTenderDocumentData?.response) {
            successNotify("Submitted Successfully!");

            dispatch({ type: "INTERESTED_TENDER_DOCUMENTS_RESET" })
            dispatch(getInterestedTenders())
            setShow(false)
        }
    }, [interestedTenderDocumentData])

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

    const proceedHandler = (getId) => {
        setTenderId(getId)
        setShow(true)
    }

    const departOption = Array.isArray(getTotalDepartments?.response) && getTotalDepartments?.response?.map((d) => {
        return {
            value: d?.department, label: d.department
        }
    })

    const handleNumOfDocumentsChange = (e) => {
        let value = parseInt(e.target.value);
        value = Math.min(Math.max(value, 0), 10);
        setNumDocs(value);

        if (value <= 10) {
            setDocDetails(prevDetails => {
                const newDetails = [...prevDetails];
                while (newDetails.length < value) {
                    newDetails.push({ name: '', deadline: '' });
                }
                return newDetails.slice(0, value);
            });
        }
    };

    const handleDocumentChange = (index, field, value) => {
        setDocDetails(prevDetails => {
            const newDetails = [...prevDetails];
            newDetails[index][field] = value;
            return newDetails;
        });
    };

    const handleNumOfComments = (e) => {
        let value = parseInt(e.target.value);
        value = Math.min(Math.max(value, 0), 10);
        setNumComment(value);

        if (value <= 10) {
            setCommentNames(prevDetails => {
                const newDetails = [...prevDetails];
                while (newDetails.length < value) {
                    newDetails.push({ name: '' });
                }
                return newDetails.slice(0, value);
            })
        }
    }

    const handleCommentInputChange = (index, field, value) => {
        setCommentNames(prevDetails => {
            const newDetails = [...prevDetails];
            newDetails[index][field] = value;
            return newDetails;
        });
    }

    const hasEmptyValue = (arr) => {
        return arr.some(value => value === '');
    };

    const submitDocsHandler = () => {

        let documentNames = [];
        let documentDeadlines = [];
        let commenterNames = [];

        docDetails.map((d) => {
            documentNames.push(d.name);
            documentDeadlines.push(d.deadline)
        })

        commentNames.map((c) => {
            commenterNames.push(c.name)
        })

        if (commenterNames.length === 0 || documentNames.length === 0 || documentDeadlines.length === 0) {
            errorNotify('Please Filled up all Fields');
            return;
        }

        else if (hasEmptyValue(commenterNames) || hasEmptyValue(documentNames) || hasEmptyValue(documentDeadlines)) {
            errorNotify('Please Filled up all Fields');
            return;
        }

        const formData = new FormData();
        formData.append("tender", tenderId)
        formData.append("documentNames", documentNames)
        formData.append("documentDeadlines", documentDeadlines)
        formData.append("commenterNames", commenterNames)

        dispatch(interestedTenderDocuments(formData))
    }

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
                                <Form.Control type="Number" placeholder="Enter No of Document"
                                    value={numDocs}
                                    onChange={handleNumOfDocumentsChange}
                                />
                            </Form.Group>

                            {numDocs > 0 && [...Array(numDocs)].map((_, index) => (
                                <Row className='mb-3' key={index}>
                                    <Col md={6}>
                                        <Form.Label>{`Document Name ${index + 1}`} <span>*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={`Enter Document Name ${index + 1}`}
                                            value={docDetails[index].name}
                                            onChange={(e) => handleDocumentChange(index, 'name', e.target.value)}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label>{`Deadline ${index + 1}`} <span>*</span></Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={docDetails[index].deadline}
                                            onChange={(e) => handleDocumentChange(index, 'deadline', e.target.value)}
                                        />
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>No of Comments <span>*</span></Form.Label>
                                <Form.Control type="Number" placeholder="Enter No of Comments"
                                    value={numComment}
                                    onChange={handleNumOfComments}
                                />
                            </Form.Group>

                            <Row>
                                {numComment > 0 && [...Array(numComment)].map((_, index) => (
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Comment {index + 1} <span>*</span> </Form.Label>
                                            <Form.Control type='text' placeholder={`Comment ${index + 1}`}
                                                value={commentNames[index].name}
                                                onChange={(e) => handleCommentInputChange(index, 'name', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col md={12}>
                            <div className='next_btn'>
                                <button type='button' onClick={submitDocsHandler} disabled={interestedLoading}>
                                    {interestedLoading ? <Spinner animation='border' size='sm' /> : 'Submit'} </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal.Body>
    </Modal>

    const searchByDepartmentHandler = () => {
        let filterTender = interestedTendersData?.response?.filter((t) => t.department === department)
        setInterestedTenders(filterTender)
    }

    return (
        <div className='dashboard_main' style={{ padding: "15px 10px" }}>
            {modal}
            <h1>Interested Tender Requests</h1>

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

            <div className='mt-3 mx-3'>
                {
                    loading ? <Loader /> :
                        <Row style={{ gap: "15px 0" }}>
                            {
                                interestedTenders?.map((t) => {
                                    return (
                                        <Col md={12}>
                                            <div className='interested_tender_box'>
                                                <Row className='align-items-center'>
                                                    <Col md={10}>
                                                        <div>
                                                            <p><span>Tender No.</span> {t.tenderNo} </p>
                                                            <p><span>Tender Company: </span> {t.company}  <a style={{ paddingLeft: "25px", fontSize: "20px" }} href={t.document}><MdOutlineFileDownload /></a> </p>
                                                            <p><span>Tender Advertise Date: </span> {t.advertiseDate} </p>
                                                            <p><span>Tender Closing Date: </span> <b className={tenderDate(t.closingDate)}> {t.closingDate} - {t.closingTime} </b> </p>
                                                            <p><span>Tender Detail: </span> {t.detail} </p>
                                                        </div>
                                                    </Col>
                                                    <Col md={2}>
                                                        <div className=''>
                                                            <button onClick={() => proceedHandler(t.id)}>Proceed</button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                            {interestedTenders?.length === 0 && <h5 style={{ fontWeight: "600" }} className='text-center my-3'>No Data Found</h5>}
                        </Row>
                }
            </div>
        </div>
    )
}
export default InterestedTenders;