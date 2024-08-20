function updateEnroll(_val){
    if(_val){
        $('.data_transmission_method').removeClass('d-none');
    }else{
        $('.data_transmission_method').addClass('d-none');
    }
}


function updateplanTerminating(_val){
    if(_val){
        $('#termiDate').removeClass('d-none');
        $('#hraContent').addClass('d-none');
    }else{
        $('#termiDate').addClass('d-none');
        $('#hraContent').removeClass('d-none');
    }
}

function updateHraAutoRenew(_val){
    if(_val){
        $('.auto_renew_section').removeClass('d-none');
        $('.default_hra_section').addClass('d-none');
    }else{
        $('.auto_renew_section').addClass('d-none');
        $('.default_hra_section').removeClass('d-none');
    }
}

function updateVisibility(_val){
    if(_val){
        $('#payScheduleTypesContainer').removeClass('d-none');
    }
    else{
        $('#payScheduleTypesContainer').addClass('d-none');
    }
    }

function updateVendorDepositOption(_val){
    if(_val){
        $('#payrollvendorBlock').removeClass('d-none');

    }
    else{
        $('#payrollvendorBlock').addClass('d-none');
    }
}

function toggleAdditionalFields(selectElement) {
    const additionalFields = document.getElementById('additionalFields');
    
    if (selectElement.value === 'Third Party Enrollment File') {
        additionalFields.classList.remove('d-none');
        additionalFields.classList.add('d-block');
    } else {
        additionalFields.classList.remove('d-block');
        additionalFields.classList.add('d-none');
    }
}