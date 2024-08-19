import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

const EnrollmentManagement = () => {
    const [enrollmentMethod, setEnrollmentMethod] = useState('EnrollClarity');
    const [openEnrollmentDays, setOpenEnrollmentDays] = useState('');
    const [apiData, setApiData] = useState(null); // For storing API response data

    // Fetch data from API when the component mounts
    useEffect(() => {
        // Replace with your API endpoint
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/enrollment-data');
                setApiData(response.data);
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        };

        fetchData();
    }, []);

    // Function to handle form submission and post data to the API
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Prepare data for submission
        const data = {
            enrollmentMethod,
            openEnrollmentDays,
        };

        try {
            // Replace with your API endpoint
            await axios.post('/api/enrollment-submit', data);
            alert('Data submitted successfully');
        } catch (error) {
            console.error('Error submitting data to API:', error);
            alert('Error submitting data');
        }
    };

    const handleEnrollmentChange = (e) => {
        setEnrollmentMethod(e.target.value);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title mb-3">
                    {/* COBRA OPEN ENROLLMENT MANAGEMENT section */}
                    COBRA Open Enrollment Management
                </h5>

                {/* Form for handling user input and API interaction */}
                <Form onSubmit={handleSubmit}>
                    {/* Row for the question and switch input */}
                    <div className="d-flex">
                        <div className="mb-2">
                            <Form.Label>Open Enrollment Method:</Form.Label>

                            <Form.Check
                                inline
                                type="radio"
                                label="Participant will Enroll Online with Clarity"
                                value="EnrollClarity"
                                checked={enrollmentMethod === 'EnrollClarity'}
                                onChange={handleEnrollmentChange}
                                id="EnrollClarity"
                                name="enrollmentMethod"
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Broker/Client will manage Open Enrollment"
                                value="EnrollBrokerOrClient"
                                checked={enrollmentMethod === 'EnrollBrokerOrClient'}
                                onChange={handleEnrollmentChange}
                                id="EnrollBrokerOrClient"
                                name="enrollmentMethod"
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="No Open Enrollment (no active members)"
                                value="NoEnroll"
                                checked={enrollmentMethod === 'NoEnroll'}
                                onChange={handleEnrollmentChange}
                                id="NoEnroll"
                                name="enrollmentMethod"
                            />
                        </div>
                    </div>

                    <div className="row open_enrollment">
                        <div className="col-lg-5">
                            <Form.Label>How many days are you offering open enrollment to active employees?</Form.Label>
                        </div>

                        <div className="col-lg-1">
                            <InputGroup className="mb-2">
                                <FormControl
                                    placeholder="Days"
                                    type="text"
                                    value={openEnrollmentDays}
                                    onChange={(e) => setOpenEnrollmentDays(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    </div>

                    <div className="d-flex mb-2 open_enrollment">
                        <strong>
                            Once your renewal is submitted, we will create an open enrollment period beginning in the next 10 business days that matches the length of your active employees' OE.
                        </strong>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </Form>
            </div>
        </div>
    );
};

export default EnrollmentManagement;
