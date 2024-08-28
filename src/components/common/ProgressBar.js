import React, {  useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import config from '../../config';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { alertconfirmation, terminationAlert, alertPlanMappingWarning } from '../../alerts/Alerts';




function ProgressBar({ cobraId, onError = () => { } }) {

  const fetchUrl = `${config.API_URL}/COBRAPlans/${cobraId}`;

  const [plan, setplan] = useState(null);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


  useEffect(() => {
    fetchPlans();
}, []);

const fetchPlans = async () => {
    try {
        const response = await axios.get(fetchUrl);
        setplan(response.data || []);
        console.log(response.data)
    } catch (error) {
        setError('Error fetching plans.');
        onError(error);
    } finally {
        setLoading(false);
    }
};


const showNotice = () => {
  
  const terminatingPlans = [
    ...plan.cobraMedicalPlans.filter(medicalPlan => medicalPlan.isTerminating === "true"),
    ...plan.cobraDentalPlans.filter(d => d.isTerminating === "true"),
    ...plan.cobraVisionPlans.filter(v => v.isTerminating === "true"),
    ...plan.cobrahraPlans.filter(h => h.isTerminating === "true"),
    ...plan.cobrafsaPlans.filter(f => f.isTerminating === "true"),
    ...plan.cobraeapPlans.filter(e => e.isTerminating === "true"),
    ...plan.cobraInsurancePlans.filter(i => i.isTerminating === "true")
  ];

  console.log(terminatingPlans);

  if (terminatingPlans.length > 0) {
    const terminationAlertContent = `
      You indicated that some plans are terminating. Choose the Plan to which pending and active participants should be moved if they do not make an election.
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th>Terminating Plan</th>
              <th>Plan Mapping</th>
            </tr>
          </thead>
          <tbody>
            ${terminatingPlans.map(terminatingPlan => {
              
              let correspondingPlans = [];
              if (plan.cobraMedicalPlans.includes(terminatingPlan)) {
                correspondingPlans = plan.cobraMedicalPlans.filter(m => !m.isTerminating);
              } else if (plan.cobraDentalPlans.includes(terminatingPlan)) {
                correspondingPlans = plan.cobraDentalPlans.filter(m => !m.isTerminating);
              } else if (plan.cobraVisionPlans.includes(terminatingPlan)) {
                correspondingPlans = plan.cobraVisionPlans.filter(v => !v.isTerminating);
              } else if (plan.cobrahraPlans.includes(terminatingPlan)) {
                correspondingPlans = plan.cobrahraPlans.filter(h => !h.isTerminating);
              } else if (plan.cobrafsaPlans.includes(terminatingPlan)) {
                correspondingPlans = plan.cobrafsaPlans.filter(f => !f.isTerminating);
              } else if (plan.cobraeapPlans.includes(terminatingPlan)) {
                correspondingPlans = plan.cobraeapPlans.filter(e => !e.isTerminating);
              } else if (plan.cobraInsurancePlans.includes(terminatingPlan)) {
                correspondingPlans = plan.cobraInsurancePlans.filter(i => !i.isTerminating);
              }

              if(terminatingPlan.isTerminating === "true") { // Adjust this condition based on your data type
                return `
                <tr>
                  <td data-label="terminatingplan">${terminatingPlan.carrierName}</td>
                  <td data-label="planmapping">
                    <select class="COBRADataSource selectpickers form-control">
                      ${correspondingPlans.map(nonTerminatingPlan => `
                        <option value="${nonTerminatingPlan.carrierName}">${nonTerminatingPlan.carrierName}</option>
                      `).join('')}
                    </select>
                  </td>
                </tr>
                `;
              }
              return ''; // Return empty string if not terminating
            }).join('')}
          </tbody>
        </table>
      </div>`;

    // Call the terminationAlert function
    terminationAlert(
      terminationAlertContent,
      "Plan Mapping",
      () => {
        alertconfirmation("NOTICE: You have not uploaded your SBC document(s). Once you submit your COBRA renewal, you will not have the option to upload the SBC document(s) here. You can provide SBC documents after renewal directly in the COBRA platform. Just click the 'Manage My COBRA' tile on the home page of the Clarity Portal.", "Confirmation", function () {
    
    
        });
      },
      () => {
        alertPlanMappingWarning(
          'This plan mapping is required to complete your COBRA renewal. Canceling will leave your COBRA renewal incomplete. Do you still wish to Cancel?',
          'Warning',
          terminationAlertContent,
          () => {
            terminationAlert(
              terminationAlertContent,
              "Plan Mapping",
              () => {},
              () => {}
            );
          },
          () => {}
        );
      }
    );
}else{
  alertconfirmation("NOTICE: You have not uploaded your SBC document(s). Once you submit your COBRA renewal, you will not have the option to upload the SBC document(s) here. You can provide SBC documents after renewal directly in the COBRA platform. Just click the 'Manage My COBRA' tile on the home page of the Clarity Portal.", "Confirmation", function () {
    
    
});
}

};




if (loading) return <Skeleton />;
    if (error) return <div>{error}</div>;
  return (
    <div className="row fixedHeader">
      
      <div className="col-lg-12">
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start"></div>
          <div className="d-flex justify-content-center">
            <span id="page-title">
              You are currently Renewing benefits for <strong>The Holy Spirit</strong>.
            </span>
          </div>
          <div className="d-flex justify-content-end">
            <span className="pt-1 me-2" id="autoSavedMessage"></span>
          </div>
        </div>
      </div>

      <div className="col-lg-12 mb-1 d-flex justify-content-end">
        <span className="pt-1 me-2" id="validationMessage"></span>

        <button
          type="button"
          className="btn btn-primary btn-sm mt-1 me-1 save-company-profile"
        >
          SAVE
        </button>

        <button
          type="button"
          onClick={showNotice}
          className="btn btn-success btn-sm mt-1 me-1"
          id="reviewButton"
        >
          SUBMIT COBRA
        </button>
      </div>

      <div className="col-lg-12 progress-position">
        <div className="progress mb-3">
          <div
            className="progress-bar progress-bar-success"
            role="progressbar"
            style={{ width: '22%' }}
          >
            <span id="totalProgress">22%</span>
          </div>
          <div
            className="progress-bar progress-bar-warning"
            role="progressbar"
            style={{ width: '78%' }}
          >
            <span id="pendingProgress">78%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
