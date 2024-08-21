import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import config from '../config';

function CobraOpenEnrollment({ cobraId, onError = () => { }  }) {
    const fetchUrl = `${config.API_URL}/CobraOpenEnrollmentManagements/ByPlanId/${cobraId}`;
    const updateUrl = `${config.API_URL}/CobraOpenEnrollmentManagements`;


    const [enrollmentMethod, setEnrollmentMethod] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEnrollmentMethod();
    }, [cobraId]);

    const fetchEnrollmentMethod = async () => {
        try {
            const response = await axios.get(fetchUrl);
            
            setEnrollmentMethod(response.data || null);
        } catch (error) {
            setError('Error fetching plans.');
        } finally {
            setLoading(false);
        }
    };

    const debouncedUpdate = useCallback(
        debounce(async (updatedInfo) => {
            try {
                await axios.put(`${updateUrl}/${updatedInfo.id}`, updatedInfo);
            } catch (error) {
                console.error('Error updating plan:', error);
                onError(error);
            }
        }, 500),
        [updateUrl, onError]
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEnrollmentMethod(prevInfo => {
            const updatedInfo = { ...prevInfo, [name]: value };
            debouncedUpdate(updatedInfo);
            return updatedInfo;
        });
    };

    return (
        <div className="col-lg-12 mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title mb-3">
                        COBRA Open Enrollment Management {enrollmentMethod?.id}
                    </h5>

                    <div className="d-flex mb-2">
                        <div className="form-check-inline">
                            <label>Open Enrollment Method: </label>
                        </div>
                        <div className="form-check-inline">
                            <input
                                type="radio"
                                className="emp-form-check-input"
                                value="Participant will Enroll Online with Clarity"
                                id="ClarityAdminister"
                                name="openEnrollmentMethod"
                                checked={enrollmentMethod?.openEnrollmentMethod === "Participant will Enroll Online with Clarity"}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="ClarityAdminister">Participant will Enroll Online with Clarity</label>
                        </div>
                        <div className="form-check-inline">
                            <input
                                type="radio"
                                className="emp-form-check-input"
                                id="BrokerClientAdminister"
                                name="openEnrollmentMethod"
                                value="Broker/Client will manage Open Enrollment"
                                checked={enrollmentMethod?.openEnrollmentMethod === "Broker/Client will manage Open Enrollment"}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="BrokerClientAdminister">Broker/Client will manage Open Enrollment</label>
                        </div>
                        <div className="form-check-inline">
                            <input
                                type="radio"
                                className="emp-form-check-input"
                                id="NoOpenEnrollment"
                                name="openEnrollmentMethod"
                                value="No Open Enrollment"
                                checked={enrollmentMethod?.openEnrollmentMethod === "No Open Enrollment"}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="NoOpenEnrollment">No Open Enrollment (no active members)</label>
                        </div>
                    </div>

{enrollmentMethod?.openEnrollmentMethod === "Participant will Enroll Online with Clarity" && (
    <div>
        <div className="row open_enrollment mb-2">
                                   <div className="col-lg-5">
                                       <div className="input-group">
                                           How many days are you offering open enrollment to active employees?
                                       </div>
                                   </div>
                                   <div className="col-lg-1">
                                       <input
                                           placeholder="Days"
                                           className="form-control"
                                           name="noOfDaysOffered"
                                           type="text"
                                           value={enrollmentMethod?.noOfDaysOffered}
                                           onChange={handleInputChange}
                                       />
                                   </div>
                               </div>
           
                               <div className="d-flex mb-2 open_enrollment">
                                   <strong>Once your renewal is submitted, we will create an open enrollment period beginning in the next 10 business days that matches the length of your active employees' OE.</strong>
                               </div>
    </div>
                                   
                                )}

                    
                    
                </div>
            </div>
        </div>
    );
}

export default CobraOpenEnrollment;
