import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getDepartments, getSearchDocument } from '../../../Redux/Action/Dashboard';
import Loader from '../../../Utils/Loader';
import { dashboardColorStyles, login } from '../../../Utils/Helper';
import { Col, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { errorNotify } from '../../../Utils/Toast';
import Select from "react-select";
import { MdOutlineClose } from "react-icons/md";
// import { useNavigate } from 'react-router-dom';
import './TenderResults.css';

const TenderResults = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [department, setDepartment] = useState(null);
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)

    useEffect(() => {
        const formData = new FormData();
        formData.append("email", login.email)
        formData.append("token", login.token)

        // dispatch(getDepartments(formData))

        return () => {
            dispatch({ type: "GET_SEARCH_DOCUMENT_RESET" })
        }
    }, [])

    const { loading: searchLoading, getSearchData } = useSelector((state) => state.searchDocumentData)
    const { loading: departmentLoading, departmentsData } = useSelector((state) => state.departmentGet)

    const departOption = departmentsData?.response?.map((d) => {
        return {
            value: d?.id, label: d.name
        }
    })

    const searchDepartmentHandler = () => {
        if (department?.length === 0) {
            errorNotify("Please Select Department")
            return;
        }

        const data = {
            department,
            email: login.email,
            token: login.token
        }
        // dispatch(getSearchDocument(data))
    }

    const modal = <Modal centered className='doc_type' show={show}>
        <Modal.Body>
            <div className='add_doc_type' style={{ transition: "all 0.3s ease" }}>
                <div className='head'>
                    <h5>Document</h5>
                    <MdOutlineClose onClick={() => setShow(false)} />
                </div>
                <Form>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Attached Document <span>*</span></Form.Label>
                                <Form.Control type="file" />
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

    const loseModal = <Modal centered className='doc_type' show={show2}>
        <Modal.Body>
            <div className='add_doc_type' style={{ transition: "all 0.3s ease" }}>
                <div className='head'>
                    <h5>Reason</h5>
                    <MdOutlineClose onClick={() => setShow2(false)} />
                </div>
                <Form>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Comment <span>*</span></Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder='Enter Comment' />
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
        <div className='table_main'>
            {modal}
            {loseModal}
            <div className='application_main'>
                <h1>Assigned Tenders</h1>

                <Row className='m-3 align-items-end'>
                    <Col md={3}>
                        <Form.Group className="form_field">
                            <Form.Label>Department <span>*</span> </Form.Label>
                            <Select isLoading={departmentLoading} onChange={(d) => setDepartment(d.value)} options={departOption} placeholder="Select Department" styles={dashboardColorStyles} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <button className='search_btn' onClick={searchDepartmentHandler} disabled={searchLoading}>
                            {searchLoading ? <Spinner animation='border' size='sm' /> : 'Search'} </button>
                    </Col>
                </Row>
                {
                    searchLoading ? <div className='py-3'> <Loader /></div> :
                        <div className='application_table assigned_tenders'>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>S No.</th>
                                        <th>Tender Name</th>
                                        <th>Tender No.</th>
                                        <th>Uploaded By</th>
                                        <th>Uploaded Date</th>
                                        <th>Due Date</th>
                                        <th>Submitted Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Tender Test</td>
                                        <td>4321</td>
                                        <td>Test</td>
                                        <td>12-02-2024</td>
                                        <td>12:00 PM</td>
                                        <td>5-03-2024</td>
                                        <td>
                                            <span>
                                                <button className='selected_btn not_interested' onClick={() => setShow2(true)}>Loss</button>
                                                <button className='selected_btn interested' onClick={() => setShow(true)}>Win</button>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Tender Test</td>
                                        <td>4321</td>
                                        <td>Test</td>
                                        <td>12-02-2024</td>
                                        <td>12:00 PM</td>
                                        <td>22-02-2024</td>
                                        <td>
                                            <span>
                                                <button className='selected_btn not_interested' onClick={() => setShow2(true)}>Loss</button>
                                                <button className='selected_btn interested' onClick={() => setShow(true)}>Win</button>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Tender Test</td>
                                        <td>4321</td>
                                        <td>Test</td>
                                        <td>12-02-2024</td>
                                        <td>12:00 PM</td>
                                        <td>25-03-2024</td>
                                        <td>
                                            <span>
                                                <button className='selected_btn not_interested' onClick={() => setShow2(true)}>Loss</button>
                                                <button className='selected_btn interested' onClick={() => setShow(true)}>Win</button>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            {/* {getSearchData?.response?.length === 0 && <p className='text-center' style={{ fontWeight: "600" }}>No Data Found</p>} */}
                            {/* {!getSearchData && <p className='text-center' style={{ fontWeight: "600" }}>Please Search Tender By Departments</p>} */}
                        </div>
                }
            </div>
        </div>
    )
}
export default TenderResults