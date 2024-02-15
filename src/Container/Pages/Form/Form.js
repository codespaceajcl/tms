import React, { useEffect, useState } from 'react'
import { Col, Row, Form, Spinner, Modal } from 'react-bootstrap';
import './Form.css';
import { useNavigate } from 'react-router-dom';
import { errorNotify, successNotify } from '../../../Utils/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { createDocument, registerDocumentType } from '../../../Redux/Action/Dashboard';
import Select from "react-select"
import { dashboardColorStyles, login, validateData } from '../../../Utils/Helper';
import { FiPlus } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import DocImg from "../../../images/stock_doc_icon.png";
import { FileUploader } from "react-drag-drop-files";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showAddDocType, setShowAddDocType] = useState(false)
  const [addDocType, setAddDocType] = useState('')
  const [docFields, setDocFields] = useState({
    department: null,
    documentType: null,
    document: '',
    year: ''
  })
  const [file, setFile] = useState(null)

  const { loading, postRegisterDocType } = useSelector((state) => state.docTypeRegister)
  const { loading: createLoading, documentCreated } = useSelector((state) => state.documentCreate)

  const options = [
    { value: "Pakistan", label: "Pakistan" }
  ]

  const submitHandler = () => {
    try {
      validateData(docFields)

      if (!file) {
        errorNotify("Please filled up all fields")
        return;
      }

      const formData = new FormData();
      formData.append("department", docFields.department.value)
      formData.append("documentType", docFields.documentType.value)
      formData.append("document", docFields.document)
      formData.append("year", docFields.year)
      formData.append("documentPath", file)

      dispatch(createDocument(formData))
    }
    catch (error) {
      errorNotify(error.message)
    }
  }

  const registerDocHandler = () => {

    if (addDocType.length === 0) {
      errorNotify("Please fill the field")
      return;
    }

    const formData = new FormData();
    formData.append("registerDocType", addDocType)
    formData.append("email", login.email)
    formData.append("token", login.token)

    dispatch(registerDocumentType(formData))
  }

  const modal = <Modal centered className='doc_type' show={showAddDocType}>
    <Modal.Body>
      <div className='add_doc_type' style={{ transition: "all 0.3s ease" }}>
        <div className='head'>
          <h5>Register Document Type</h5>
          <MdOutlineClose onClick={() => setShowAddDocType(false)} />
        </div>
        <Form>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Document Type Register <span>*</span></Form.Label>
                <Form.Control type="text" placeholder="Document Type" onChange={(e) => setAddDocType(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={12}>
              <div className='next_btn'>
                <button onClick={registerDocHandler} disabled={loading}>
                  {loading ? <Spinner animation='border' size='sm' /> : "Submit"} </button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal.Body>
  </Modal>

  return (
    <div className='form_main'>
      {modal}
      <div className='tab_show'>
        <div className='registration_form'>
          <h1>Add Document</h1>

          <div className='content'>
            <Row className='align-items-end make_reverse'>
              <Col md={12}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Department <span>*</span></Form.Label>
                      <Select options={options} onChange={(value) => setDocFields({
                        ...docFields,
                        department: value
                      })} placeholder="Select Department" styles={dashboardColorStyles} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><FiPlus onClick={() => setShowAddDocType(true)} /> Document Type <span>*</span> </Form.Label>
                      <Select options={options} onChange={(value) => setDocFields({
                        ...docFields,
                        documentType: value
                      })} placeholder="Select Document Type" styles={dashboardColorStyles} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Document No. <span>*</span></Form.Label>
                      <Form.Control type="text" onChange={(e) => setDocFields({
                        ...docFields,
                        document: e.target.value
                      })} placeholder="Enter Document No" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Year <span>*</span></Form.Label>
                      <Form.Control type="number" onChange={(e) => setDocFields({
                        ...docFields,
                        year: e.target.value
                      })} placeholder="Enter Year" />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Row className='file_upload_handler' style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
                      <Col md={12}>
                        <FileUploader name="file"
                          types={["pdf"]}
                          handleChange={(v) => setFile(v)}
                          label="Attached Document" />
                        <img src={DocImg} />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={12}>
                    <div className='next_btn'>
                      <button onClick={submitHandler} disabled={createLoading}>
                        {createLoading ? <Spinner animation='border' size='sm' /> : "Submit"} </button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RegistrationForm