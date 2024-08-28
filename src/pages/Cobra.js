import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CobraMedicalPlans from '../components/cobra/CobraMedicalPlans';
import CompanyLayout from '../layouts/CompanyLayout';
import CobraGeneralInformation from '../components/cobra/CobraGeneralInformation';
import CobraDentalPlans from '../components/cobra/CobraDentalPlans';
import CobraEAPPlans from '../components/cobra/CobraEAPPlans';
import CobraVisionPlans from '../components/cobra/CobraVisionPlans';
import CobraHRAPlans from '../components/cobra/CobraHRAPlans';
import CobraFSAPlans from '../components/cobra/CobraFSAPlans';
import CobraInsurancePlans from '../components/cobra/CobraInsurancePlans';
import EnrollmentContacts from '../components/cobra/EnrollmentContacts';
import CobraOpenEnrollment from '../components/cobra/CobraOpenEnrollment';
import CobraEmployeeCensus from '../components/cobra/CobraEmployeeCensus';
import ProgressBar from '../components/common/ProgressBar';



function Cobra() {

  const { cobraId } = useParams();

  return (
    <div>
      <CompanyLayout>
        <ProgressBar cobraId={cobraId}/>
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row startingrow">
              <h5 class="cobra-section">COBRA</h5>
              <CobraGeneralInformation cobraId={cobraId} />
              <CobraMedicalPlans cobraId={cobraId} />
              <CobraDentalPlans cobraId={cobraId} />
              <CobraVisionPlans cobraId={cobraId} />
              <CobraEAPPlans cobraId={cobraId} />
              <CobraHRAPlans cobraId={cobraId} />
              <CobraFSAPlans cobraId={cobraId} />
              <CobraInsurancePlans cobraId={cobraId} />
              <EnrollmentContacts cobraId={cobraId} />
              <CobraOpenEnrollment cobraId={cobraId} />
              <CobraEmployeeCensus />
            </div>
          </div>
        </div>
      </CompanyLayout>
    </div>
  );
}

export default Cobra;
