import React, { useEffect, useState } from 'react'
import { Col, Row, Form, Spinner, Modal } from 'react-bootstrap';
import './Form.css';
import { useNavigate } from 'react-router-dom';
import { errorNotify, successNotify } from '../../../Utils/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { createDocument, getDepartAndDocType, getDepartments, getDocTypes, registerDocumentType } from '../../../Redux/Action/Dashboard';
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
  const [addDepart, setAddDepart] = useState('')
  const [docFields, setDocFields] = useState({
    department: null,
    documentType: null,
    document: '',
    year: ''
  })
  const [file, setFile] = useState(null)

  const { loading, postRegisterDocType } = useSelector((state) => state.docTypeRegister)
  const { loading: createLoading, documentCreated } = useSelector((state) => state.documentCreate)
  const { loading: departmentLoading, departmentsData } = useSelector((state) => state.departmentGet)
  const { loading: docTypeLoading, getDocType } = useSelector((state) => state.docTypesGet)

  useEffect(() => {
    if (documentCreated?.response) {
      successNotify("Document Created Successfully!");
      dispatch({ type: "CREATE_DOCUMENT_RESET" })

      setDocFields({
        department: null,
        documentType: null,
        document: '',
        year: ''
      })
      setFile(null)
    }
  }, [documentCreated])

  useEffect(() => {
    if (postRegisterDocType?.response === "success") {
      successNotify("Document Type Register Successfully!");
      setShowAddDocType(false)
      dispatch({ type: "REGISTER_DOC_TYPE_RESET" })

      const formData = new FormData();
      formData.append("email", login.email)
      formData.append("token", login.token)
      dispatch(getDocTypes(formData))
    }
  }, [postRegisterDocType])

  useEffect(() => {
    const formData = new FormData();
    formData.append("email", login.email)
    formData.append("token", login.token)

    dispatch(getDepartments(formData))
    dispatch(getDocTypes(formData))
  }, [])

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
      formData.append("documentNo", docFields.document)
      formData.append("year", docFields.year)
      formData.append("documentFile", file)
      formData.append("email", login.email)
      formData.append("token", login.token)

      dispatch(createDocument(formData))
    }
    catch (error) {
      errorNotify(error.message)
    }
  }

  const registerDocHandler = () => {

    if (addDocType.length === 0 || addDepart?.length === 0) {
      errorNotify("Please fill the field")
      return;
    }

    const formData = new FormData();
    formData.append("name", addDocType)
    formData.append("department", addDepart)
    formData.append("email", login.email)
    formData.append("token", login.token)

    dispatch(registerDocumentType(formData))
  }

  const departOptions = departmentsData?.response?.map((d) => {
    return {
      value: d?.id, label: d.name
    }
  })

  const departDocOptions = getDocType?.response?.map((d) => {
    return {
      value: d?.id, label: d.name
    }
  })

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
                <Form.Label>Department <span>*</span></Form.Label>
                <Select isLoading={departmentLoading} options={departOptions} onChange={(e) => setAddDepart(e.value)}
                  placeholder="Select Department" styles={dashboardColorStyles} />
              </Form.Group>
            </Col>
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
                      <Select isLoading={departmentLoading} options={departOptions} onChange={(value) => setDocFields({
                        ...docFields,
                        department: value
                      })} value={docFields.department} placeholder="Select Department" styles={dashboardColorStyles} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><FiPlus onClick={() => setShowAddDocType(true)} /> Document Type <span>*</span> </Form.Label>
                      <Select isLoading={docTypeLoading} options={departDocOptions} onChange={(value) => setDocFields({
                        ...docFields,
                        documentType: value
                      })} value={docFields.documentType} placeholder="Select Document Type" styles={dashboardColorStyles} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Document No. <span>*</span></Form.Label>
                      <Form.Control type="text" onChange={(e) => setDocFields({
                        ...docFields,
                        document: e.target.value
                      })} value={docFields.document} placeholder="Enter Document No" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Year <span>*</span></Form.Label>
                      <Form.Control type="number" onChange={(e) => setDocFields({
                        ...docFields,
                        year: e.target.value
                      })} value={docFields.year} placeholder="Enter Year" />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Row className='file_upload_handler' style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
                      <Col md={12}>
                        <FileUploader name="file"
                          types={["pdf"]}
                          value={file}
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