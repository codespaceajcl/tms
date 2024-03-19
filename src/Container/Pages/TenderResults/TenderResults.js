import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getDepartments, getSearchDocument } from '../../../Redux/Action/Dashboard';
// import Loader from '../../../Utils/Loader';
import { departmentStyles, login } from '../../../Utils/Helper';
import { Col, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { errorNotify } from '../../../Utils/Toast';
import Select from "react-select";
import { MdOutlineClose } from "react-icons/md";
// import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import SuccessLoti from "../../../Utils/Lottie/success.json";
import lossLoti from "../../../Utils/Lottie/loss.json";
import winLoti from "../../../Utils/Lottie/win.json";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";
import './TenderResults.css';

const TenderResults = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [department, setDepartment] = useState(null);
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [winShow, setWinShow] = useState(false)
    const [lossShow, setLossShow] = useState(false)
    const [file, setFile] = useState(null)
    const [comment, setComment] = useState('')

    useEffect(() => {
        const formData = new FormData();
        formData.append("email", login.email)
        formData.append("token", login.token)

        // dispatch(getDepartments(formData))

        return () => {
            dispatch({ type: "GET_SEARCH_DOCUMENT_RESET" })
        }
    }, [])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: SuccessLoti,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const LossOptions = {
        loop: true,
        autoplay: true,
        animationData: lossLoti,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const winOptions = {
        loop: false,
        autoplay: true,
        animationData: winLoti,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    // const { loading: searchLoading, getSearchData } = useSelector((state) => state.searchDocumentData)
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

    const submitWinHandler = (e) => {
        e.preventDefault();

        console.log(file)

        const formData = new FormData();
        formData.append("file", file)

        setWinShow(true)
        setShow(false)
    }

    const modal = <Modal centered className='doc_type' show={show}>
        <Modal.Body>
            <div className='add_doc_type' style={{ transition: "all 0.3s ease" }}>
                <div className='head'>
                    <h5>Document</h5>
                    <MdOutlineClose onClick={() => setShow(false)} />
                </div>
                <Form onSubmit={submitWinHandler}>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Attached Document <span>*</span></Form.Label>
                                <Form.Control type="file" onChange={(e) => setFile(e.target.files)} />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <div className='next_btn'>
                                <button type='submit'> Submit </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal.Body>
    </Modal>

    const winModal = <Modal centered show={winShow} onHide={() => setWinShow(false)}>
        <Modal.Body>
            <Lottie options={winOptions}
                height={500}
                width={500}
                style={{
                    maxWidth: "500px", margin: "auto", display: "flex", justifyContent: "center", textAlign: "center",
                    position: "absolute", bottom: "10px"
                }}
            />
            <div className='win_modal'>
                <Lottie options={defaultOptions}
                    height={170}
                    width={170}
                    style={{ maxWidth: "170px", margin: "auto", display: "flex", justifyContent: "center", textAlign: "center" }}
                />
                <h3>Congratulations <br />
                    On Winning Tender </h3>
            </div>
        </Modal.Body>
    </Modal>

    const loseHandler = (e) => {
        e.preventDefault();

        const d = {
            comment,
            email: login.email,
            token: login.token
        }

        const data = JSON.stringify(d)
        console.log(data)

        // dispatch()

        setLossShow(true)
        setShow2(false)
    }

    const loseModal = <Modal centered className='doc_type' show={show2}>
        <Modal.Body>
            <div className='add_doc_type' style={{ transition: "all 0.3s ease" }}>
                <div className='head'>
                    <h5>Reason</h5>
                    <MdOutlineClose onClick={() => setShow2(false)} />
                </div>
                <Form onSubmit={loseHandler}>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Comment <span>*</span></Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder='Enter Comment' onChange={(e) => setComment(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <div className='next_btn'>
                                <button type='submit'> Submit </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal.Body>
    </Modal>

    const modal2 = <Modal centered show={lossShow} onHide={() => setLossShow(false)}>
        <Modal.Body>
            <div className='win_modal'>
                <Lottie options={LossOptions}
                    height={170}
                    width={170}
                    style={{ maxWidth: "170px", margin: "auto", display: "flex", justifyContent: "center", textAlign: "center" }}
                />
                <h3>Better Luck <br />
                    Next Time! </h3>
            </div>
        </Modal.Body>
    </Modal>

    return (
        <div className='dashboard_main' style={{ padding: "15px 10px" }}>
            {modal}
            {loseModal}
            {winModal}
            {modal2}
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
                        Search
                    </button>
                </Col>
            </Row>
            {/* { */}
            {/* searchLoading ? <div className='py-3'> <Loader /></div> : */}
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
                            <th> <span style={{ paddingLeft: "90px" }}> Action </span> </th>
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
                                    <button className='selected_btn not_interested' onClick={() => setShow2(true)}>Loss <GoThumbsdown style={{ fontSize: "18px" }} /></button>
                                    <button className='selected_btn interested' onClick={() => setShow(true)}>Win <GoThumbsup style={{ fontSize: "18px" }} /> </button>
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
                                    <button className='selected_btn not_interested' onClick={() => setShow2(true)}>Loss <GoThumbsdown style={{ fontSize: "18px" }} /></button>
                                    <button className='selected_btn interested' onClick={() => setShow(true)}>Win <GoThumbsup style={{ fontSize: "18px" }} /> </button>
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
                                    <button className='selected_btn not_interested' onClick={() => setShow2(true)}>Loss <GoThumbsdown style={{ fontSize: "18px" }} /></button>
                                    <button className='selected_btn interested' onClick={() => setShow(true)}>Win <GoThumbsup style={{ fontSize: "18px" }} /> </button>
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
    )
}
export default TenderResults