function receivingNew(_val) {
    if (_val) {
        $('#newQualifyEvents').removeClass('d-none')
    } else {
        $('#newQualifyEvents').addClass('d-none')
    }
}


function UpdateCOBRADataSource(_val) {
    if (_val == "A third party vendor will provide an EDI File Feed") {
        
        $('#cobra_vendor').removeClass('d-none');
    } else {
        $('#cobra_vendor').addClass('d-none')
        
    }
}

function administrationPlatform(_val) {
    if (_val == "Other") {
        $('#manualEntryOther').removeClass('d-none')
    } else {
        $('#manualEntryOther').addClass('d-none')
    }
}

function payrollPlatform(_val) {
    if (_val == "Other") {
        $('#payrollPlatformOther').removeClass('d-none')
    } else {
        $('#payrollPlatformOther').addClass('d-none')
    }
}


function terminateMedicalplan(_val) {
    if (_val) {
        $('#medical_card').addClass('d-none');
        $('.termination_date').removeClass('d-none')

    } else {
        $('#medical_card').removeClass('d-none');
        $('.termination_date').addClass('d-none');
    }
}

function terminateMedicalplan2(_val) {
    if (_val) {
        $('#medical_card2').addClass('d-none');
        $('.termination_date2').removeClass('d-none')

    } else {
        $('#medical_card2').removeClass('d-none');
        $('.termination_date2').addClass('d-none');
    }
}


function cOBRAMedicalPlanDivisionSwitch(_val) {
    if (_val) {
        $('.divisionsContainer').removeClass('d-none')
    } else {
        $('.divisionsContainer').addClass('d-none')
    }
}


function showNotice() {
    customAlert.alertconfirmation("NOTICE: You have not uploaded your SBC document(s). Once you submit your COBRA renewal, you will not have the option to upload the SBC document(s) here. You can provide SBC documents after renewal directly in the COBRA platform. Just click the 'Manage My COBRA' tile on the home page of the Clarity Portal.", "Confirmation", function () {
        //customAlert.terminationAlert();

        customAlert.terminationAlert('You indicated that some plans are terminating. Choose the Plan to which pending and active participants should be moved if they do not make an election. <div class = "container"><table class="table"><thead><tr><th>Terminating Plan</th><th>Plan Mapping</th></tr></thead><tbody><tr><td data-label="terminatingplan">Lhyut hgte r4w trftvk</td><td data-label="planmapping"><select class="COBRADataSource selectpickers form-control"><option > ABC </option><option > XYZ </option></select></td></tr></tbody></table></div>', "Confirmation", function () {
            
        });
    });
}



function updateDescription() {
    const contactType = document.getElementById('contactType').value;
    const name = document.getElementById('name').value;
    let prefix = '';

    if (contactType === 'Broker Contact') {
        prefix = 'BR: ';
    } else if (contactType === 'Employer Contact') {
        prefix = 'ER: ';
    } else if (contactType === 'Carrier Contact') {
        prefix = 'CR: ';
    }

    document.getElementById('description').value = prefix + name;
}

function toggleAdditionalFields() {
    const carrierSelect = document.getElementById('carrier');
    const benefitSelect = document.getElementById('benefitTypes');

    document.getElementById('carrierDropdown').style.display = carrierSelect.value === 'Specify Carriers' ? 'block' : 'none';
    document.getElementById('benefitDropdown').style.display = benefitSelect.value === 'Specify Benefit Types' ? 'block' : 'none';
}

function addNewContact(){
    $('#add_contact_section').removeClass('d-none')
}


function showHiddenColumns(){
    $('.edit_contact').removeClass('d-none')
}


function updateEnrollment(_val){
    if(_val == "EnrollClarity"){
        $('.open_enrollment').removeClass('d-none');
    }else if(_val == "NoEnroll" || _val == "EnrollBrokerOrClient"){
        $('.open_enrollment').addClass('d-none')
    }
}