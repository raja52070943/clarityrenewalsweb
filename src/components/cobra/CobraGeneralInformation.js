import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import config from '../../config';
import { Form, FormControl, Button, Col, Row, Alert } from 'react-bootstrap';
import CustomSwitch from '../ui/CustomSwitch/CustomSwitch'; // Import the custom switch

function CobraGeneralInformation({ cobraId, onError = () => {}, onValidationStateChange = () => {} }) {
  const fetchUrl = `${config.API_URL}/CobraGeneralInformations/ByPlanId/${cobraId}`;
  const updateUrl = `${config.API_URL}/CobraGeneralInformations`;

  const [generalInfo, setGeneralInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchGeneralInfo();
  }, [cobraId]);

  const fetchGeneralInfo = async () => {
    try {
      const response = await axios.get(fetchUrl);
      setGeneralInfo(response.data || null);
    } catch (err) {
      setError('Error fetching plans.');
    } finally {
      setLoading(false);
    }
  };

  const debouncedUpdate = useCallback(
    debounce(async (updatedInfo) => {
      try {
        await axios.put(`${updateUrl}/${updatedInfo.id}`, updatedInfo);
      } catch (err) {
        console.error('Error updating plan:', err);
        onError(err);
      }
    }, 500),
    [updateUrl, onError]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setGeneralInfo((prevInfo) => {
      let updatedInfo = { ...prevInfo, [name]: value };

      // Clear otherBenefitAdminPlatform if currentBenefitAdministrationPlatform is not "Other"
      if (name === 'currentBenefitAdministrationPlatform' && value !== 'Other') {
        updatedInfo.otherBenefitAdminPlatform = '';
      }

      // Clear otherPayrollPlatform if currentPayrollPlatform is not "Other"
      if (name === 'currentPayrollPlatform' && value !== 'Other') {
        updatedInfo.otherPayrollPlatform = '';
      }

      validateForm(updatedInfo);
      debouncedUpdate(updatedInfo);
      return updatedInfo;
    });
  };

  const handleToggleChange = (e) => {
    const { checked } = e.target;
    setGeneralInfo((prevInfo) => {
      const updatedInfo = { ...prevInfo, isChange: checked ? 'true' : 'false' };
      validateForm(updatedInfo);
      debouncedUpdate(updatedInfo);
      return updatedInfo;
    });
  };

  const validateForm = (info) => {
    const errors = {};

    // Example validation checks
    if (info?.clarityEventReceiptionMethod === 'A third party vendor will provide an EDI File Feed') {
      if (!info.vendorName) errors.vendorName = 'Vendor Name is required';
      if (!info.vendorContactFirstName) errors.vendorContactFirstName = 'Vendor Contact First Name is required';
      if (!info.vendorContactLastName) errors.vendorContactLastName = 'Vendor Contact Last Name is required';
      if (!info.vendorContactEmail) {
        errors.vendorContactEmail = 'Vendor Contact Email is required';
      } else if (!/\S+@\S+\.\S+/.test(info.vendorContactEmail)) {
        errors.vendorContactEmail = 'Vendor Contact Email must be a valid email address';
      }
    }

    if (info.currentBenefitAdministrationPlatform === 'Other' && !info.otherBenefitAdminPlatform) {
      errors.otherBenefitAdminPlatform = 'Please specify other benefit administration platform';
    }
    if (info.currentPayrollPlatform === 'Other' && !info.otherPayrollPlatform) {
      errors.otherPayrollPlatform = 'Please specify other payroll platform';
    }

    setValidationErrors(errors);
    onValidationStateChange(errors); // Send the validation errors to the parent
  };

  useEffect(() => {
    if (generalInfo) {
      validateForm(generalInfo);
    }
  }, [generalInfo]);

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="col-lg-12 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">General Information</h5>

          <Row className="mb-2 align-items-center">
            <Col xs="auto">
              <Form.Label>
                We are currently receiving new qualifying events and newly eligible participants via (Show Account - Funding & Files - QB/NPM File Source). Is this changing?
              </Form.Label>
            </Col>
            <Col xs="auto">
              <CustomSwitch
                checked={generalInfo?.isChange === 'true'}
                onChange={handleToggleChange}
              />
            </Col>
          </Row>

          {generalInfo?.isChange === 'true' && (
            <>
              <Row className="mb-2">
                <Col lg={6}>
                  <div className="input-group mb-2">
                    How will Clarity receive new qualifying events and newly eligible participants for the required notices?
                  </div>
                </Col>
                <Col lg={6}>
                  <Form.Control
                    as="select"
                    name="clarityEventReceiptionMethod"
                    value={generalInfo?.clarityEventReceiptionMethod || ''}
                    onChange={handleInputChange}
                    isInvalid={!!validationErrors.clarityEventReceiptionMethod}
                  >
                    <option value="Client/Broker will manually enter into the COBRA platform">
                      Client/Broker will manually enter into the COBRA platform
                    </option>
                    <option value="Client/Broker will provide ongoing files for import into the COBRA platform">
                      Client/Broker will provide ongoing files for import into the COBRA platform
                    </option>
                    <option value="Marketplace connection with Ease">
                      Marketplace connection with Ease
                    </option>
                    <option value="Marketplace connection with Employee Navigator">
                      Marketplace connection with Employee Navigator
                    </option>
                    <option value="A third party vendor will provide an EDI File Feed">
                      A third party vendor will provide an EDI File Feed
                    </option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.clarityEventReceiptionMethod}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {generalInfo?.clarityEventReceiptionMethod?.includes('A third party vendor will provide an EDI File Feed') && (
                <Row className="mb-2">
                  <Col lg={3}>
                    <FormControl
                      title="Vendor Name"
                      type="text"
                      name="vendorName"
                      placeholder="Vendor Name"
                      value={generalInfo?.vendorName || ''}
                      onChange={handleInputChange}
                      isInvalid={!!validationErrors.vendorName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.vendorName}
                    </Form.Control.Feedback>
                  </Col>
                  <Col lg={3}>
                    <FormControl
                      title="Vendor Contact First Name"
                      type="text"
                      name="vendorContactFirstName"
                      placeholder="Vendor Contact First Name"
                      value={generalInfo?.vendorContactFirstName || ''}
                      onChange={handleInputChange}
                      isInvalid={!!validationErrors.vendorContactFirstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.vendorContactFirstName}
                    </Form.Control.Feedback>
                  </Col>
                  <Col lg={3}>
                    <FormControl
                      title="Vendor Contact Last Name"
                      type="text"
                      name="vendorContactLastName"
                      placeholder="Vendor Contact Last Name"
                      value={generalInfo?.vendorContactLastName || ''}
                      onChange={handleInputChange}
                      isInvalid={!!validationErrors.vendorContactLastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.vendorContactLastName}
                    </Form.Control.Feedback>
                  </Col>
                  <Col lg={3}>
                    <FormControl
                      title="Vendor Contact Email"
                      type="email"
                      name="vendorContactEmail"
                      placeholder="Vendor Contact Email"
                      value={generalInfo?.vendorContactEmail || ''}
                      onChange={handleInputChange}
                      isInvalid={!!validationErrors.vendorContactEmail}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.vendorContactEmail}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              )}
            </>
          )}

          <Row className="mb-2">
            <Col lg={4}>
              <div className="input-group mb-2">
                What is your current benefit administration platform?
              </div>
            </Col>
            <Col lg={3}>
              <Form.Control
                as="select"
                name="currentBenefitAdministrationPlatform"
                value={generalInfo?.currentBenefitAdministrationPlatform || ''}
                onChange={handleInputChange}
                isInvalid={!!validationErrors.currentBenefitAdministrationPlatform}
              >
                <option value="Common Ben Admin Platforms">
                  Common Ben Admin Platforms
                </option>
                <option value="Other">Other</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {validationErrors.currentBenefitAdministrationPlatform}
              </Form.Control.Feedback>
              {generalInfo?.currentBenefitAdministrationPlatform === 'Other' && (
                <>
                  <FormControl
                    type="text"
                    className='mt-1'
                    placeholder="Other"
                    name="otherBenefitAdminPlatform"
                    value={generalInfo?.otherBenefitAdminPlatform || ''}
                    onChange={handleInputChange}
                    isInvalid={!!validationErrors.otherBenefitAdminPlatform}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.otherBenefitAdminPlatform}
                  </Form.Control.Feedback>
                </>
              )}
            </Col>
          </Row>

          <Row className="mb-2">
            <Col lg={4}>
              <div className="input-group mb-2">
                What is your current payroll platform?
              </div>
            </Col>
            <Col lg={3}>
              <Form.Control
                as="select"
                name="currentPayrollPlatform"
                value={generalInfo?.currentPayrollPlatform || ''}
                onChange={handleInputChange}
                isInvalid={!!validationErrors.currentPayrollPlatform}
              >
                <option value="Common Payroll Platforms">
                  Common Payroll Platforms
                </option>
                <option value="Other">Other</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {validationErrors.currentPayrollPlatform}
              </Form.Control.Feedback>
              {generalInfo?.currentPayrollPlatform === 'Other' && (
                <>
                  <FormControl
                    type="text"
                    className='mt-1'
                    placeholder="Other"
                    name="otherPayrollPlatform"
                    value={generalInfo?.otherPayrollPlatform || ''}
                    onChange={handleInputChange}
                    isInvalid={!!validationErrors.otherPayrollPlatform}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.otherPayrollPlatform}
                  </Form.Control.Feedback>
                </>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default CobraGeneralInformation;
