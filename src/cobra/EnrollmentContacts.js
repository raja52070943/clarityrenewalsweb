import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

function EnrollmentContacts({ cobraId, onError = () => { }}) {
    const fetchUrl = `${config.API_URL}/EnrollmentAndEligibilityContacts/ByPlanId/${cobraId}`;
    const updateUrl = `${config.API_URL}/EnrollmentAndEligibilityContacts`;

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [contactType, setContactType] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [carrier, setCarrier] = useState('All Carriers');
    const [benefitType, setBenefitType] = useState('All Benefit Types');
    const [selectedCarrier, setSelectedCarrier] = useState('');
    const [selectedBenefitType, setSelectedBenefitType] = useState('');

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get(fetchUrl);
            setContacts(response.data || []);
        } catch (error) {
            setError('Error fetching contacts.');
            onError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddContact = async () => {
        
        if (!name || !email || !contactType) {
            alert('Please fill in all required fields.');
            return;
        }
    
        const contactDescription = `${contactType === 'Broker Contact' ? 'BR' : contactType === 'Employer Contact' ? 'ER' : 'CR'}: ${name}`;
    
        const newContact = {
            contactDescription,
            contactEmail: email,
            carrierType: carrier === 'Specify Carriers' ? selectedCarrier : carrier,
            benefitType: benefitType === 'Specify Benefit Types' ? selectedBenefitType : benefitType,
            contactStatus: 'true',  
            COBRAPlanId: cobraId 
        };
        
        try {
            // Call API to add new contact
            await axios.post(updateUrl, newContact);
    
            // Update state on success
            setContacts([...contacts, newContact]);
            setShowForm(false);
            setContactType('');
            setName('');
            setEmail('');
            setCarrier('All Carriers');
            setBenefitType('All Benefit Types');
            setSelectedCarrier('');
            setSelectedBenefitType('');
        } catch (error) {
            // Handle error
            setError('Error adding contact.');
            console.error('Error adding contact:', error);
            onError(error);
        }
    };

    return (
        <div className="col-lg-12 mb-3">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <h6 className="card-title">Enrollment and Eligibility Contacts</h6>
                    </div>
                    <div className="row shadow-none p-3 mb-5 bg-light rounded">
                        <div className="d-flex justify-content-end mb-3">
                        {!showForm && (<button 
                                className="btn btn-success btn-sm mt-1 me-1"
                                onClick={() => setShowForm(true)}
                            >
                              Add New Contact
                            </button>)}
                            
                        </div>

                        {showForm && (
    <div className="container mb-4">
        <form>
            <div className='row'>
                <div className="col-lg-4 mb-3">
                    <label htmlFor="contactType" className="form-label">Contact Type</label>
                    <select
                        id="contactType"
                        className="form-control"
                        value={contactType}
                        onChange={(e) => setContactType(e.target.value)}
                    >
                        <option value="">Select Contact Type</option>
                        <option value="Broker Contact">Broker Contact</option>
                        <option value="Employer Contact">Employer Contact</option>
                        <option value="Carrier Contact">Carrier Contact</option>
                    </select>
                </div>

                <div className="col-lg-4 mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="col-lg-4 mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="col-lg-4 mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        id="description"
                        className="form-control"
                        value={`${contactType === 'Broker Contact' ? 'BR' : contactType === 'Employer Contact' ? 'ER' : 'CR'}: ${name}`}
                        readOnly
                    />
                </div>

                <div className="col-lg-4 mb-3">
                    <label htmlFor="carrier" className="form-label">Carrier</label>
                    <select
                        id="carrier"
                        className="form-control"
                        value={carrier}
                        onChange={(e) => setCarrier(e.target.value)}
                    >
                        <option value="All Carriers">All Carriers</option>
                        <option value="Specify Carriers">Specify Carriers</option>
                    </select>

                    {carrier === 'Specify Carriers' && (
                        <div className="mt-2">
                            <select
                                className="form-control"
                                value={selectedCarrier}
                                onChange={(e) => setSelectedCarrier(e.target.value)}
                            >
                                <option value="">Select Carrier</option>
                                {/* Add list of carriers here */}
                                <option value="Carrier1">Carrier1</option>
                                <option value="Carrier2">Carrier2</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="col-lg-4 mb-3">
                    <label htmlFor="benefitType" className="form-label">Benefit Types</label>
                    <select
                        id="benefitType"
                        className="form-control"
                        value={benefitType}
                        onChange={(e) => setBenefitType(e.target.value)}
                    >
                        <option value="All Benefit Types">All Benefit Types</option>
                        <option value="Specify Benefit Types">Specify Benefit Types</option>
                    </select>

                    {benefitType === 'Specify Benefit Types' && (
                        <div className="mt-2">
                            <select
                                className="form-control"
                                value={selectedBenefitType}
                                onChange={(e) => setSelectedBenefitType(e.target.value)}
                            >
                                <option value="">Select Benefit Type</option>
                                <option value="Medical">Medical</option>
                                <option value="Dental">Dental</option>
                                <option value="Vision">Vision</option>
                                <option value="EAP">EAP</option>
                                <option value="HRA">HRA</option>
                                <option value="FSA">FSA</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="col-12 text-center mb-3">
                    <button 
                        type="button"
                        className="btn btn-success btn-lg me-2"
                        onClick={handleAddContact}
                    >
                        Add
                    </button>
                    <button 
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => setShowForm(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    </div>
)}


                        <div className="container">
                            
                            {contacts.length ? (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Email</th>
                                            <th className="edit_contact">Carrier</th>
                                            <th className="edit_contact">Benefit Type</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts.map((contact, index) => (
                                            <tr key={index}>
                                                <td>{contact.contactDescription}</td>
                                                <td>{contact.contactEmail}</td>
                                                <td className="edit_contact">
                                                    {contact.carrierType}
                                                </td>
                                                <td className="edit_contact">
                                                    {contact.benefitType}
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch form-toggle">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input form-check-input-toggle-active toggle-input-switch"
                                                            role="switch"
                                                            checked={contact.contactStatus}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#" onClick={() => {}} title="Edit">
                                                        <i className="fa-solid fa-pen"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <h3>No Contacts</h3>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EnrollmentContacts;
