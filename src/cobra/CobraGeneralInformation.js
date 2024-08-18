import React from 'react'

function CobraGeneralInformation() {
    return (
        <div className='col-lg-12 mb-3'>
            <div className="card" >
                <div className="card-body">

                    <h5 className="card-title">
                        General Information
                    </h5>

                    <div className="row mb-2">
                        <div className="col-lg-12">
                            <div className="form-check form-switch form-toggle">
                                <label className="form-check-label">
                                    We are currently receiving new qualifying events and newly
                                    eligible participants via
                                    <strong>(Show Account - Funding & Files - QB/NPM File Source)</strong>
                                    . Is this changing?
                                </label>

                                <input type="checkbox"
                                    className="form-check-input form-check-input-toggel toggle-input-switch"
                                    role="switch" value="true"
                                    onchange="receivingNew(this.checked)" />

                            </div>
                        </div>
                    </div>

                    <div className="d-none" id="newQualifyEvents">
                        <div className="row">

                            <div className="col-lg-6">
                                <div className="input-group mb-2">

                                    How will Clarity receive new qualifying events and newly
                                    eligible
                                    participants for the required notices?
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="input-group mb-2">



                                    <select className="COBRADataSource selectpickers form-control"
                                        onchange="UpdateCOBRADataSource(this.value)" data-val="true"
                                        data-val-required="The How will Clarity receive new qualifying events and newly eligible participants for the required notices field is required."
                                        id="COBRADataSource" name="COBRADataSource">
                                        <option value="Client/Broker will manually enter into the COBRA platform">
                                            Client/Broker will manually enter into the COBRA
                                            platform
                                        </option>
                                        <option
                                            value="Client/Broker will provide ongoing files for import into the COBRA platform">
                                            Client/Broker will provide ongoing files for import into
                                            the
                                            COBRA platform</option>


                                        <option value="Marketplace connection with Ease">Marketplace
                                            connection with Ease</option>
                                        <option value="Marketplace connection with Employee Navigator">
                                            Marketplace connection with Employee Navigator</option>
                                        <option value="A third party vendor will provide an EDI File Feed">
                                            A
                                            third party vendor will provide an EDI File Feed
                                        </option>
                                    </select>

                                </div>
                            </div>
                        </div>








                        <div className="row d-none" id="cobra_broker">

                            <div className="col-lg-3">
                                <div className="input-group mb-2">

                                    <input className="form-control" title="Broker Name"
                                        oninput="UpdateCOBRADataSourceBroker(this.value)"
                                        data-bs-toggle="tooltip" data-bs-placement="right"
                                        type="text" data-val="true"
                                        data-val-regex="Name should not contain special characters."
                                        data-val-regex-pattern="^[a-zA-Z0-9\s]&#x2B;$"
                                        data-val-required="Please Provide Broker Name"
                                        id="BrokerName" name="BrokerName" placeholder="Broker Name"
                                        value="" />

                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="input-group mb-2">

                                    <input className="form-control" title="Broker Contact First Name"
                                        oninput="UpdateCOBRADataSourceBrokerContactFirstName(this.value)"
                                        data-bs-toggle="tooltip" data-bs-placement="right"
                                        type="text" data-val="true"
                                        data-val-regex="Name should not contain special characters."
                                        data-val-regex-pattern="^[a-zA-Z0-9\s]&#x2B;$"
                                        data-val-required="Please Provide Broker Contact First Name"
                                        id="BrokerContactFirstName" name="BrokerContactFirstName"
                                        placeholder="Broker Contact First Name" value="" />

                                </div>
                            </div>


                            <div className="col-lg-3">
                                <div className="input-group mb-2">

                                    <input className="form-control" title="Broker Contact Last Name"
                                        oninput="UpdateCOBRADataSourceBrokerContactLastName(this.value)"
                                        data-bs-toggle="tooltip" data-bs-placement="right"
                                        type="text" data-val="true"
                                        data-val-regex="Name should not contain special characters."
                                        data-val-regex-pattern="^[a-zA-Z0-9\s]&#x2B;$"
                                        data-val-required="Please Provide Broker Contact Last Name"
                                        id="BrokerContactLastName" name="BrokerContactLastName"
                                        placeholder="Broker Contact Last Name" value="" />

                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="input-group mb-2">

                                    <input className="form-control" title="Broker Contact Email"
                                        oninput="COBRADataSourceBrokerContactEmail(this.value)"
                                        data-bs-toggle="tooltip" data-bs-placement="right"
                                        type="text" data-val="true"
                                        data-val-regex="A valid email address in the format is &#x27;user@example.com"
                                        data-val-regex-pattern="^[\w\.-]&#x2B;@[\w\.-]&#x2B;\.\w&#x2B;$"
                                        data-val-required="Please Provide Broker Contact Email"
                                        id="BrokerContactEmail" name="BrokerContactEmail"
                                        placeholder="Broker Contact Email" value="" />
                                </div>
                            </div>


                        </div>


                        <div className="row d-none" id="cobra_vendor">

                            <div className="col-lg-3">
                                <div className="input-group mb-2">

                                    <input className="form-control" title="Vendor Name"
                                        oninput="UpdateCOBRADataSourceVendor(this.value)"
                                        data-bs-toggle="tooltip" data-bs-placement="right"
                                        type="text" data-val="true"
                                        data-val-regex="Name should not contain special characters."
                                        data-val-regex-pattern="^[a-zA-Z0-9\s]&#x2B;$"
                                        data-val-required="Please Provide Vendor Name"
                                        id="VendorName" name="VendorName" placeholder="Vendor Name"
                                        value="" />

                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="input-group mb-2">

                                    <input className="form-control" title="Vendor Contact First Name"
                                        oninput="UpdateCOBRADataSourceVendorContactFirstName(this.value)"
                                        data-bs-toggle="tooltip" data-bs-placement="right"
                                        type="text" data-val="true"
                                        data-val-regex="Name should not contain special characters."
                                        data-val-regex-pattern="^[a-zA-Z0-9\s]&#x2B;$"
                                        data-val-required="Please Provide Vendor Contact First Name"
                                        id="VendorContactFirstName" name="VendorContactFirstName"
                                        placeholder="Vendor Contact First Name" value="" />

                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="input-group mb-2">

                                    <input className="form-control" title="Vendor Contact Last Name"
                                        oninput="UpdateCOBRADataSourceVendorContactLastName(this.value)"
                                        data-bs-toggle="tooltip" data-bs-placement="right"
                                        type="text" data-val="true"
                                        data-val-regex="Name should not contain special characters."
                                        data-val-regex-pattern="^[a-zA-Z0-9\s]&#x2B;$"
                                        data-val-required="Please Provide Vendor Contact Last Name"
                                        id="VendorContactLastName" name="VendorContactLastName"
                                        placeholder="Vendor Contact Last Name" value="" />

                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="input-group mb-2">

                                    <input className="form-control" title="Vendor Contact Email"
                                        oninput="COBRADataSourceVendorContactEmail(this.value)"
                                        data-bs-toggle="tooltip" data-bs-placement="right"
                                        type="text" data-val="true"
                                        data-val-regex="A valid email address in the format is &#x27;user@example.com"
                                        data-val-regex-pattern="^[\w\.-]&#x2B;@[\w\.-]&#x2B;\.\w&#x2B;$"
                                        data-val-required="Please Provide Vendor Contact Email"
                                        id="VendorContactEmail" name="VendorContactEmail"
                                        placeholder="Vendor Contact Email" value="" />
                                </div>
                            </div>


                        </div>


                    </div>

                    <div className="row  ">

                        <div className="col-lg-6">
                            <div className="input-group mb-2">

                                What is your current benefit administration platform?
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="input-group mb-2">



                                <select className="COBRADataSource selectpickers form-control"
                                    onchange="administrationPlatform(this.value)"
                                    data-val="true">
                                    <option value="Common Ben Admin Platforms ">
                                        Common Ben Admin Platforms
                                    </option>
                                    <option value="Other">
                                        Other</option>


                                </select>

                            </div>
                            <div className="input-group mb-2 d-none" id="manualEntryOther">



                                <input type="text" placeholder="Other" />

                            </div>
                        </div>

                    </div>

                    <div className="row ">

                        <div className="col-lg-6">
                            <div className="input-group mb-2">

                                What is your current payroll platform?
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="input-group mb-2">



                                <select className="COBRADataSource selectpickers form-control"
                                    onchange="payrollPlatform(this.value)" data-val="true">
                                    <option value="Common Payroll Platforms ">
                                        Common Payroll Platforms
                                    </option>
                                    <option value="Other">
                                        Other</option>


                                </select>

                            </div>
                            <div className="input-group mb-2 d-none" id="payrollPlatformOther">



                                <input type="text" placeholder="Other" />

                            </div>
                        </div>

                    </div>






















                </div>
            </div>
        </div>

    )
}

export default CobraGeneralInformation
