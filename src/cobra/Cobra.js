import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CobraMedicalPlans from './CobraMedicalPlans';
import CompanyLayout from '../layouts/CompanyLayout';
import CobraGeneralInformation from './CobraGeneralInformation';
import CobraDentalPlans from './CobraDentalPlans';
import CobraEAPPlans from './CobraEAPPlans';
import CobraVisionPlans from './CobraVisionPlans';
import CobraHRAPlans from './CobraHRAPlans';
import CobraFSAPlans from './CobraFSAPlans';
import CobraInsurancePlans from './CobraInsurancePlans';
import EnrollmentContacts from './EnrollmentContacts';
import CobraOpenEnrollment from './CobraOpenEnrollment';
import CobraEmployeeCensus from './CobraEmployeeCensus';
import ProgressBar from '../layouts/ProgressBar';



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
