import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Utils/Loader';
import { TableStyles, departmentStyles } from '../../../Utils/Helper';
import { Col, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { errorNotify, successNotify } from '../../../Utils/Toast';
import Select from "react-select";
import { MdOutlineFileDownload } from "react-icons/md";
import { assignedTenderStatus, getAssignedTenders, selectedTotalDepartments } from '../../../Redux/Action/Dashboard';

const AssignedTenders = () => {
    const dispatch = useDispatch();

    const [department, setDepartment] = useState(null);
    const [show, setShow] = useState(false)
    const [proceedTender, setProceedTender] = useState({
        tenderId: '',
        status: ''
    })

    useEffect(() => {
        dispatch(selectedTotalDepartments())

        return () => {
            dispatch({ type: "GET_ALL_ASSIGNED_TENDERS_RESET" })
        }
    }, [])

    const { loading: departmentLoading, getTotalDepartments } = useSelector((state) => state.selectedTendersDepartments)
    const { loading: Loading, assignedTenderData } = useSelector((state) => state.assignedTendersGet)
    const { loading: assignLoading, assignedTenderSelectData } = useSelector((state) => state.selectAssignedTenders)

    useEffect(() => {
        if (assignedTenderSelectData?.response === "success") {
            successNotify("Proceed Successfully!");
            setShow(false)

            dispatch({ type: "GET_ALL_ASSIGNED_TENDERS_RESET" })
            dispatch({ type: "ASSIGNED_TENDER_STATUS_RESET" })

        }
    }, [assignedTenderSelectData])

    const departOption = Array.isArray(getTotalDepartments?.response) && getTotalDepartments?.response?.map((d) => {
        return {
            value: d?.department, label: d.department
        }
    })

    const searchDepartmentHandler = () => {
        if (department?.length === 0) {
            errorNotify("Please Select Department")
            return;
        }

        const formData = new FormData();
        formData.append("department", department)

        dispatch(getAssignedTenders(formData))
    }

    const proceedHandler = () => {
        const formData = new FormData();
        formData.append("tenderId", proceedTender.tenderId)
        formData.append("status", proceedTender.status)

        dispatch(assignedTenderStatus(formData))
    }

    const modal = <Modal centered className='doc_type proceed' show={show}>
        <Modal.Body>
            <div className='add_doc_type' style={{ transition: "all 0.3s ease" }}>
                <Form>
                    <Row>
                        <Col md={12}>
                            <h5>Are you sure you a {proceedTender.status === 'yes' ? 'Interested' : "Not Interested"} in this Tender?</h5>
                        </Col>
                        <Col md={12}>
                            <div className='next_btn'>
                                <button type='button' onClick={() => setShow(false)}> No </button>
                                <button type='button' onClick={proceedHandler} disabled={assignLoading}>
                                    {assignLoading ? <Spinner animation='border' size='sm' /> : "Yes, Proceed"} </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal.Body>
    </Modal>

    const options = [
        { value: "yes", label: "Interested" },
        { value: "no", label: "Not Interested" },
    ]

    const tenderDate = (closingDate) => {
        let currentDate = new Date();
        let dueDate = new Date(closingDate);

        let differenceInDays = Math.floor((dueDate - currentDate) / (1000 * 60 * 60 * 24))

        if (differenceInDays < 10) {
            return "show_red";
        }
        else if (differenceInDays <= 30 && differenceInDays > 10) {
            return "show_yellow";
        }
        else {
            return "show_green";
        }
    }

    const selectHandler = (value, getId) => {
        setProceedTender({
            tenderId: getId,
            status: value
        })
        setShow(true)
    }

    return (
        <div className='dashboard_main' style={{ padding: "15px 10px" }}>
            {modal}
            <h1>Assigned Tenders</h1>

            <Row className='align-items-end pb-3' style={{ borderBottom: "1px solid #8080804d" }}>
                <Col md={3}>
                    <Form.Group className="form_field">
                        <Form.Label>Department <span>*</span> </Form.Label>
                        <Select isLoading={departmentLoading} onChange={(d) => setDepartment(d.value)} options={departOption} placeholder="Select Department" styles={departmentStyles} />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <button className='search_btn' onClick={searchDepartmentHandler}>
                        {Loading ? <Spinner animation='border' size='sm' /> : 'Search'}
                    </button>
                </Col>
            </Row>
            {
                Loading ? <div className='py-3'>
                    <Loader />
                </div> :
                    <div className='application_table assigned_tenders'>
                        <Table responsive={!assignedTenderData || assignedTenderData?.response?.length === 0 ? false : true}>
                            <thead>
                                <tr>
                                    <th>S No.</th>
                                    <th>Tender No.</th>
                                    <th>Selected By</th>
                                    <th>Company</th>
                                    <th>Advertise Date</th>
                                    <th>Due Date</th>
                                    <th>Due Time</th>
                                    <th>Download</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Array.isArray(assignedTenderData?.response) && assignedTenderData?.response?.map((t, i) => {
                                        return (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{t.tenderNo}</td>
                                                <td>{t.selectedBy}</td>
                                                <td>{t.company}</td>
                                                <td>{t.advertiseDate}</td>
                                                <td> <span className={tenderDate(t.closingDate)}>{t.closingDate}</span> </td>
                                                <td>{t.closingTime}</td>
                                                <td> <a href={t.document} target='_blank' style={{ paddingLeft: "25px" }}> <MdOutlineFileDownload /> </a> </td>
                                                <td>
                                                    <span>
                                                        <Select placeholder="Select Actions" options={options}
                                                            styles={TableStyles} onChange={(e) => selectHandler(e.value, t.id)} />
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        {assignedTenderData?.response?.length === 0 && <p className='text-center' style={{ fontWeight: "600" }}>No Data Found</p>}
                        {!assignedTenderData && <p className='text-center' style={{ fontWeight: "600" }}>Please Search Tender By Department</p>}
                    </div>
            }
        </div>
    )
}
export default AssignedTenders