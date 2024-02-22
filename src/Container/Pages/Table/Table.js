import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Utils/Loader';
import { dashboardColorStyles, login } from '../../../Utils/Helper';
import { Col, Form, Modal, Row, Table } from 'react-bootstrap';
import Select from "react-select";
import { MdOutlineClose } from "react-icons/md";
import './Table.css';
// import { getAllTenders } from '../../../Redux/Action/Dashboard';

const TableView = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)

  const { loading, allTendersData } = useSelector((state) => state.TendersAllData)

  useEffect(() => {
    const formData = new FormData();
    formData.append("email", login.email)
    formData.append("token", login.token)

    // dispatch(getAllTenders(formData))

    return () => {
      dispatch({ type: "GET_SEARCH_DOCUMENT_RESET" })
    }
  }, [])


  const selectedHandler = () => {

  }

  const modal = <Modal centered className='doc_type' show={show}>
    <Modal.Body>
      <div className='add_doc_type' style={{ transition: "all 0.3s ease" }}>
        <div className='head'>
          <h5>Select Department</h5>
          <MdOutlineClose onClick={() => setShow(false)} />
        </div>
        <Form>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Department <span>*</span></Form.Label>
                <Select
                  // isLoading={departmentLoading} options={departOptions} onChange={(e) => setAddDepart(e.value)}
                  placeholder="Select Department" styles={dashboardColorStyles} />
              </Form.Group>
            </Col>
            <Col md={12}>
              <div className='next_btn'>
                <button onClick={selectedHandler}
                // disabled={loading}
                >
                  {/* {loading ? <Spinner animation='border' size='sm' /> : "Submit"} */}
                  Submit
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal.Body>
  </Modal>

  const selectTender = () => {
    setShow(true)
  }

  return (
    <div className='table_main'>
      {modal}

      <div className='application_main'>
        <h1>All Tenders</h1>
        {
          loading ? <div className='py-3'>
            <Loader />
          </div> :
            <div className='application_table'>
              <Table responsive>
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Tender No.</th>
                    <th>Uploaded By</th>
                    <th>Uploaded Date</th>
                    <th>Uploaded Time</th>
                    <th>Due Date</th>
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
                    <td>29-02-2024</td>
                    <td>
                      <button className='selected_btn' onClick={selectTender}>Select</button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              {/* {getSearchData?.response?.length === 0 && <p className='text-center' style={{ fontWeight: "600" }}>No Data Found</p>} */}
            </div>
        }
      </div>
    </div>
  )
}
export default TableView