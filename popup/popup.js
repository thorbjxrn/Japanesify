
const getIsEnabled = () => {
  return JSON.parse(localStorage.getItem('japanesifyIsEnabled')) ? true : false;
}

const setIsEnabled = (isEnabled) => {
  localStorage.japanesifyIsEnabled = JSON.stringify(isEnabled);
}

/* initialise variables */
let alphabet = "hiregana";
let characters = [
  ['n', 0],['a', 0],
  ['i', 1], ['u', 0], 
  ['o', 0], ['e', 0], 
  ['da',0], ['ha',0], 
  ['yo',0]
]; //The order is : n, a, i, u, o, e
let status = getIsEnabled();

//var toggleButton = document.querySelector('button');
var toggleButton = document.getElementById('toggle');

setToggleButtonStatus(status);

function saveOptions(e) {
  e.preventDefault();

  setIsEnabled(status)
  localStorage.array = JSON.stringify(characters.map(
      ([char, _]) => document.querySelector(`#${char}`).checked
  ));

  updatePage();
}

function restoreOptions() {
  status = getIsEnabled();
    if(!localStorage.getItem('array')) {
      saveOptions();
    } else {
      var res = JSON.parse(localStorage.array);
      document.querySelector("#n").checked = res[0];
      document.querySelector("#a").checked = res[1];
      document.querySelector("#i").checked = res[2];
      document.querySelector("#u").checked = res[3];
      document.querySelector("#e").checked = res[4];
      document.querySelector("#o").checked = res[5];
      document.querySelector("#da").checked = res[6];
      document.querySelector("#ha").checked = res[7];
      document.querySelector("#yo").checked = res[8];

      //console.log("action.js ARRAY restored to: " + typeof res[0]);

    }

}


//add event listeners
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("#o").addEventListener('change', saveOptions);
document.querySelector("#n").addEventListener('change', saveOptions);
document.querySelector("#a").addEventListener('change', saveOptions);
document.querySelector("#i").addEventListener('change', saveOptions);
document.querySelector("#u").addEventListener('change', saveOptions);
document.querySelector("#e").addEventListener('change', saveOptions);
document.querySelector("#da").addEventListener('change', saveOptions);
document.querySelector("#ha").addEventListener('change', saveOptions);
document.querySelector("#yo").addEventListener('change', saveOptions);


// Browser tab communication.

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}



toggleButton.onclick = function(){
  status = !status;

  setToggleButtonStatus(status);
  setIsEnabled(status);

  updatePage();
}

function setToggleButtonStatus(boolean){
  if(boolean == false){
    toggleButton.style.backgroundColor = "#d94a3c";
    toggleButton.innerHTML = "disabled";
  }
  else {
    toggleButton.style.backgroundColor = "#4b7340";
    toggleButton.innerHTML = "enabled";
  }
}


// Functions

function updatePage(){

  getActiveTab().then((tabs) => {

    // for (var i = 0; i < characters.length; i++) {
    //   var string = "#" + characters[i][0];
    //   characters[i][1] = document.querySelector(string).checked;
    // }

    //console.debug("Enabled = " + status.toString());
    browser.tabs.sendMessage(
      tabs[0].id, 
      {type: "togglePlugin", enabled: status}
    );

  });
}

// browser.runtime.onMessage.addListener(req => {
//   if(req.type == "Japanesify" && status) {
//     updatePage();
//   }
// });

// // update when the tab is updated
// browser.tabs.onUpdated.addListener(updatePage);

// // update when the tab is activated
// browser.tabs.onActivated.addListener(updatePage);
