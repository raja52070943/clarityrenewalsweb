import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import config from '../config';

function CobraGeneralInformation({ cobraId, onError = () => { } }) {
    const fetchUrl = `${config.API_URL}/CobraGeneralInformations/ByPlanId/${cobraId}`;
    const updateUrl = `${config.API_URL}/CobraGeneralInformations`;
    const [generalInfo, setGeneralInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGeneralInfo();
    }, [cobraId]);

    const fetchGeneralInfo = async () => {
        try {
            const response = await axios.get(fetchUrl);
            setGeneralInfo(response.data || null);
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
        setGeneralInfo(prevInfo => {
            const updatedInfo = { ...prevInfo, [name]: value };
            debouncedUpdate(updatedInfo);
            return updatedInfo;
        });
    };

    const handleToggleChange = (e, property) => {
        const { checked } = e.target;
        setGeneralInfo(prevInfo => {
            const updatedInfo = { ...prevInfo, [property]: checked ? 'true' : 'false' };
            debouncedUpdate(updatedInfo);
            return updatedInfo;
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='col-lg-12 mb-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">General Information </h5>
                    
                    <div className="row mb-2">
                        <div className="col-lg-12">
                            <div className="form-check form-switch form-toggle">
                                <label className="form-check-label">
                                    We are currently receiving new qualifying events and newly
                                    eligible participants via
                                    <strong>(Show Account - Funding & Files - QB/NPM File Source)</strong>
                                    . Is this changing?
                                </label>
                                <input
                                    type="checkbox"
                                    className="form-check-input form-check-input-toggel toggle-input-switch"
                                    role="switch"
                                    checked={generalInfo?.isChange === 'true'}
                                    onChange={(e) => handleToggleChange(e, 'isChange')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={generalInfo?.isChange === 'true' ? '' : 'd-none'}>
                        <div className="row mb-2">
                            <div className="col-lg-6">
                                <div className="input-group mb-2">
                                    How will Clarity receive new qualifying events and newly
                                    eligible participants for the required notices?
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <select
                                    className="COBRADataSource selectpickers form-control"
                                    name="clarityEventReceiptionMethod"
                                    value={generalInfo?.clarityEventReceiptionMethod || ''}
                                    onChange={handleInputChange}
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
                                </select>
                            </div>
                        </div>

                       

                        <div className={generalInfo?.clarityEventReceiptionMethod?.includes('A third party vendor will provide an EDI File Feed') ? '' : 'd-none'}>
                            <div className="row mb-2">
                                <div className="col-lg-3">
                                    <input
                                        className="form-control"
                                        title="Vendor Name"
                                        type="text"
                                        name="vendorName"
                                        placeholder="Vendor Name"
                                        value={generalInfo?.vendorName || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-lg-3">
                                    <input
                                        className="form-control"
                                        title="Vendor Contact First Name"
                                        type="text"
                                        name="vendorContactFirstName"
                                        placeholder="Vendor Contact First Name"
                                        value={generalInfo?.vendorContactFirstName || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-lg-3">
                                    <input
                                        className="form-control"
                                        title="Vendor Contact Last Name"
                                        type="text"
                                        name="vendorContactLastName"
                                        placeholder="Vendor Contact Last Name"
                                        value={generalInfo?.vendorContactLastName || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-lg-3">
                                    <input
                                        className="form-control"
                                        title="Vendor Contact Email"
                                        type="email"
                                        name="vendorContactEmail"
                                        placeholder="Vendor Contact Email"
                                        value={generalInfo?.vendorContactEmail || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-lg-4">
                                <div className="input-group mb-2">
                                    What is your current benefit administration platform?
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <select
                                    className="COBRADataSource selectpickers form-control"
                                    name="currentBenefitAdministrationPlatform"
                                    value={generalInfo?.currentBenefitAdministrationPlatform || ''}
                                    onChange={handleInputChange}
                                >
                                    <option value="Common Ben Admin Platforms">
                                        Common Ben Admin Platforms
                                    </option>
                                    <option value="Other">Other</option>
                                </select>
                                {generalInfo?.currentBenefitAdministrationPlatform === 'Other' && (
                                    <input
                                        type="text"
                                        className='form-control mt-1'
                                        placeholder="Other"
                                        name="otherBenefitAdminPlatform"
                                        value={generalInfo?.otherBenefitAdminPlatform || ''}
                                        onChange={handleInputChange}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-lg-4">
                                <div className="input-group mb-2">
                                    What is your current payroll platform?
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <select
                                    className="COBRADataSource selectpickers form-control"
                                    name="currentPayrollPlatform"
                                    value={generalInfo?.currentPayrollPlatform || ''}
                                    onChange={handleInputChange}
                                >
                                    <option value="Common Payroll Platforms">
                                        Common Payroll Platforms
                                    </option>
                                    <option value="Other">Other</option>
                                </select>
                                {generalInfo?.currentPayrollPlatform === 'Other' && (
                                    <input
                                        type="text"
                                        className='form-control mt-1'
                                        placeholder="Other"
                                        name="otherPayrollPlatform"
                                        value={generalInfo?.otherPayrollPlatform || ''}
                                        onChange={handleInputChange}
                                    />
                                )}
                            </div>
                        </div>
                    
                </div>
            </div>
        </div>
    );
}

export default CobraGeneralInformation;
