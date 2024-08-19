import React from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

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
                                                            <div id="agegendertext_37">
                                                                <div className="d-flex justify-content-center mb-2">
                                                                    <span><strong>Please upload an Excel file with your age/gender banded medical rates in File Uploads section.</strong></span>
                                                                </div>
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
