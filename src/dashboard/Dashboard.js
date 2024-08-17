import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout'

function Dashboard() {
  const [companies, setCompanies] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:7147/api/Companies');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleNavigate = (companyId) => {
    navigate(`/Cobra/${companyId}`);
  };

  return (
    <DashboardLayout>
    <div className="main-content home-main-content">
      <div className="page-content">
        <div className="container-fluid home-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">Renew Your Clarity Benefits</h5>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="table-responsive">
                        <table
                          className="table table-hover table-centered table-nowrap mb-0"
                          style={{ overflowY: 'auto' }}
                        >
                          <thead>
                            <tr>
                              <th>Client Name</th>
                              <th>Renewal Date</th>
                              <th>Notification Date</th>
                              <th>Products</th>
                              <th>Status</th>
                              <th>Progress</th>
                              <th className="th-action">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {companies.map((company) => (
                              <tr key={company.id}>
                                <td>{company.name}</td>
                                <td>{company.createdOn}</td>
                                <td>{company.notificationDate}</td>
                                <td>{company.products}</td>
                                <td>
                                  <span className="badge bg-primary rounded-0 progress-status">
                                    {company.companyStatus}
                                  </span>
                                </td>
                                <td>
                                  <small className="font-size-12">{company.progress}%</small>
                                  <div className="progress progress-height rounded-0">
                                    <div
                                      className="progress-bar bg-primary"
                                      role="progressbar"
                                      style={{ width: `${company.progress}%` }}
                                      aria-valuenow={company.progress}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-primary resume-button custom-button"
                                    onClick={() => handleNavigate(company.id)}
                                  >
                                    Start
                                  </button>
                                  <button className="btn btn-primary invite-button custom-button">
                                    Change contact
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}

export default Dashboard;
