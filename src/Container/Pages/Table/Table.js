import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartAndYear, getSearchDocument } from '../../../Redux/Action/Dashboard';
import Loader from '../../../Utils/Loader';
import { dashboardColorStyles, login, validateData } from '../../../Utils/Helper';
// import ReactPaginate from 'react-paginate';
import { Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import { errorNotify } from '../../../Utils/Toast';
import Select from "react-select";
import { MdOutlineFileDownload } from "react-icons/md";

import './Table.css';

const TableView = () => {
  const dispatch = useDispatch();
  // const itemsPerPage = 2;

  const [numFilters, setNumFilters] = useState(null);
  const [searchValues, setSearchValues] = useState({});
  const [department, setDepartment] = useState(null);
  const [year, setYear] = useState(null);
  // const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const formData = new FormData();
    formData.append("email", login.email)
    formData.append("token", login.token)

    dispatch(getDepartAndYear(formData))
  }, [])

  const { loading: optionLoading, departmentYearData } = useSelector((state) => state.departandyear)
  const { loading: searchLoading, getSearchData } = useSelector((state) => state.searchDocumentData)

  useEffect(() => {
    return () => {
      dispatch({ type: "GET_SEARCH_DOCUMENT_RESET" })
    }
  }, [])

  const departOption = departmentYearData?.department?.map((d) => {
    return { value: d.value, label: d.value }
  })

  const yearOption = departmentYearData?.year?.map((d) => {
    return { value: d.value, label: d.value }
  })

  const handleNumFiltersChange = (event) => {
    let value = parseInt(event.target.value);
    value = Math.min(Math.max(value, 0), 10);
    setNumFilters(value);
  };

  const handleSearchChange = (event, index) => {
    const { name, value } = event.target;
    setSearchValues({ ...searchValues, [name]: value });
  };

  const searchEnquiryHandler = () => {

    let data = {
      department,
      year: year?.toString(),
      filterCount: numFilters?.toString(),
      ...searchValues
    }

    try {
      validateData(data)

      if (Object.entries(searchValues).length !== numFilters) {
        errorNotify("Please filled up all fields")
        return;
      }
      dispatch(getSearchDocument(data))
    }
    catch (error) {
      errorNotify(error.message)
    }
  }

  return (
    <div className='table_main'>

      <div className='application_main'>

        <h1>General Enquiry</h1>

        {/* <div className='download_csv'>
          <button onClick={downloadCSV}><MdOutlineFileDownload style={{ fontSize: "18px" }} /> Download CSV</button>
        </div> */}

        <Row className='m-3'>
          <Col md={3}>
            <Form.Group className="form_field">
              <Form.Label>No. of Filters <span>*</span></Form.Label>
              <Form.Control type="Number" placeholder="Enter No. of Filters" value={numFilters} onChange={handleNumFiltersChange} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="form_field">
              <Form.Label>Department <span>*</span> </Form.Label>
              <Select isLoading={optionLoading} onChange={(d) => setDepartment(d.value)} options={departOption} placeholder="Select Department" styles={dashboardColorStyles} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="form_field">
              <Form.Label>Year <span>*</span> </Form.Label>
              <Select isLoading={optionLoading} onChange={(d) => setYear(d.value)} options={yearOption} placeholder="Select Year" styles={dashboardColorStyles} />
            </Form.Group>
          </Col>
        </Row>

        {
          numFilters > 0 &&
          <Row className='m-3 pt-2 align-items-end' style={{ borderTop: "1px solid rgb(0 0 0 / 12%)", gap: "10px 0" }}>
            {[...Array(numFilters)].map((_, index) => (
              <Col md={3} key={index}>
                <Form.Group className="form_field">
                  <Form.Label>{`Search Filter ${index + 1}`} <span>*</span></Form.Label>
                  <Form.Control type="text" placeholder={`Enter Search Filter ${index + 1}`}
                    name={`search${index + 1}`}
                    value={searchValues[`search${index + 1}`] || ''}
                    onChange={(e) => handleSearchChange(e, index)}
                  />
                </Form.Group>
              </Col>
            ))}
            <Col md={3}>
              <button className='search_btn' onClick={searchEnquiryHandler} disabled={searchLoading}>
                {searchLoading ? <Spinner animation='border' size='sm' /> : 'Search'} </button>
            </Col>
          </Row>
        }

        {
          searchLoading ? <div className='py-3'>
            <Loader />
          </div> :
            <div className='application_table'>
              <Table responsive>
                <thead style={{ borderTop: "1px solid lightgray" }}>
                  <tr>
                    <th>S No.</th>
                    <th>Department</th>
                    <th>Document No.</th>
                    <th>Document Url</th>
                    <th>Year</th>
                    <th>Uploaded By</th>
                    <th>Uploaded Date</th>
                    <th>Uploaded Time</th>
                  </tr>
                </thead>
                {
                  getSearchData?.response?.length > 0 &&
                  <tbody>
                    {
                      getSearchData?.response?.map((s, i) => {
                        return (
                          <tr>
                            <td>{i + 1}</td>
                            <td>{s.department}</td>
                            <td>{s.document}</td>
                            <td> <a href={s.documentPath} target='_blank' style={{ paddingLeft: "30px" }}> <MdOutlineFileDownload /> </a> </td>
                            <td>{s.year}</td>
                            <td>{s.uploadBy}</td>
                            <td>{s.uploadDate}</td>
                            <td>{s.uploadTime}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                }
              </Table>
              {getSearchData?.response?.length === 0 && <p className='text-center' style={{ fontWeight: "600" }}>No Data Found</p>}
              {!getSearchData && <p className='text-center' style={{ fontWeight: "600" }}>Please Search your Enquiry</p>}

              {/* {
                getSearchData?.response?.length > 0 &&
                <ReactPaginate
                  previousLabel={'Previous'}
                  nextLabel={'Next'}
                  breakLabel={'...'}
                  pageCount={Math.ceil(getSearchData?.response?.length / itemsPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={({ selected }) => setCurrentPage(selected)}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                />
              } */}
            </div>
        }
      </div>
    </div>
  )
}
export default TableView