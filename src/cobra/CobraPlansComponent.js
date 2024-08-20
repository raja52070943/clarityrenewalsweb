import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import debounce from 'lodash/debounce';
import CobraPlanCoverageComponent from './CobraPlanCoverageComponent';


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


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // if (plans.length === 0) return <div>No plans available.</div>;

    return (
        <div>
            <div className="col-lg-12 mb-3">
                <div className="collapsible">
                    <div className="collapsible-btn plan-collapsible-btn mx-auto d-block">
                        {planName} Plan Information
                    </div>

                    <div className="collapsible-content mt-3">
                        <div className="container-fluid">
                            <div className="row session">
                                {plans.map((plan, index) => (
                                    <div key={index}>
                                        <div className="plan-repeater" id={`planContainer-${index}`}>
                                            <div className="card mb-3">
                                                <div className="card-body">
                                                    <div className="row mb-3">
                                                        {formFields.map((field, fieldIndex) => (
                                                            <div key={fieldIndex} className="col-lg-3">
                                                                <div className="input-group mb-2">
                                                                    {field.type === 'select' ? (
                                                                        <select
                                                                            className={`form-control selectpickers ${field.className}`}
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
                                                                        </select>
                                                                    ) : field.type === 'date' ? (

                                                                        <DatePicker
                                                                            className="form-control"
                                                                            selected={plan[field.name]}
                                                                            onChange={(date) => handleDateChange(index, field.name, date)}
                                                                            placeholderText={field.placeholder}
                                                                        />
                                                                    ) : (
                                                                        <input
                                                                            className={`form-control ${field.className}`}
                                                                            title={field.title}
                                                                            type={field.type}
                                                                            name={field.name}
                                                                            placeholder={field.placeholder}
                                                                            value={plan[field.name] || ''}
                                                                            onChange={(e) => handleInputChange(index, e)}
                                                                        />
                                                                    )}

                                                                </div>
                                                            </div>
                                                        ))}

                                                        <div className="col-lg-6">
                                                            <div className="form-check form-switch form-toggle">
                                                                <label className="form-check-label">
                                                                    Is this plan available only to a specific division(s)?
                                                                </label>
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input form-check-input-toggel toggle-input-switch"
                                                                    role="switch"
                                                                    checked={plan.isDivisionSpecific === 'true'}
                                                                    onChange={(e) => handleToggleChange(index, e, 'isDivisionSpecific')}
                                                                    id={`plan_IsDivisionSpecific-${index}`}
                                                                    name="isDivisionSpecific"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={`col-lg-3 ${plan.isDivisionSpecific === 'true' ? '' : 'd-none'}`} id={`planDivision_${index}`}>
                                                            <select
                                                                className="entitytype selectpickers form-control"
                                                                id={`selectedDivisionNames_${index}`}
                                                                title="Division Name"
                                                                onChange={(e) => handleInputChange(index, e)}
                                                                multiple
                                                                name="selectedDivisionNames"
                                                                value={plan.selectedDivisionNames || []}
                                                            >
                                                                <option value=""></option>
                                                                {/* Add more options as needed */}
                                                            </select>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <div className="col-lg-12">
                                                                <div className="form-check form-switch form-toggle">
                                                                    <label className="form-check-label">
                                                                        Do you wish to charge an additional 50% of the premium for disability extension?
                                                                    </label>
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input form-check-input-toggel toggle-input-switch"
                                                                        role="switch"
                                                                        checked={plan.isDisabilityExtension === 'true'}
                                                                        onChange={(e) => handleToggleChange(index, e, 'isDisabilityExtension')}
                                                                        id="plan_IsDisabilityExtension"
                                                                        name="isDisabilityExtension"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <div className="col-lg-6">
                                                                <div className="input-group mb-2">
                                                                    <select
                                                                        className="form-control selectpickers"
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
                                                                    </select>
                                                                    <span className="btn btn-sm btn-bg-soft-secondary tippy-btn">
                                                                        <i className="dropicons dripicons-information" title="The date the employee will lose coverage under the active plan and will start COBRA coverage." data-bs-toggle="tooltip" data-bs-placement="top"></i>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6">
                                                                <div className="input-group mb-2">
                                                                    <select
                                                                        className="form-control selectpickers"
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
                                                                    </select>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        {plan.planRateType === "Age/Gender" && (
                                                            <div id={`agegendertext_${index}`}>
                                                                <div className="d-flex justify-content-center mb-2">
                                                                    <span><strong>Please upload an Excel file with your age/gender banded medical rates in File Uploads section.</strong></span>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {plan.planRateType === "Composite" && (
                                                            <div id={`rateinformation_${index}`} className="">
                                                                <h5 className="card-title">Rate Information</h5>
                                                                <div className="row">
                                                                    <div className="col-lg-3"></div>
                                                                    <div className="col-lg-3">
                                                                        Current Monthly Premium
                                                                        <span className="btn btn-sm btn-bg-soft-secondary tippy-btn">
                                                                            <i className="dropicons dripicons-information" title="This amount does not include the 2% admin fee" aria-label="This amount does not include the 2% admin fee"></i>
                                                                        </span>
                                                                    </div>
                                                                    <div className="col-lg-3">
                                                                        Prior Monthly Premium
                                                                        <span className="btn btn-sm btn-bg-soft-secondary tippy-btn">
                                                                            <i className="dropicons dripicons-information" title="Only required if current monthly rates started within the past 90 days and you have active/pending participants. This amount does not include the 2% admin fee." aria-label="Only required if current monthly rates started within the past 90 days and you have active/pending participants. This amount does not include the 2% admin fee."></i>
                                                                        </span>
                                                                    </div>
                                                                    <div className="col-lg-3">
                                                                        Future Monthly Premium
                                                                        <span className="btn btn-sm btn-bg-soft-secondary tippy-btn">
                                                                            <i className="dropicons dripicons-information" title="Only required if current monthly rates end within the next 60 days. This amount does not include the 2% admin fee." aria-label="Only required if current monthly rates end within the next 60 days. This amount does not include the 2% admin fee."></i>
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-lg-3"></div>
                                                                    <div className="col-lg-3">
                                                                        <div className="d-flex mb-2">
                                                                            <span className="input-group-text"><i className="far fa-calendar-alt"></i></span>

                                                                            <DatePicker
                                                                                className="form-control"
                                                                                selected={plan.currentRateStartDate || ''}
                                                                                onChange={(date) => handleDateChange(index, 'currentRateStartDate', date)}
                                                                                placeholderText="Current Rate Start Date" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-3">
                                                                        <div className="d-flex mb-2">
                                                                            <span className="input-group-text"><i className="far fa-calendar-alt"></i></span>

                                                                            <DatePicker
                                                                                className="form-control"
                                                                                selected={plan.priorRateStartDate || ''}
                                                                                onChange={(date) => handleDateChange(index, 'priorRateStartDate', date)}
                                                                                placeholderText="Prior Rate Start Date" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-3">
                                                                        <div className="d-flex mb-2">
                                                                            <span className="input-group-text"><i className="far fa-calendar-alt"></i></span>


                                                                            <DatePicker
                                                                                className="form-control"
                                                                                selected={plan.futureRateStartDate || ''}
                                                                                onChange={(date) => handleDateChange(index, 'futureRateStartDate', date)}
                                                                                placeholderText="Future Rate Start Date" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-lg-3">Coverage Level</div>
                                                                    <div className="col-lg-3">
                                                                        <div className="d-flex mb-2">
                                                                            <span className="input-group-text"><i className="far fa-calendar-alt"></i></span>


                                                                            <DatePicker
                                                                                className="form-control"
                                                                                selected={plan.currentRateEndDate || ''}
                                                                                onChange={(date) => handleDateChange(index, 'currentRateEndDate', date)}
                                                                                placeholderText="Current Rate End Date" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-3">
                                                                        <div className="d-flex mb-2">
                                                                            <span className="input-group-text"><i className="far fa-calendar-alt"></i></span>

                                                                            <DatePicker
                                                                                className="form-control"
                                                                                selected={plan.priorRateEndDate || ''}
                                                                                onChange={(date) => handleDateChange(index, 'priorRateEndDate', date)}
                                                                                placeholderText="Prior Rate End Date" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-3">
                                                                        <div className="d-flex mb-2">
                                                                            <span className="input-group-text"><i className="far fa-calendar-alt"></i></span>


                                                                            <DatePicker
                                                                                className="form-control"
                                                                                selected={plan.futureRateEndDate || ''}
                                                                                onChange={(date) => handleDateChange(index, 'futureRateEndDate', date)}
                                                                                placeholderText="Future Rate End Date" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <CobraPlanCoverageComponent
                                                                    planId={plan.id}
                                                                    planName={planName}
                                                                    selectOptions={selectOptions}
                                                                    initialFormValues={{}} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="card-footer" id="footer">
                                                    <div className="col-lg-12">
                                                        <button
                                                            className="delete-plan-info"
                                                            onClick={() => handleDeletePlan(index)}
                                                        >
                                                            <span className="fa fa-trash-alt me-1" id="delete"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="row">
                                    <div className="col-lg-12 add-cobra-plans add-cobra-medical-plans" id="add-medical-button">
                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm sm-btns my-1 float-end"
                                            onClick={handleAddPlan}
                                        >
                                            Add {planName} Plan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlansComponent;
