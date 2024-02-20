import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Utils/Helper';
import { dashboardGet } from '../../Redux/Action/Dashboard';
import Loader from '../../Utils/Loader';
// import {
//   Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement,
//   Title, Tooltip, Filler, Legend
// } from 'chart.js';
// import { Pie, Doughnut, Line, Bar } from 'react-chartjs-2';
import { MdOutlineFileDownload } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";
import { MdOutlineHomeWork } from "react-icons/md";
import './Dashboard.css';

// ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Filler, Legend);

const Dashboard = () => {
  const dispatch = useDispatch();

  // const [searchNo, setSearchNo] = useState('')

  const { loading: dashboardLoading, dashGetData } = useSelector((state) => state.getDashboard)

  useEffect(() => {
    const formData = new FormData();
    formData.append("token", login?.token)
    formData.append("email", login?.email)

    dispatch(dashboardGet(formData))
  }, [])

  // const searchHandler = (e) => {
  //   const inputValue = e.target.value;
  //   setSearchNo(inputValue);
  // }

  // const filteredData = dashGetData?.recentDocuments?.filter((c) => {
  //   const searchString = searchNo?.toLowerCase();
  //   return (
  //     c.department?.toLowerCase().includes(searchString) ||
  //     c.year.includes(searchString) ||
  //     c.uploadBy?.toLowerCase().includes(searchString) || 
  //     c.uploadDate?.toLowerCase().includes(searchString)
  //   );
  // });

  // const pieData = {
  //   labels: ["Total Docs", "Department Docs"],
  //   datasets: [
  //     {
  //       label: '',
  //       data: ["30", "20"],
  //       backgroundColor: ["#003a70", "#a9c23f"],
  //     },
  //   ],
  // };

  // const userData = {
  //   labels: ["Total Users", "Active Users"],
  //   datasets: [
  //     {
  //       label: '',
  //       data: ["100", "78"],
  //       backgroundColor: ["#FEBE64", "#30BA7E"],
  //     },
  //   ],
  // };

  return (
    <div>
      {
        dashboardLoading ? <Loader /> :
          <div className='dashboard_main'>
            <Row style={{ padding: "0 15px", gap: "15px 0" }}>
              <Col md={12}>
                <h1>Dashboard</h1>
              </Col>

              {/* <Col md={4} sm={6}>
            <div className='graph_box'>
              <div>
                <h6>Documents</h6>
              </div>

              <div className='pie_chart'>
                <Pie data={pieData} />
              </div>
            </div>
          </Col> */}

              {/* <Col md={4} sm={6}>
            <div className='graph_box'>
              <div>
                <h6>Users</h6>
              </div>

              <div className='pie_chart'>
                <Pie data={userData} />
              </div>
            </div>
          </Col> */}

              <Col md={3} sm={6} xs={6}>
                <div className='dashboard_boxes'>
                  <IoDocument />
                  <h6>Total Documents</h6>
                  <h5>{dashGetData?.response?.totalDocuments}</h5>
                </div>
              </Col>
              <Col md={3} sm={6} xs={6}>
                <div className='dashboard_boxes depart_box'>
                  <MdOutlineHomeWork />
                  <h6>Total Departments</h6>
                  <h5>{dashGetData?.response?.totalDepartments}</h5>
                </div>
              </Col>
              <Col md={3} sm={6} xs={6}>
                <div className='dashboard_boxes total_user'>
                  <FaUsers />
                  <h6>Total Users</h6>
                  <h5>{dashGetData?.response?.totalUsers}</h5>
                </div>
              </Col>
              <Col md={3} sm={6} xs={6}>
                <div className='dashboard_boxes active_user'>
                  <FaUsers />
                  <h6>Active Users</h6>
                  <h5>{dashGetData?.response?.totalActiveUsers}</h5>
                </div>
              </Col>
            </Row>

            <Row style={{ padding: "0 15px" }}>
              <Col md={12}>
                <div className='application_table recent_table'>
                  <div className='heading'>
                    <h6>Recent Uploads</h6>

                    {/* <div className='search_tables'>
                      <div className='searching'>
                        <input
                          className='recent_search'
                          placeholder='Search'
                          value={searchNo}
                          name="searchNo"
                          onChange={searchHandler}
                        />
                      </div>
                    </div> */}
                  </div>

                  <div className='table_scroll'>
                    <Table responsive>
                      <thead>
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
                        dashGetData?.recentDocuments?.length > 0 &&
                        <tbody>
                          {
                            dashGetData?.recentDocuments?.map((s, i) => {
                              let splitDate = s.uploadDate?.split(' ').slice(0, 4).join(' ')
                              return (
                                <tr>
                                  <td>{i + 1}</td>
                                  <td>{s.department}</td>
                                  <td>{s.document}</td>
                                  <td> <a href={s.documentPath} target='_blank' style={{ paddingLeft: "30px" }}> <MdOutlineFileDownload /> </a> </td>
                                  <td>{s.year}</td>
                                  <td>{s.uploadBy}</td>
                                  <td>{splitDate}</td>
                                  <td>{s.uploadTime}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      }
                    </Table>
                    {dashGetData?.recentDocuments?.length === 0 && <p className='text-center py-3' style={{ fontWeight: "600" }}>No Data Found</p>}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
      }
    </div>
  )
}
export default Dashboard