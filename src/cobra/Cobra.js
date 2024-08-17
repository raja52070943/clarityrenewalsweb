import React, { useEffect } from 'react';
import {useParams } from 'react-router-dom';
import CobraMedicalPlans from './CobraMedicalPlans';
import CompanyLayout from '../layouts/CompanyLayout';
import $ from 'jquery';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select';


function Cobra() {

    const { companyId } = useParams();

    useEffect(() => {
      // Initialize selectpicker
      $('.selectpicker').selectpicker();
    }, []);

  return (

    
   <CompanyLayout>
    
    <CobraMedicalPlans companyId={companyId} />
   </CompanyLayout>
        
     
  );
}

export default Cobra;
