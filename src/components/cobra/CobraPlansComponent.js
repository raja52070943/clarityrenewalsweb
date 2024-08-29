import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import debounce from 'lodash/debounce';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CobraPlanCoverageComponent from './CobraPlanCoverageComponent';
import 'rsuite/SelectPicker/styles/index.css';
import { Button, Card, Container, Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import FileUploadComponent from './FileUploadComponent';


function PlansComponent({
    apiEndpoint,
    cobraId,
    fetchUrl,
    updateUrl,
    deleteUrl,
    addUrl,
    planName,
    formFields,
    selectOptions,
    initialFormValues = {},
    onError = () => { }
}) {
    const [plans, setPlans] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [leftDivisions, setLeftDivisions] = useState([1, 2, 3, 4]);
    const [rightDivisions, setRightDivisions] = useState([5, 6]);

    React.useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await axios.get(fetchUrl);
            setPlans(response.data || []);
        } catch (error) {
            setError('Error fetching plans.');
            onError(error);
        } finally {
            setLoading(false);
        }
    };

    const debouncedUpdate = React.useCallback(
        debounce(async (updatedPlan) => {
            try {

                const url = `${updateUrl}/${updatedPlan.id}`;
                await axios.put(url, updatedPlan);
            } catch (error) {
                console.error('Error updating plan:', error);
                onError(error);
            }
        }, 500),
        [updateUrl, onError]
    );

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPlans = [...plans];
        updatedPlans[index] = { ...updatedPlans[index], [name]: value };
        setPlans(updatedPlans);
        debouncedUpdate(updatedPlans[index]);
    };

    const handleDateChange = (index, fieldName, date) => {
        const updatedPlans = [...plans];
        updatedPlans[index] = { ...updatedPlans[index], [fieldName]: date };
        setPlans(updatedPlans);
        debouncedUpdate(updatedPlans[index]);
    };

    const handleToggleChange = (index, e, property) => {
        const { checked } = e.target;
        const updatedPlans = [...plans];
        updatedPlans[index] = { ...updatedPlans[index], [property]: checked ? 'true' : 'false' };
        setPlans(updatedPlans);
        debouncedUpdate(updatedPlans[index]);
    };

    const handleDeletePlan = async (index) => {
        try {
            const planId = plans[index].id;
            await axios.delete(`${deleteUrl}/${planId}`);
            const updatedPlans = plans.filter((_, i) => i !== index);
            setPlans(updatedPlans);
        } catch (error) {
            console.error('Error deleting plan:', error);
            onError(error);
        }
    };

    const handleAddPlan = async () => {
        try {
            const firstPlanCarrierName = plans.length > 0 ? plans[0].carrierName : '';
            const newPlan = { ...initialFormValues, carrierName: firstPlanCarrierName, cobraPlanId: cobraId };
            console.log('Add URL:', addUrl); // Debugging URL
            console.log('New Plan Data:', newPlan); // Debugging data
            const response = await axios.post(addUrl, newPlan);
            setPlans([...plans, response.data]);
        } catch (error) {
            console.error('Error adding new plan:', error);
            onError(error);
        }
    };

    const moveLeftToRight = () => {
        if (leftDivisions.length > 0) {
            const movingDivision = leftDivisions.pop();
            setLeftDivisions([...leftDivisions]);
            setRightDivisions([movingDivision, ...rightDivisions]);
        }
    };

    const moveRightToLeft = () => {
        if (rightDivisions.length > 0) {
            const movingDivision = rightDivisions.shift();
            setRightDivisions([...rightDivisions]);
            setLeftDivisions([...leftDivisions, movingDivision]);
        }
    };
    if (loading) return <Skeleton />;
    if (error) return <div>{error}</div>;
    // if (plans.length === 0) return <div>No plans available.</div>;
    return (
        <Container fluid className="col-lg-12 mb-3">
            <div className="collapsible">
                <div className="collapsible-btn plan-collapsible-btn mx-auto d-block">
                    {planName} Plan Information
                </div>
                <div className="collapsible-content mt-3">
                    <Container fluid>
                        <Row className="session">
                            {plans.map((plan, index) => (
                                <Col key={index} lg={12}>
                                    <div className="plan-repeater" id={`planContainer-${index}`}>
                                        <Card className="mb-3">
                                            <Card.Body>
                                                <Row className="mb-3">
                                                    {plan.isRenewal === "true" && (
                                                        <>
                                                            <Col lg={12} className="d-flex mb-3">
                                                                <strong>If your carrier is changing,
                                                                    please terminate this plan and add a new
                                                                    one.</strong>
                                                            </Col>
                                                            <Row className="mb-3">
                                                                <Col>
                                                                    <strong>{plan.carrierName} - {plan.planName}</strong>
                                                                </Col>
                                                            </Row>
                                                            <Row className="mb-3">
                                                                <Col lg={3}>
                                                                    <Form.Group>
                                                                        <Form.Label>
                                                                            Is this plan terminating?
                                                                        </Form.Label>
                                                                        <Form.Check
                                                                            type="switch"
                                                                            id={`isTerminating-${index}`}
                                                                            checked={plan.isTerminating === 'true'}
                                                                            onChange={(e) => handleToggleChange(index, e, 'isTerminating')}
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                {plan.isTerminating === "true" && (
                                                                    <Col lg={3} className="mb-2 termination_date" id="termination_date">
                                                                        <div class="d-flex ">
                                                                            <span class="input-group-text">
                                                                                <i class="  far fa-calendar-alt"></i>
                                                                            </span>
                                                                            <DatePicker
                                                                                className="form-control"
                                                                                selected={plan.planTerminationDate || ''}
                                                                                onChange={(date) => handleDateChange(index, 'planTerminationDate', date)}
                                                                                placeholderText="Plan Termination Date" />
                                                                        </div>
                                                                    </Col>
                                                                )}
                                                            </Row>
                                                        </>
                                                    )}
                                                    {plan.isTerminating !== "true" && (
                                                        <>
                                                            <Row>
                                                                {formFields.map((field, fieldIndex) => (
                                                                    <Col key={fieldIndex} lg={3} className="mb-2">
                                                                        <Form.Group>
                                                                            {field.type === 'select' ? (
                                                                                <Form.Control
                                                                                    as="select"
                                                                                    className={field.className}
                                                                                    title={field.title}
                                                                                    name={field.name}
                                                                                    value={plan[field.name] || ''}
                                                                                    onChange={(e) => handleInputChange(index, e)}
                                                                                >
                                                                                    <option disabled value="">{field.placeholder}</option>
                                                                                    {selectOptions[field.name]?.map((option, optionIndex) => (
                                                                                        <option key={optionIndex} value={option.value}>
                                                                                            {option.label}
                                                                                        </option>
                                                                                    ))}
                                                                                </Form.Control>
                                                                            ) : field.type === 'date' ? (
                                                                                <DatePicker
                                                                                    className="form-control"
                                                                                    selected={plan[field.name]}
                                                                                    onChange={(date) => handleDateChange(index, field.name, date)}
                                                                                    placeholderText={field.placeholder}
                                                                                />
                                                                            ) : (
                                                                                <Form.Control
                                                                                    className={field.className}
                                                                                    title={field.title}
                                                                                    type={field.type}
                                                                                    name={field.name}
                                                                                    placeholder={field.placeholder}
                                                                                    value={plan[field.name] || ''}
                                                                                    onChange={(e) => handleInputChange(index, e)}
                                                                                />
                                                                            )}
                                                                        </Form.Group>
                                                                    </Col>
                                                                ))}
                                                            </Row>
                                                            <Col lg={12} className="mb-3">
                                                                <Form.Group>
                                                                    <Form.Label>
                                                                        Is this plan available only to a specific division(s)?
                                                                    </Form.Label>
                                                                    <Form.Check
                                                                        type="switch"
                                                                        id={`plan_IsDivisionSpecific-${index}`}
                                                                        checked={plan.isDivisionSpecific === 'true'}
                                                                        onChange={(e) => handleToggleChange(index, e, 'isDivisionSpecific')}
                                                                        name="isDivisionSpecific"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <div className={`row mb-3 divisionsContainer ${plan.isDivisionSpecific === 'true' ? '' : 'd-none'}`} id={`planDivision_${index}`}>
                                                                    <div className="expensesContainer container">

                                                                        <div className="block left-block">
                                                                            {leftDivisions.map((division, idx) => (
                                                                                <p key={idx} data-index={division}>{`Division ${division}`}</p>
                                                                            ))}
                                                                        </div>
                                                                        <div className="arrow-container">
                                                                            <i
                                                                                className="arrow fas fa-arrow-right right-arrow"
                                                                                onClick={moveLeftToRight}
                                                                                hra-id="3"
                                                                                employee-benefits-planid="4"
                                                                                reimbursable-expenses="0"
                                                                            ></i>
                                                                            <i
                                                                                className="arrow fas fa-arrow-left left-arrow"
                                                                                onClick={moveRightToLeft}
                                                                                hra-id="3"
                                                                                employee-benefits-planid="4"
                                                                                reimbursable-expenses="0"
                                                                            ></i>
                                                                        </div>

                                                                        <div className="block right-block">
                                                                            {rightDivisions.map((division, idx) => (
                                                                                <p key={idx} data-index={division}>{`Division ${division}`}</p>
                                                                            ))}
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            <Row className="mb-3">
                                                                <Col lg={12}>
                                                                    <Form.Group controlId="plan_IsDisabilityExtension" className="d-flex">
                                                                        <Form.Label>
                                                                            Do you wish to charge an additional 50% of the premium for disability extension?
                                                                        </Form.Label>
                                                                        <Form.Check
                                                                            type="switch"
                                                                            id={`plan_IsDisabilityExtension-${index}`}
                                                                            name="isDisabilityExtension"
                                                                            checked={plan.isDisabilityExtension === 'true'}
                                                                            onChange={(e) => handleToggleChange(index, e, 'isDisabilityExtension')}
                                                                            className="ml-3"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row className="mb-3">
                                                                <Col lg={6}>
                                                                    <Form.Group className="mb-2">
                                                                        <Form.Label>Coverage Termination Rule</Form.Label>
                                                                        <div className="d-inline-flex">
                                                                            <Form.Control
                                                                                as="select"
                                                                                title="Plan Rule"
                                                                                name="planRule"
                                                                                value={plan.planRule || ''}
                                                                                onChange={(e) => handleInputChange(index, e)}
                                                                            >
                                                                                <option disabled value="">Coverage Termination Rule</option>
                                                                                {selectOptions.planRule?.map((option, optionIndex) => (
                                                                                    <option key={optionIndex} value={option.value}>
                                                                                        {option.label}
                                                                                    </option>
                                                                                ))}
                                                                            </Form.Control>
                                                                            <OverlayTrigger
                                                                                placement="top"
                                                                                overlay={
                                                                                    <Tooltip id={`tooltip-plan-rule-${index}`}>
                                                                                        The date the employee will lose coverage under the active plan and will start COBRA coverage.
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <span className="btn btn-sm btn-bg-soft-secondary ms-2">
                                                                                    <i className="dropicons dripicons-information"></i>
                                                                                </span>
                                                                            </OverlayTrigger>
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col lg={6}>
                                                                    <Form.Group className="mb-2">
                                                                        <Form.Label>Plan Rate Type</Form.Label>
                                                                        <Form.Control
                                                                            as="select"
                                                                            title="Plan Rate Type"
                                                                            name="planRateType"
                                                                            value={plan.planRateType || ''}
                                                                            onChange={(e) => handleInputChange(index, e)}
                                                                        >
                                                                            <option disabled value="">Plan Rate Type</option>
                                                                            {selectOptions.planRateType?.map((option, optionIndex) => (
                                                                                <option key={optionIndex} value={option.value}>
                                                                                    {option.label}
                                                                                </option>
                                                                            ))}
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            {plan.planRateType === "Age/Gender" && (
                                                                <>
                                                                    <div id={`agegendertext_${index}`}>
                                                                        <div className="d-flex justify-content-center mb-2">
                                                                            <span><strong>Please upload an Excel file with your age/gender banded medical rates in File Uploads section.</strong></span>
                                                                        </div>
                                                                    </div>
                                                                    <Col lg={12}>
                                                                        <FileUploadComponent />
                                                                    </Col>
                                                                </>
                                                            )}
                                                            {plan.planRateType === "Composite" && (
                                                                <>
                                                                    <div id={`rateinformation_${index}`} className="">
                                                                        <h5 className="card-title">Rate Information</h5>
                                                                        <Row>
                                                                            <Col lg={3}></Col>
                                                                            <Col lg={3}>
                                                                                <span>Current Monthly Premium</span>
                                                                                <OverlayTrigger
                                                                                    placement="right"
                                                                                    overlay={<Tooltip id="tooltip-current-premium">This amount does not include the 2% admin fee</Tooltip>}
                                                                                >
                                                                                    <Button variant="link" className="p-0 ms-2" aria-label="Info">
                                                                                        <i className="dropicons dripicons-information" />
                                                                                    </Button>
                                                                                </OverlayTrigger>
                                                                            </Col>
                                                                            <Col lg={3}>
                                                                                <span>Future Monthly Premium</span>
                                                                                <OverlayTrigger
                                                                                    placement="right"
                                                                                    overlay={<Tooltip id="tooltip-future-premium">Only required if current monthly rates end within the next 60 days. This amount does not include the 2% admin fee.</Tooltip>}
                                                                                >
                                                                                    <Button variant="link" className="p-0 ms-2" aria-label="Info">
                                                                                        <i className="dropicons dripicons-information" />
                                                                                    </Button>
                                                                                </OverlayTrigger>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col lg={3}></Col>
                                                                            <Col lg={3}>
                                                                                <div className="d-flex mb-2">
                                                                                    <span className="input-group-text"><i className="far fa-calendar-alt"></i></span>
                                                                                    <DatePicker
                                                                                        className="form-control"
                                                                                        selected={plan.currentRateStartDate || ''}
                                                                                        onChange={(date) => handleDateChange(index, 'currentRateStartDate', date)}
                                                                                        placeholderText="Current Rate Start Date" />
                                                                                </div></Col>
                                                                            <Col lg={3}>
                                                                                <div className="d-flex mb-2">
                                                                                    <span className="input-group-text"><i className="far fa-calendar-alt"></i></span>
                                                                                    <DatePicker
                                                                                        className="form-control"
                                                                                        selected={plan.futureRateStartDate || ''}
                                                                                        onChange={(date) => handleDateChange(index, 'futureRateStartDate', date)}
                                                                                        placeholderText="Future Rate Start Date" />
                                                                                </div></Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col lg={3}>
                                                                                Coverage Level
                                                                            </Col>
                                                                            <Col lg={3}>
                                                                                <div className="d-flex mb-2">
                                                                                    <span className="input-group-text"><i className="far fa-calendar-alt"></i></span>
                                                                                    <DatePicker
                                                                                        className="form-control"
                                                                                        selected={plan.currentRateEndDate || ''}
                                                                                        onChange={(date) => handleDateChange(index, 'currentRateEndDate', date)}
                                                                                        placeholderText="Current Rate End Date" />
                                                                                </div>
                                                                            </Col>
                                                                            <Col lg={3}>
                                                                                <div className="d-flex mb-2">
                                                                                    <span className="input-group-text"><i className="far fa-calendar-alt"></i></span>
                                                                                    <DatePicker
                                                                                        className="form-control"
                                                                                        selected={plan.futureRateEndDate || ''}
                                                                                        onChange={(date) => handleDateChange(index, 'futureRateEndDate', date)}
                                                                                        placeholderText="Future Rate End Date" />
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                        <CobraPlanCoverageComponent
                                                                            planId={plan.id}
                                                                            planName={planName}
                                                                            selectOptions={selectOptions}
                                                                            initialFormValues={{}} />
                                                                    </div>
                                                                    <Col lg={12} className="mt-5">
                                                                        <FileUploadComponent />
                                                                    </Col>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </Row>
                                            </Card.Body>
                                            <Card.Footer id="footer">
                                                <div className="col-lg-12">
                                                    {/* Inject CSS directly into the page - overriding primary button hover styles */}
                                                    <style>{`
                                                        .delete-plan-info:hover {
                                                            background-color: none;
                                                        }
                                                    `}</style>
                                                    <Button
                                                        className="delete-plan-info"
                                                        onClick={() => handleDeletePlan(index)}
                                                    >
                                                        <span className="fa fa-trash-alt me-1" id="delete"></span>
                                                    </Button>
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    </div>
                                </Col>
                            ))}
                            <Row>
                                <Col xs={12} className="add-cobra-plans add-cobra-medical-plans" id="add-medical-button">
                                    <Button
                                        className="btn btn-success btn-sm sm-btns my-1 float-end"
                                        onClick={handleAddPlan}
                                    >
                                        Add {planName} Plan
                                    </Button>
                                </Col>
                            </Row>
                        </Row>
                    </Container>
                </div>
            </div>
        </Container>
    )
}

export default PlansComponent;