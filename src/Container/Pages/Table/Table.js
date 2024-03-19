import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Utils/Loader';
import { dashboardColorStyles, login } from '../../../Utils/Helper';
import { Col, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';
import Select from "react-select";
import { MdOutlineClose, MdOutlineFileDownload } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { addDepartment, getAllTenders, getAllTendersCompanies, getDepartments, getIntrestedTenderCompanies, selectDepartment, userCompaniesFilter } from '../../../Redux/Action/Dashboard';
import { errorNotify, successNotify } from '../../../Utils/Toast';
import MultiSelect from 'multiselect-react-dropdown';
import './Table.css';

const TableView = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [numEmails, setNumEmails] = useState(1);
  const [searchValues, setSearchValues] = useState({});
  const [detailShow, setDetailShow] = useState({
    show: false,
    text: ''
  })
  const [depart, setDepart] = useState('')
  const [saveTenderId, setSaveTenderId] = useState('')
  const [loadingTenderId, setLoadingTenderId] = useState(null);
  const [saveCompanies, setSaveCompanies] = useState([])
  const [addDepart, setAddDepart] = useState({
    name: "",
    pocName: "",
    pocContact: ""
  })

  const { loading, allTendersData } = useSelector((state) => state.TendersAllData)
  const { loading: companiesLoading, allTendersCompaniesData } = useSelector((state) => state.TendersCompaniesData)
  const { loading: interestedLoading, tendersCompaniesData } = useSelector((state) => state.interestedTenderCompaniesData)
  const { loading: filterLoading, interestedCompaniesData } = useSelector((state) => state.userCompaniesFilterData)
  const { loading: departmentLoading, getDepartmentsData } = useSelector((state) => state.departmentsGet)
  const { loading: selectedLoading, selectDepartmentData } = useSelector((state) => state.departmentSelect)
  const { loading: createLoading, addDepartmentData } = useSelector((state) => state.departmentAdd)

  useEffect(() => {
    const formData = new FormData();
    formData.append("email", login.email)

    dispatch(getAllTendersCompanies())
    dispatch(getIntrestedTenderCompanies(formData))
    dispatch(getDepartments())

    return () => {
      dispatch({ type: "GET_ALL_TENDERS_RESET" })
    }
  }, [])

  useEffect(() => {
    if (interestedCompaniesData?.response === "success") {
      successNotify("Saved Successfully!");
      dispatch({ type: "SAVE_USER_INTERESTED_COMPANIES_RESET" })

      const formData = new FormData();
      formData.append("email", login.email)

      dispatch(getAllTendersCompanies())
      dispatch(getIntrestedTenderCompanies(formData))
    }
  }, [interestedCompaniesData])

  useEffect(() => {
    if (selectDepartmentData?.response === "success") {
      successNotify("Assigned Successfully!")
      dispatch({ type: "SELECT_DEPARTMENT_RESET" })
      setShow(false)

      const formData = new FormData();
      formData.append("email", login.email)

      dispatch(getAllTendersCompanies())
      dispatch(getIntrestedTenderCompanies(formData))
    }
  }, [selectDepartmentData])

  useEffect(() => {
    if (addDepartmentData?.response === "success") {
      successNotify("Department Add Successfully!");
      dispatch({ type: "ADD_DEPARTMENT_RESET" })
      setShow2(false)

      const formData = new FormData();
      formData.append("email", login.email)

      dispatch(getDepartments(formData))
    }
  }, [addDepartmentData])

  useEffect(() => {
    if (tendersCompaniesData?.response) {
      const getSelectedCompanies = Array.isArray(tendersCompaniesData?.response) ? tendersCompaniesData?.response?.map((t) => {
        return t.company
      }) : []
      setSaveCompanies(getSelectedCompanies)
    }
  }, [tendersCompaniesData])

  const selectedHandler = () => {
    if (depart.length === 0 || saveTenderId.length === 0) {
      errorNotify("Please select field")
      return;
    }

    const formData = new FormData();
    formData.append("department", depart)
    formData.append("email", login.email)
    formData.append("tender", saveTenderId)

    dispatch(selectDepartment(formData))
  }

  const createHandler = () => {
    let emails = Object.values(searchValues)
    if (addDepart.name.length === 0 || addDepart.pocName.length === 0 || addDepart.pocContact.length === 0) {
      errorNotify("Please filled up all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", addDepart.name)
    formData.append("pocName", addDepart.pocName)
    formData.append("pocContact", addDepart.pocContact)
    formData.append("emails", emails)

    dispatch(addDepartment(formData))
  }

  const departOptions = Array.isArray(getDepartmentsData?.response) ? getDepartmentsData?.response?.map((d) => {
    return {
      value: d?.id, label: d.name
    }
  }) : []

  const handleNumEmailsChange = (e) => {
    let value = parseInt(e.target.value);
    value = Math.min(Math.max(value, 0), 10);
    setNumEmails(value);
  };

  const handleEmailInputChange = (index, e) => {
    const { name, value } = e.target;
    setSearchValues({ ...searchValues, [name]: value });
  };

  const modal2 = <Modal centered className='doc_type' show={show2}>
    <Modal.Body>
      <div className='add_doc_type' style={{ transition: "all 0.3s ease" }}>
        <div className='head'>
          <h5>Add Department</h5>
          <MdOutlineClose onClick={() => setShow2(false)} />
        </div>
        <Form>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Department <span>*</span> </Form.Label>
                <Form.Control type='text' placeholder='Enter Department Name'
                  value={addDepart.name} onChange={(e) => setAddDepart({
                    ...addDepart,
                    name: e.target.value
                  })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>POC Name <span>*</span> </Form.Label>
                <Form.Control type='text' placeholder='Enter POC Name'
                  value={addDepart.pocName} onChange={(e) => setAddDepart({
                    ...addDepart,
                    pocName: e.target.value
                  })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>POC Contact <span>*</span> </Form.Label>
                <Form.Control type='text' placeholder='Enter POC Contact'
                  value={addDepart.pocContact} onChange={(e) => setAddDepart({
                    ...addDepart,
                    pocContact: e.target.value
                  })}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Emails <span>*</span> </Form.Label>
                <Form.Control type='Number' placeholder='Enter No of Emails'
                  value={numEmails}
                  onChange={handleNumEmailsChange}
                />
              </Form.Group>

              <Row>
                {numEmails > 0 && [...Array(numEmails)].map((_, index) => (
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email {index + 1} <span>*</span> </Form.Label>
                      <Form.Control type='text' placeholder={`Enter Email ${index + 1}`}
                        name={`search${index + 1}`}
                        value={searchValues[`search${index + 1}`] || ''}
                        onChange={(e) => handleEmailInputChange(index, e)}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col md={12}>
              <div className='next_btn'>
                <button type='button' onClick={createHandler}>
                  {createLoading ? <Spinner animation='border' size='sm' /> : "Create"}
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal.Body>
  </Modal>

  const modal = <Modal centered className='doc_type' show={show}>
    <Modal.Body>
      <div className='add_doc_type' style={{ transition: "all 0.3s ease" }}>
        <div className='head'>
          <h5>Select Department</h5>
          <MdOutlineClose onClick={() => setShow(false)} />
        </div>
        <Form >
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Department <span>*</span> <FaPlus onClick={() => setShow2(true)} /> </Form.Label>
                <Select
                  isLoading={departmentLoading} options={departOptions}
                  onChange={(e) => setDepart(e.value)}
                  placeholder="Select Department" styles={dashboardColorStyles} />
              </Form.Group>
            </Col>
            <Col md={12}>
              <div className='next_btn'>
                <button type='button' onClick={selectedHandler}
                  disabled={selectedLoading}
                >
                  {selectedLoading ? <Spinner animation='border' size='sm' /> : "Submit"}
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal.Body>
  </Modal>

  const modal3 = <Modal centered className='doc_type' show={detailShow.show}>
    <Modal.Body>
      <div className='add_doc_type' style={{ transition: "all 0.3s ease" }}>
        <div className='head'>
          <h5>Tender Detail</h5>
          <MdOutlineClose onClick={() => setDetailShow({ show: false, text: '' })} />
        </div>

        <div className='m-4'>
          <label style={{ fontWeight: "700", marginBottom: "5px" }}>Detail Text</label>
          <p style={{ marginBottom: "30px" }}>{detailShow.text}</p>
        </div>
      </div>
    </Modal.Body>
  </Modal>

  const selectTender = (data, name) => {
    if (name === "select") {
      setSaveTenderId(data.id)
      setShow(true)
    }
    else if (name === "detail") {
      setDetailShow({
        show: true,
        text: data.detail
      })
    }
  }

  const showTenderHandler = (c) => {
    const formData = new FormData();
    formData.append("email", login.email)
    formData.append("company", c.company)

    setLoadingTenderId(c.company)

    if (c.tender > 0) {
      dispatch(getAllTenders(formData))
    }
    else {
      errorNotify("No Tenders Found")
    }
  }

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

  const backHandler = () => {
    dispatch({ type: "GET_ALL_TENDERS_RESET" })
    setLoadingTenderId(null)
  }

  const saveHandler = () => {
    const formData = new FormData();
    formData.append("email", login.email)
    formData.append("checkedComapanyItems", JSON.stringify(saveCompanies))

    dispatch(userCompaniesFilter(formData))
  }

  return (
    <div className='table_main'>
      {modal} {modal2} {modal3}

      <div className='application_main'>
        <h1>All Tenders</h1>

        <div className='companies_dropdown_wrapper pb-3' style={{ borderBottom: "1px solid #8080804d" }}>
          <Form.Group className="form_field">
            <Form.Label>Companies <span>*</span> </Form.Label>
            <MultiSelect
              closeIcon="close"
              avoidHighlightFirstOption={true}
              hideSelectedList
              isObject={false}
              loading={interestedLoading && companiesLoading}
              onRemove={(data) => setSaveCompanies(data)}
              onSelect={(data) => setSaveCompanies(data)}
              options={Array.isArray(allTendersCompaniesData?.response) ? allTendersCompaniesData?.response : []}
              placeholder="Select Companies"
              selectedValues={saveCompanies}
              showArrow
              showCheckbox
              keepSearchTerm={true}
            />
          </Form.Group>
          <button className='search_btn' disabled={saveCompanies?.length === 0 || filterLoading ? true : false} onClick={saveHandler}>
            {filterLoading ? <Spinner animation='border' size='sm' /> : "Save"}
          </button>
        </div>

        {
          allTendersData ? <>
            {
              loading ? <div className='py-3'>
                <Loader />
              </div> :
                <div className='application_table'>
                  <div className='backHandler'>
                    <button onClick={backHandler}>Back</button>
                  </div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>S No.</th>
                        <th>Tender No.</th>
                        <th>Company</th>
                        <th>Advertise Date</th>
                        <th>Closing Date</th>
                        <th>Closing Time</th>
                        <th>Document</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Array.isArray(allTendersData?.response) && allTendersData?.response?.map((r, i) => {
                          return (
                            <tr>
                              <td>{i + 1}</td>
                              <td>{r.tenderNo}</td>
                              <td>{r.company}</td>
                              <td>{r.advertiseDate}</td>
                              <td className={tenderDate(r.closingDate)}>{r.closingDate}</td>
                              <td>{r.closingTime}</td>
                              <td><a href={r.document} target='_blank'>
                                <MdOutlineFileDownload style={{ marginLeft: "25px" }} /></a></td>
                              <td>
                                <span style={{ display: "flex", gap: "7px" }}>
                                  <button className='selected_btn' onClick={() => selectTender(r, "detail")}>Detail</button>
                                  <button className='selected_btn' onClick={() => selectTender(r, "select")}>Select</button>
                                </span>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                </div>
            }
          </> :
            <div style={{ margin: "20px" }}>
              {
                interestedLoading ? <div className='py-3'>
                  <Loader />
                </div> :
                  <Row style={{ gap: "15px 0" }}>
                    {
                      Array.isArray(tendersCompaniesData?.response) && tendersCompaniesData?.response?.map((t) => {
                        return (
                          <Col md={4}>
                            <div className='interested_tender_box'>
                              <Row className='align-items-center'>
                                <Col md={12}>
                                  <div>
                                    <p><span>Company Name: </span> {t.company} </p>
                                    <p><span>Total Tenders: </span> {t.tender} </p>
                                  </div>
                                </Col>
                                <Col md={12}>
                                  <div className='d-flex' style={{ gap: "15px" }}>
                                    <button onClick={() => showTenderHandler(t)}>
                                      {loadingTenderId === t.company ? <Spinner animation="border" size="sm" />
                                        : "Show Tenders"} </button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        )
                      })
                    }
                    <Col md={12}>
                      {
                        Array.isArray(tendersCompaniesData?.response) && tendersCompaniesData?.response?.length === 0 &&
                        <div className='no_data_dound'> No Data Found </div>
                      }
                    </Col>
                  </Row>
              }
            </div>
        }
      </div>
    </div>
  )
}
export default TableView