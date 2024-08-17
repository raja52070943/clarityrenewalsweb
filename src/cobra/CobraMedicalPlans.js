import React from 'react';
import CobraPlansComponent from './CobraPlansComponent';

function CobraMedicalPlans({ companyId }) {
    const fetchUrl = `http://localhost:7147/api/COBRAMedicalPlans/ByPlanId/${companyId}`;
    const updateUrl = `http://localhost:7147/api/COBRAMedicalPlans/${companyId}`;

    const formFields = [
        { name: 'carrierName', type: 'select', title: 'Carrier Name', placeholder: 'Carrier Name'  },
        { name: 'planName', type: 'text', title: 'Plan Name', placeholder: 'Plan Name' },
        { name: 'incorporationState', type: 'select', title: 'State of Plan Issuance', placeholder: 'State of Plan Issuance'},
        { name: 'groupNumber', type: 'text', title: 'Group Number', placeholder: 'Group Number' },
        { name: 'subGroupNumber', type: 'text', title: 'Sub Group Number', placeholder: 'Sub Group Number' },
        { name: 'planRenewalDate', type: 'text', title: 'Plan Renewal Date', placeholder: 'Plan Renewal Date' },
        { name: 'insuranceType', type: 'select', title: 'Insurance Type', placeholder: 'Insurance Type' },
    ];

    const selectOptions = {
        carrierName: [
            { value: '90 Degree Benefits', label: '90 Degree Benefits' },
            { value: 'AblePay', label: 'AblePay' },
            { value: 'Advantage Administrators', label: 'Advantage Administrators' }
        ],
        incorporationState: [
            { value: 'Alabama', label: 'Alabama' },
            { value: 'Alaska', label: 'Alaska' },
            { value: 'Arizona', label: 'Arizona' }
        ],
        insuranceType: [
            { value: 'Fully Insured', label: 'Fully Insured' },
            { value: 'Self Insured', label: 'Self Insured' }
        ]
    };

    return (
        <CobraPlansComponent
            apiEndpoint=""
            fetchUrl={fetchUrl}
            updateUrl={updateUrl}
            formFields={formFields}
            selectOptions={selectOptions}
            initialFormValues={{}}
        />
    );
}

export default CobraMedicalPlans;
