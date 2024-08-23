const ok = () => {
  document.getElementById('dialogbox').style.display = "none";
  document.getElementById('dialogoverlay').style.display = "none";
}


export const alertconfirmation = (message, title, yesCallback, noCallback) => {
    var dialogContainer = document.getElementById('dialogContainer');
    if (!dialogContainer) {
      dialogContainer = document.createElement('div');
      dialogContainer.id = 'dialogContainer';
      document.body.appendChild(dialogContainer);
    }
  
    dialogContainer.innerHTML = `
      <div id="dialogoverlay"></div>
      <div id="dialogbox" class="slit-in-vertical">
        <div>
          <div id="dialogboxhead"></div>
          <div id="dialogboxbody"></div>
          <div id="dialogboxfoot"></div>
        </div>
      </div>
    `;
  
    var dialogoverlay = document.getElementById('dialogoverlay');
    var dialogbox = document.getElementById('dialogbox');
  
    var winH = window.innerHeight;
    dialogoverlay.style.height = winH + "px";
  
    dialogbox.style.top = "100px";
  
    dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
  
    var dialogboxhead = document.getElementById('dialogboxhead');
    if (typeof title === 'undefined') {
      dialogboxhead.style.display = 'none';
    } else {
      dialogboxhead.style.display = 'block';
      dialogboxhead.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${title}`;
    }
  
    document.getElementById('dialogboxbody').innerHTML = message;
  
    var yesButton = document.createElement('button');
    yesButton.className = "pure-material-button-contained-yes active me-2";
    yesButton.textContent = "Ok";
    yesButton.onclick = (() => dialogContainer.remove());
  
    var noButton = document.createElement('button');
    noButton.className = "pure-material-button-contained active";
    noButton.textContent = "Cancel";
    noButton.onclick = noCallback || (() => dialogContainer.remove());
  
    document.getElementById('dialogboxfoot').innerHTML = '';
    document.getElementById('dialogboxfoot').appendChild(yesButton);
    document.getElementById('dialogboxfoot').appendChild(noButton);
  };



// Define terminationAlert function
export const terminationAlert = (message, title, yesCallback, noCallback) => {
  var dialogContainer = document.getElementById('dialogContainer');
  if (!dialogContainer) {
      dialogContainer = document.createElement('div');
      dialogContainer.id = 'dialogContainer';
      document.body.appendChild(dialogContainer);
  }

  dialogContainer.innerHTML = '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

  var dialogoverlay = document.getElementById('dialogoverlay');
  var dialogbox = document.getElementById('dialogbox');

  var winH = window.innerHeight;
  dialogoverlay.style.height = winH + "px";

  dialogbox.style.top = "100px";

  dialogoverlay.style.display = "block";
  dialogbox.style.display = "block";

  var dialogboxhead = document.getElementById('dialogboxhead');
  if (typeof title === 'undefined') {
      dialogboxhead.style.display = 'none';
  } else {
      dialogboxhead.style.display = 'block';
      dialogboxhead.innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + title;
  }

  document.getElementById('dialogboxbody').innerHTML = message;

  var yesButton = document.createElement('button');
  yesButton.className = "pure-material-button-contained-yes active me-2";
  yesButton.textContent = "Save";
  yesButton.onclick = (() => dialogContainer.remove());

  var noButton = document.createElement('button');
  noButton.className = "pure-material-button-contained active";
  noButton.textContent = "Cancel";
  noButton.onclick = () => {
      alertPlanMappingWarning(
          'This plan mapping is required to complete your COBRA renewal. Canceling will leave your COBRA renewal incomplete. Do you still wish to Cancel?',
          'Warning',
          message,
          () => {
              terminationAlert(
                message,
                title,
                  () => {},
                  () => {}
              );
          },
          () => {}
      );
  };

  document.getElementById('dialogboxfoot').innerHTML = '';
  document.getElementById('dialogboxfoot').appendChild(yesButton);
  document.getElementById('dialogboxfoot').appendChild(noButton);
};

// Define alertPlanMappingWarning function
export const alertPlanMappingWarning = (message, title, terminationAlertContent, yesCallback, noCallback) => {
  var dialogContainer = document.getElementById('dialogContainer');
  if (!dialogContainer) {
      dialogContainer = document.createElement('div');
      dialogContainer.id = 'dialogContainer';
      document.body.appendChild(dialogContainer);
  }

  dialogContainer.innerHTML = '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

  var dialogoverlay = document.getElementById('dialogoverlay');
  var dialogbox = document.getElementById('dialogbox');

  var winH = window.innerHeight;
  dialogoverlay.style.height = winH + "px";

  dialogbox.style.top = "100px";

  dialogoverlay.style.display = "block";
  dialogbox.style.display = "block";

  var dialogboxhead = document.getElementById('dialogboxhead');
  if (typeof title === 'undefined') {
      dialogboxhead.style.display = 'none';
  } else {
      dialogboxhead.style.display = 'block';
      dialogboxhead.style.color = '#FF6347';
      dialogboxhead.innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + title;
  }

  document.getElementById('dialogboxbody').innerHTML = message;

  var yesButton = document.createElement('button');
  yesButton.className = "pure-material-button-contained-yes active me-2";
  yesButton.textContent = "Yes";
  yesButton.onclick = (() => dialogContainer.remove());

  var noButton = document.createElement('button');
  noButton.className = "pure-material-button-contained active";
  noButton.textContent = "No";
  noButton.onclick = () => {
      terminationAlert(
          terminationAlertContent,
          "Plan Mapping",
          () => {},
          () => {}
      );
  };

  document.getElementById('dialogboxfoot').innerHTML = '';
  document.getElementById('dialogboxfoot').appendChild(yesButton);
  document.getElementById('dialogboxfoot').appendChild(noButton);
};

