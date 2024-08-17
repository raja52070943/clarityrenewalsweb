import React from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce'; // Import debounce from lodash

function CobraPlansComponent({
    apiEndpoint,
    fetchUrl,
    updateUrl,
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

    // Fetch plans data
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

    // Debounced update function to send data to the server
    const debouncedUpdate = React.useCallback(
        debounce(async (updatedPlan) => {
            try {
                await axios.put(updateUrl, updatedPlan);
            } catch (error) {
                console.error('Error updating plan:', error);
                onError(error);
            }
        }, 500), // 500ms debounce interval
        []
    );

    // Handle input changes and send updates
    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPlans = [...plans];
        updatedPlans[index] = { ...updatedPlans[index], [name]: value };
        setPlans(updatedPlans);
        debouncedUpdate(updatedPlans[index]);
    };

    // Handle toggle changes
    const handleToggleChange = (index, e) => {
        const { checked } = e.target;
        const updatedPlans = [...plans];
        updatedPlans[index] = { ...updatedPlans[index], isDivisionSpecific: checked ? 'true' : 'false' };
        setPlans(updatedPlans);
        debouncedUpdate(updatedPlans[index]);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (plans.length === 0) return <div>No plans available.</div>;

    return (
        <div className="">
            <h5 className="plan-section">Plans</h5>
            <div className="col-lg-12 mb-3">
                <div className="collapsible">
                    <div className="collapsible-btn plan-collapsible-btn mx-auto d-block">
                        Plan Information
                    </div>
                    <div className="collapsible-content mt-3">
                        <div className="container-fluid">
                            <div className="row session">
                                {plans.map((plan, index) => (
                                    <div key={index} className="plan-repeater" id={`planContainer-${index}`}>
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <div className="row mb-3">
                                                    {formFields.map((field, fieldIndex) => (
                                                        <div key={fieldIndex} className="col-lg-3">
                                                            <div className="input-group mb-2">
                                                                {field.type === 'select' ? (
                                                                    <select
                                                                        className={`form-control selectpicker ${field.className}`}
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
                                                                onChange={(e) => handleToggleChange(index, e)}
                                                                id={`plan_IsDivisionSpecific-${index}`}
                                                                name="isDivisionSpecific"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className={`col-lg-3 ${plan.isDivisionSpecific === 'true' ? '' : 'd-none'}`} id={`planDivision_${index}`}>
                                                        <select
                                                            className="entitytype selectpicker form-control"
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CobraPlansComponent;
