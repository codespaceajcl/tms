import React, { useEffect } from 'react'
import { Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Utils/Helper';
// import { dashboardGet } from '../../Redux/Action/Dashboard';
import Loader from '../../Utils/Loader';
import { MdOutlineFileDownload } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoDocument, IoDocumentLock } from "react-icons/io5";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import './Dashboard.css';

const Dashboard = () => {
  // const dispatch = useDispatch();

  const { loading, dashGetData } = useSelector((state) => state.getDashboard)

  useEffect(() => {
    const formData = new FormData();
    formData.append("token", login?.token)
    formData.append("email", login?.email)

    // dispatch(dashboardGet(formData))
  }, [])

  return (
    <div>
      {
        loading ? <Loader /> :
          <div className='dashboard_main'>
            <Row style={{ padding: "0 15px", gap: "15px 0" }}>
              <Col md={12}>
                <h1>Dashboard</h1>
              </Col>

              <Col md={3} sm={6} xs={6}>
                <div className='dashboard_boxes'>
                  <IoDocument />
                  <h6>Total Tenders</h6>
                  <h5>100</h5>
                </div>
              </Col>
              <Col md={3} sm={6} xs={6}>
                <div className='dashboard_boxes depart_box'>
                  <HiClipboardDocumentCheck />
                  <h6>Tender Wins</h6>
                  <h5>60</h5>
                </div>
              </Col>
              <Col md={3} sm={6} xs={6}>
                <div className='dashboard_boxes total_user'>
                  <IoDocumentLock />
                  <h6>Tender Lose</h6>
                  <h5>40</h5>
                </div>
              </Col>
              <Col md={3} sm={6} xs={6}>
                <div className='dashboard_boxes active_user'>
                  <FaUsers />
                  <h6>Total Users</h6>
                  <h5>5</h5>
                </div>
              </Col>
            </Row>

            <Row style={{ padding: "0 15px" }}>
              <Col md={7}>
                <div className='application_table recent_table'>
                  <div className='heading'> <h6>Recent Uploads</h6> </div>
                  <div className='table_scroll'>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Department</th>
                          <th>Document No.</th>
                          <th>Uploaded Date</th>
                          <th>Document Url</th>
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
                                  <td>{s.department}</td>
                                  <td>{s.document}</td>
                                  <td> <a href={s.documentPath} target='_blank' style={{ paddingLeft: "30px" }}> <MdOutlineFileDownload /> </a> </td>
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
              <Col md={5}>
                <div className='dashboard_right_box'>
                  <h5>PPRA Stats</h5>

                  <div>
                    <h6>Total</h6>
                    <p>40</p>
                  </div>
                  <div>
                    <h6>Aviation</h6>
                    <p>20</p>
                  </div>
                  <div>
                    <h6>TnT</h6>
                    <p>5</p>
                  </div>
                  <div>
                    <h6>IT</h6>
                    <p>8</p>
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