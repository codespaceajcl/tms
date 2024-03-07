import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getDepartments, getSearchDocument } from '../../../Redux/Action/Dashboard';
// import Loader from '../../../Utils/Loader';
import { TableStyles, dashboardColorStyles, login } from '../../../Utils/Helper';
import { Col, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { errorNotify } from '../../../Utils/Toast';
import Select from "react-select";
import { MdOutlineFileDownload } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const AssignedTenders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const { loading: departmentLoading, departmentsData } = useSelector((state) => state.departmentsGet)

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

    const modal = <Modal centered className='doc_type proceed' show={show}>
        <Modal.Body>
            <div className='add_doc_type' style={{ transition: "all 0.3s ease" }}>
                <Form>
                    <Row>
                        <Col md={12}>
                            <h5>Are you sure you want to Proceed?</h5>
                        </Col>
                        <Col md={12}>
                            <div className='next_btn'>
                                <button onClick={() => setShow(false)}> No </button>
                                <button type='button' onClick={() => navigate("/dashboard/interested-tenders")}> Yes, Proceed </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal.Body>
    </Modal>

    const options = [
        { value: "interested", label: "Interested" },
        { value: "not-interested", label: "Not Interested" },
    ]

    return (
        <div className='table_main'>
            {modal}
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
                        <button className='search_btn' onClick={searchDepartmentHandler}>
                            {/* {searchLoading ? <Spinner animation='border' size='sm' /> : 'Search'} */}
                            Search
                        </button>
                    </Col>
                </Row>
                {/* { */}
                {/* searchLoading ? <div className='py-3'>
                        <Loader />
                    </div> : */}
                <div className='application_table assigned_tenders'>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>Tender No.</th>
                                <th>Uploaded By</th>
                                <th>Uploaded Date</th>
                                <th>Due Date</th>
                                <th>Uploaded Time</th>
                                <th>Download</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>4321</td>
                                <td>Test</td>
                                <td>12-02-2024</td>
                                <td>12:00 PM</td>
                                <td> <span className='show_yellow'>5-03-2024</span> </td>
                                <td> <a style={{ paddingLeft: "25px" }}> <MdOutlineFileDownload /> </a> </td>
                                <td>
                                    <span>
                                        <Select placeholder="Select Actions" options={options} styles={TableStyles} />
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>4321</td>
                                <td>Test</td>
                                <td>12-02-2024</td>
                                <td>12:00 PM</td>
                                <td><span className='show_red'>22-02-2024</span></td>
                                <td> <a style={{ paddingLeft: "25px" }}><MdOutlineFileDownload /></a> </td>
                                <td>
                                    <span>
                                        <Select placeholder="Select Actions" options={options} styles={TableStyles} />
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>4321</td>
                                <td>Test</td>
                                <td>12-02-2024</td>
                                <td>12:00 PM</td>
                                <td><span className='show_green'>25-03-2024</span></td>
                                <td> <a style={{ paddingLeft: "25px" }}><MdOutlineFileDownload /></a> </td>
                                <td>
                                    <span>
                                        <Select placeholder="Select Actions" options={options} styles={TableStyles} />
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    {/* {getSearchData?.response?.length === 0 && <p className='text-center' style={{ fontWeight: "600" }}>No Data Found</p>} */}
                    {/* {!getSearchData && <p className='text-center' style={{ fontWeight: "600" }}>Please Search Tender By Departments</p>} */}
                </div>
                {/* } */}
            </div>
        </div>
    )
}
export default AssignedTenders