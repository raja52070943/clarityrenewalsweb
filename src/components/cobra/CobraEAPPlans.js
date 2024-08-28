import React from 'react';
import CobraPlansComponent from './CobraPlansComponent';
import config from '../../config';


function CobraEAPPlans({ cobraId }) {
    const fetchUrl = `${config.API_URL}/COBRAEAPPlans/ByPlanId/${cobraId}`;
    const updateUrl = `${config.API_URL}/COBRAEAPPlans`;
    const deleteUrl = `${config.API_URL}/COBRAEAPPlans`;
    const addUrl = `${config.API_URL}/COBRAEAPPlans`;
    const planName = "EAP"

    const formFields = [
        { name: 'carrierName', type: 'select', title: 'Carrier Name', placeholder: 'Carrier Name'  },
        { name: 'planName', type: 'text', title: 'Plan Name', placeholder: 'Plan Name' },
        { name: 'incorporationState', type: 'select', title: 'State of Plan Issuance', placeholder: 'State of Plan Issuance'},
        { name: 'groupNumber', type: 'text', title: 'Group Number', placeholder: 'Group Number' },
        { name: 'subGroupNumber', type: 'text', title: 'Sub Group Number', placeholder: 'Sub Group Number' },
        { name: 'planRenewalDate', type: 'date', title: 'Plan Renewal Date', placeholder: 'Plan Renewal Date' },
        { name: 'insuranceType', type: 'select', title: 'Insurance Type', placeholder: 'Insurance Type' },
        // { name: 'isDivisionSpecific', type: 'checkbox', title: 'isDivisionSpecific', placeholder: 'Add Disability Extension' },
        // { name: 'isDisabilityExtension', type: 'checkbox', title: 'Disability Extension', placeholder: 'Add Disability Extension' },
        // { name: 'planRule', type: 'select', title: 'Plan Rule', placeholder: 'Plan Rule' },
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
        ],

        planRule: [
            { value: 'Coverage Termination Rule', label: 'Coverage Termination Rule' },
            { value: 'Event Date', label: 'Event Date' },
            { value: 'End of the month', label: 'End of the month' },
            { value: 'If term is 1st - 15th, Starts first of the month. If the term date is greater than the 15th, COBRA starts first of the following month', label: 'If term is 1st - 15th, Starts first of the month. If the term date is greater than the 15th, COBRA starts first of the following month' }
        ],

        planRateType: [
            { value: 'Composite', label: 'Composite' },
            { value: 'Age/Gender', label: 'Age/Gender' },
            { value: 'Member Specific', label: 'Member Specific' }
        ],
        coverageLevelName: [
            { value: 'EE', label: 'EE' },
            { value: 'EE+Child', label: 'EE+Child' },
            { value: 'EE+Children', label: 'EE+Children' },
            { value: 'EE+Child(ren)', label: 'EE+Child(ren)' },
            { value: 'EE+Family', label: 'EE+Family' },
            { value: 'EE+Spouse', label: 'EE+Spouse' },
            { value: 'EE+Domestic Partner', label: 'EE+Domestic Partner' },
            { value: 'Spouse+Child', label: 'Spouse+Child' },
            { value: 'Spouse+Children', label: 'Spouse+Children' },
            { value: 'Spouse+Child(ren)', label: 'Spouse+Child(ren)' },
            { value: 'Child Only', label: 'Child Only' },
            { value: 'Children Only', label: 'Children Only' },
            { value: 'Child(ren) Only', label: 'Child(ren) Only' },
            { value: 'Spouse Only', label: 'Spouse Only' },
            { value: 'EE+1', label: 'EE+1' },
            { value: 'EE+2', label: 'EE+2' },
            { value: 'EE+3', label: 'EE+3' },
            { value: 'EE+4', label: 'EE+4' }
        ]
    };

    return (
        <CobraPlansComponent
            apiEndpoint=""
            cobraId={cobraId}
            fetchUrl={fetchUrl}
            updateUrl={updateUrl}
            deleteUrl={deleteUrl}
            addUrl={addUrl}
            planName={planName}
            formFields={formFields}
            selectOptions={selectOptions}
            initialFormValues={{}}
        />
    );
}

export default CobraEAPPlans;
