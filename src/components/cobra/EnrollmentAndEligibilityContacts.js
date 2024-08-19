import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Table, Alert, Spinner } from 'react-bootstrap';
// import axios from 'axios'; // Commented out for future use

// Static data for demonstration
const staticContacts = [
  {
    description: 'Lhyut hgte r4w trftvk',
    email: 'john@example.com',
    carrier: 'Carrier 1',
    benefitType: 'Benefit 1',
    status: false
  },
  {
    description: 'Lhyut hgte r4w trftvk',
    email: 'mary@example.com',
    carrier: 'Carrier 1',
    benefitType: 'Benefit 1',
    status: false
  },
  {
    description: 'Lhyut hgte r4w trftvk',
    email: 'july@example.com',
    carrier: 'Carrier 1',
    benefitType: 'Benefit 1',
    status: false
  }
];

const ContactForm = ({ onSubmit, onCancel }) => {
  const [contactType, setContactType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [carrier, setCarrier] = useState('All Carriers');
  const [benefitTypes, setBenefitTypes] = useState('All Benefit Types');
  const [specificCarrier, setSpecificCarrier] = useState('');
  const [specificBenefit, setSpecificBenefit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      description,
      email,
      carrier: specificCarrier || carrier,
      benefitType: specificBenefit || benefitTypes,
      status: false
    });
  };

  return (
    <Form className="row mb-3" onSubmit={handleSubmit}>
      <div className="col-lg-3 mb-3">
        <Form.Group>
          <Form.Select
            id="contactType"
            name="contactType"
            value={contactType}
            onChange={(e) => setContactType(e.target.value)}
          >
            <option value="">Contact Type</option>
            <option value="Broker Contact">Broker Contact</option>
            <option value="Employer Contact">Employer Contact</option>
            <option value="Carrier Contact">Carrier Contact</option>
          </Form.Select>
        </Form.Group>
      </div>

      <div className="col-lg-3 mb-3">
        <Form.Group>
          <Form.Control
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
      </div>

      <div className="col-lg-3 mb-3">
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
      </div>

      <div className="col-lg-3 mb-3">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            readOnly
          />
        </Form.Group>
      </div>

      <div className="col-lg-3 mb-3">
        <Form.Group>
          <Form.Select
            id="carrier"
            name="carrier"
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
          >
            <option value="All Carriers">All Carriers</option>
            <option value="Specify Carriers">Specify Carriers</option>
          </Form.Select>
          {carrier === 'Specify Carriers' && (
            <Form.Select
              id="specificCarrier"
              name="specificCarrier"
              value={specificCarrier}
              onChange={(e) => setSpecificCarrier(e.target.value)}
            >
              <option value="">Select Carrier</option>
              <option value="Carrier1">Carrier1</option>
              <option value="Carrier2">Carrier2</option>
              <option value="Other">Other</option>
            </Form.Select>
          )}
        </Form.Group>
      </div>

      <div className="col-lg-3 mb-3">
        <Form.Group>
          <Form.Select
            id="benefitTypes"
            name="benefitTypes"
            value={benefitTypes}
            onChange={(e) => setBenefitTypes(e.target.value)}
          >
            <option value="All Benefit Types">All Benefit Types</option>
            <option value="Specify Benefit Types">Specify Benefit Types</option>
          </Form.Select>
          {benefitTypes === 'Specify Benefit Types' && (
            <Form.Select
              id="specificBenefit"
              name="specificBenefit"
              value={specificBenefit}
              onChange={(e) => setSpecificBenefit(e.target.value)}
            >
              <option value="">Select Benefit Type</option>
              <option value="Medical">Medical</option>
              <option value="Dental">Dental</option>
              <option value="Vision">Vision</option>
              <option value="EAP">EAP</option>
              <option value="HRA">HRA</option>
              <option value="FSA">FSA</option>
              <option value="Other">Other</option>
            </Form.Select>
          )}
        </Form.Group>
      </div>

      <div className="col-lg-1 mb-3">
        <Button variant="success" size="sm" type="submit">
          Submit
        </Button>
        <Button variant="secondary" size="sm" className="ms-2" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

const EnrollmentAndEligibilityContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch contacts from API
    // Commented out for now
    /*
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/contacts'); // Replace with your API endpoint
        setContacts(response.data);
      } catch (error) {
        setError('Error fetching contacts.');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
    */

    // Using static data for now
    setContacts(staticContacts);
    setLoading(false);
  }, []);

  const handleAddContact = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleSubmit = (contact) => {
    // Submit contact to API
    // Commented out for now
    /*
    const submitContact = async () => {
      try {
        await axios.post('/api/contacts', contact); // Replace with your API endpoint
        setContacts([...contacts, contact]);
        setIsAdding(false);
      } catch (error) {
        setError('Error submitting contact.');
      }
    };

    submitContact();
    */

    // Using static data for now
    setContacts([...contacts, contact]);
    setIsAdding(false);
  };

  return (
    <Card>
      <Card.Body>
        <div className="row">
          <h6 className="card-title">Enrollment and Eligibility Contacts</h6>
        </div>

        <div className="row shadow-none p-3 mb-5 bg-light rounded">
          <div className="d-flex justify-content-end mb-3">
            <Button variant="success" size="sm" onClick={handleAddContact}>
              Add New Contact
            </Button>
          </div>

          {isAdding && <ContactForm onSubmit={handleSubmit} onCancel={handleCancel} />}

          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <div className="container">
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
                      <td>{contact.description}</td>
                      <td>{contact.email}</td>
                      <td className="edit_contact">{contact.carrier}</td>
                      <td className="edit_contact">{contact.benefitType}</td>
                      <td>
                        <div className="form-check form-switch form-toggle">
                          <Form.Check
                            type="switch"
                            id={`status-${index}`}
                            checked={contact.status}
                            onChange={() => {
                              const updatedContacts = [...contacts];
                              updatedContacts[index].status = !updatedContacts[index].status;
                              setContacts(updatedContacts);
                              // Optionally update the status in the API
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <a href="#" onClick={() => { /* Handle Edit */ }} title="Edit">
                          <i className="fa-solid fa-pen"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default EnrollmentAndEligibilityContacts;
