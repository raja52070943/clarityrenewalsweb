import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeBenefits() {
  const { companyId } = useParams();

  const [employeeBenefits, setEmployeeBenefits] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`http://localhost:7147/api/EmployeeBenefitsPlans/ByCompanyId/${companyId}`);
      setEmployeeBenefits(response.data);
    } catch (error) {
      console.error('Error fetching employeeBenefits:', error);
    }
  };

  
  return (
    <div>
      <h1>Employee Benefits for Company ID: {employeeBenefits.isMidYearPlan}</h1>
      
    </div>
  );
}

export default EmployeeBenefits;
