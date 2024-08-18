import React, { useEffect } from 'react';
import {useParams } from 'react-router-dom';
import CobraMedicalPlans from './CobraMedicalPlans';
import CompanyLayout from '../layouts/CompanyLayout';
import CobraGeneralInformation from './CobraGeneralInformation';
import CobraDentalPlans from './CobraDentalPlans';



function Cobra() {

    const { companyId } = useParams();

    

  return (

    <div>
      
      <CompanyLayout>
      <h5 class="cobra-section">COBRA</h5>
    <CobraGeneralInformation/>
    <CobraMedicalPlans companyId={companyId} />
    <CobraDentalPlans companyId={companyId}/>
   </CompanyLayout>
    </div>

    
  
        
     
  );
}

export default Cobra;
