import React from 'react';


const updateProgress = () => {
  
};

const showNotice = () => {
  
};

function ProgressBar() {
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
          onClick={updateProgress}
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
