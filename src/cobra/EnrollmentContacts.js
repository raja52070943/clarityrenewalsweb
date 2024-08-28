import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { Container, Row, Col, Button, Card, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function EnrollmentContacts({ cobraId, onError = () => { }, onValidationStateChange = () => { } }) {
    const fetchUrl = `${config.API_URL}/EnrollmentAndEligibilityContacts/ByPlanId/${cobraId}`;
    const updateUrl = `${config.API_URL}/EnrollmentAndEligibilityContacts`;

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingContactId, setEditingContactId] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});


    const [formData, setFormData] = useState({
        contactType: '',
        name: '',
        email: '',
        carrier: 'All Carriers',
        benefitType: 'All Benefit Types',
        selectedCarrier: '',
        selectedBenefitType: ''
    });

    const validateForm = (info) => {
        // const errors = {};

        const errors = {
            contactType: '',
            name: '',
            email: '',
            selectedCarrier: '',
            selectedBenefitType: ''
        };

        if (!formData.contactType) {
            errors.contactType = 'Contact Type is required.';
        }

        if (!formData.name) {
            errors.name = 'Name is required.';
        }

        if (!formData.email) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid.';
        }

        if (formData.carrier === 'Specify Carriers' && !formData.selectedCarrier) {
            errors.selectedCarrier = 'Carrier is required when "Specify Carriers" is selected.';
        }

        if (formData.benefitType === 'Specify Benefit Types' && !formData.selectedBenefitType) {
            errors.selectedBenefitType = 'Benefit Type is required when "Specify Benefit Types" is selected.';
        }

        setValidationErrors(errors);
        // onValidationStateChange(errors); // Send the validation errors to the parent
        // Return true if no errors
        return !Object.values(errors).some(error => error);
    };

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

    const handleEditContact = (contact) => {
        setEditingContactId(contact.id);
        setFormData({
            contactType: contact.contactDescription.includes('BR') ? 'Broker Contact' :
                contact.contactDescription.includes('ER') ? 'Employer Contact' :
                    'Carrier Contact',
            name: contact.contactDescription.split(': ')[1],
            email: contact.contactEmail,
            carrier: contact.carrierType,
            benefitType: contact.benefitType,
            selectedCarrier: contact.carrierType === 'Specify Carriers' ? contact.carrierType : '',
            selectedBenefitType: contact.benefitType === 'Specify Benefit Types' ? contact.benefitType : ''
        });
        setShowForm(true);
    };

    const handleSaveContact = async () => {
        // if (!formData.name || !formData.email || !formData.contactType) {
        //     alert('Please fill in all required fields.');
        //     return;
        // }
        if (!validateForm()) {
            return
        }
        const contactDescription = `${formData.contactType === 'Broker Contact' ? 'BR' :
            formData.contactType === 'Employer Contact' ? 'ER' : 'CR'}: ${formData.name}`;

        const updatedContact = {
            id: editingContactId,
            contactType: formData.contactType,
            contactDescription,
            contactEmail: formData.email,
            carrierType: formData.carrier === 'Specify Carriers' ? formData.selectedCarrier : formData.carrier,
            benefitType: formData.benefitType === 'Specify Benefit Types' ? formData.selectedBenefitType : formData.benefitType,
            contactStatus: "true",
            COBRAPlanId: cobraId
        };

        try {
            await axios.put(`${updateUrl}/${editingContactId}`, updatedContact);
            setContacts(contacts.map(contact => contact.id === editingContactId ? updatedContact : contact));
            setShowForm(false);
            setEditingContactId(null);
            setFormData({
                contactType: '',
                name: '',
                email: '',
                carrier: 'All Carriers',
                benefitType: 'All Benefit Types',
                selectedCarrier: '',
                selectedBenefitType: ''
            });
        } catch (error) {
            setError('Error updating contact.');
            onError(error);
        }
    };

    const handleAddContact = async () => {
        // if (!formData.name || !formData.email || !formData.contactType) {
        //     alert('Please fill in all required fields.');
        //     return;
        // }
        if (!validateForm()) {
            return;
        }
        const contactDescription = `${formData.contactType === 'Broker Contact' ? 'BR' :
            formData.contactType === 'Employer Contact' ? 'ER' : 'CR'}: ${formData.name}`;

        const newContact = {
            contactDescription,
            contactEmail: formData.email,
            carrierType: formData.carrier === 'Specify Carriers' ? formData.selectedCarrier : formData.carrier,
            benefitType: formData.benefitType === 'Specify Benefit Types' ? formData.selectedBenefitType : formData.benefitType,
            contactStatus: 'true',
            COBRAPlanId: cobraId
        };

        try {
            await axios.post(updateUrl, newContact);
            setContacts([...contacts, newContact]);
            setShowForm(false);
            setFormData({
                contactType: '',
                name: '',
                email: '',
                carrier: 'All Carriers',
                benefitType: 'All Benefit Types',
                selectedCarrier: '',
                selectedBenefitType: ''
            });
        } catch (error) {
            setError('Error adding contact.');
            onError(error);
        }
    };

    const handleToggleChange = async (e, _id) => {
        const { checked } = e.target;

        const updatedContact = {
            id: _id,
            contactStatus: checked ? 'true' : 'false',
            COBRAPlanId: cobraId
        };

        try {
            await axios.put(`${updateUrl}/${_id}`, updatedContact);
            setContacts(contacts.map(contact =>
                contact.id === _id ? { ...contact, contactStatus: updatedContact.contactStatus } : contact
            ));
        } catch (error) {
            setError('Error updating contact status.');
            onError(error);
        }
    };

    return (
        <Container fluid className="col-lg-12 mb-3">
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <h6>Enrollment and Eligibility Contacts</h6>
                        </Col>
                        <Col className="text-end">
                            {!showForm && (
                                <Button
                                    variant="success"
                                    onClick={() => setShowForm(true)}
                                >
                                    Add New Contact
                                </Button>
                            )}
                        </Col>
                    </Row>
                    {showForm && (
                        <Container className="mb-4">
                            <Form>
                                <Row>
                                    <Col lg={4} className="mb-3">
                                        <Form.Group controlId="contactType">
                                            <Form.Label>Contact Type</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={formData.contactType}
                                                // onChange={(e) => setFormData({ ...formData, contactType: e.target.value })}
                                                onChange={(e) => setFormData({ ...formData, contactType: e.target.value })}
                                                isInvalid={!!validationErrors.contactType}
                                            >
                                                <option value="">Select Contact Type</option>
                                                <option value="Broker Contact">Broker Contact</option>
                                                <option value="Employer Contact">Employer Contact</option>
                                                <option value="Carrier Contact">Carrier Contact</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                {validationErrors.contactType}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col lg={4} className="mb-3">
                                        <Form.Group controlId="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={formData.name}
                                                // onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                isInvalid={!!validationErrors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {validationErrors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col lg={4} className="mb-3">
                                        <Form.Group controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={formData.email}
                                                // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                isInvalid={!!validationErrors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {validationErrors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col lg={4} className="mb-3">
                                        <Form.Group controlId="description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={`${formData.contactType === 'Broker Contact' ? 'BR' :
                                                    formData.contactType === 'Employer Contact' ? 'ER' : 'CR'}: ${formData.name}`}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col lg={4} className="mb-3">
                                        <Form.Group controlId="carrier">
                                            <Form.Label>Carrier</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={formData.carrier}
                                                // onChange={(e) => {
                                                //     setFormData({ ...formData, carrier: e.target.value });
                                                //     if (e.target.value === 'Specify Carriers') {
                                                //         // Show carrier options when 'Specify Carriers' is selected
                                                //         setFormData({ ...formData, selectedCarrier: '' });
                                                //     }
                                                // }}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setFormData({
                                                        ...formData,
                                                        carrier: value,
                                                        selectedCarrier: value === 'Specify Carriers' ? formData.selectedCarrier : ''
                                                    });
                                                }}
                                                isInvalid={!!validationErrors.selectedCarrier}
                                            >
                                                <option value="All Carriers">All Carriers</option>
                                                <option value="Specify Carriers">Specify Carriers</option>
                                            </Form.Control>
                                        </Form.Group>
                                        {formData.carrier === 'Specify Carriers' && (
                                            <Form.Group controlId="selectedCarrier" className="mt-2">
                                                <Form.Control
                                                    as="select"
                                                    value={formData.selectedCarrier}
                                                    onChange={(e) => setFormData({ ...formData, selectedCarrier: e.target.value })}
                                                    isInvalid={!!validationErrors.selectedCarrier}
                                                >
                                                    <option value="">Select Carrier</option>
                                                    <option value="Carrier1">Carrier1</option>
                                                    <option value="Carrier2">Carrier2</option>
                                                    <option value="Other">Other</option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {validationErrors.selectedCarrier}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        )}
                                    </Col>

                                    <Col lg={4} className="mb-3">
                                        <Form.Group controlId="benefitType">
                                            <Form.Label>Benefit Types</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={formData.benefitType}
                                                // onChange={(e) => setFormData({ ...formData, benefitType: e.target.value })}
                                                // onChange={(e) => setFormData({ ...formData, selectedBenefitType: e.target.value })}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setFormData({
                                                        ...formData,
                                                        benefitType: value,
                                                        selectedBenefitType: value === 'Specify Benefit Types' ? formData.selectedBenefitType : ''
                                                    });

                                                }}
                                                isInvalid={!!validationErrors.selectedBenefitType}

                                            >
                                                <option value="All Benefit Types">All Benefit Types</option>
                                                <option value="Specify Benefit Types">Specify Benefit Types</option>
                                            </Form.Control>
                                            {formData.benefitType === 'Specify Benefit Types' && (
                                                <><Form.Control
                                                    as="select"
                                                    className="mt-2"
                                                    value={formData.selectedBenefitType}
                                                    onChange={(e) => setFormData({ ...formData, selectedBenefitType: e.target.value })}
                                                    isInvalid={!!validationErrors.selectedBenefitType}
                                                >
                                                    <option value="">Select Benefit Type</option>
                                                    <option value="Medical">Medical</option>
                                                    <option value="Dental">Dental</option>
                                                    <option value="Vision">Vision</option>
                                                    <option value="EAP">EAP</option>
                                                    <option value="HRA">HRA</option>
                                                    <option value="FSA">FSA</option>
                                                    <option value="Other">Other</option>
                                                </Form.Control><Form.Control.Feedback type="invalid">
                                                        {validationErrors.selectedBenefitType}
                                                    </Form.Control.Feedback></>
                                            )}
                                        </Form.Group>
                                    </Col>

                                    <Col className="text-center mb-3">
                                        <Button
                                            variant="success"
                                            onClick={editingContactId ? handleSaveContact : handleAddContact}
                                        >
                                            {editingContactId ? 'Update Contact' : 'Add Contact'}
                                        </Button>
                                        <Button
                                            variant="primary"
                                            className="ms-2"
                                            onClick={() => setShowForm(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    )}

                    <ContactTable contacts={contacts} onEdit={handleEditContact} onToggleStatus={handleToggleChange} />
                </Card.Body>
            </Card>
        </Container>
    );
}

function ContactTable({ contacts, onEdit, onToggleStatus }) {
    return (
        <Container>
            {contacts.length ? (
                <Table striped bordered hover>
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
                                <td className="edit_contact">{contact.carrierType}</td>
                                <td className="edit_contact">{contact.benefitType}</td>
                                <td>
                                    <Form.Check
                                        type="switch"
                                        id={`contact_status_${contact.id}`}
                                        checked={contact?.contactStatus === "true"}
                                        onChange={(e) => onToggleStatus(e, contact.id)}
                                    />
                                </td>
                                <td>
                                    <span onClick={() => onEdit(contact)} title="Edit">
                                        ✏️
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <h3>No Contacts</h3>
            )}
        </Container>
    );
}

export default EnrollmentContacts;
