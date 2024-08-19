import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CobraMedicalPlans from '../components/cobra/CobraMedicalPlans';
import CompanyLayout from '../layouts/CompanyLayout';
import CobraGeneralInformation from '../components/cobra/CobraGeneralInformation';
import CobraDentalPlans from '../components/cobra/CobraDentalPlans';
import EnrollmentContacts from '../components/cobra/EnrollmentAndEligibilityContacts';
import EnrollmentManagement from '../components/cobra/EnrollmentManagement';
import FileUpload from '../components/cobra/FileUpload';


function Cobra() {
  const { companyId } = useParams();
  return (
    <div>
      <CompanyLayout>
        <h5 class="cobra-section">COBRA</h5>
        <CobraGeneralInformation />
        <CobraMedicalPlans companyId={companyId} />
        <CobraDentalPlans companyId={companyId} />
        <div className="col-lg-12 mb-3"><EnrollmentContacts /></div>
        <div className="col-lg-12 mb-3"><EnrollmentManagement /></div>
        <div className="col-lg-12 mb-3"><FileUpload /></div>
      </CompanyLayout>
    </div>
  );
}

export default Cobra;
