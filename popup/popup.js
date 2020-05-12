const getIsEnabled = () => {
  return JSON.parse(localStorage.getItem('japanesifyIsEnabled')) ? true : false;
}

const saveIsEnabled = (isEnabled) => {
  localStorage.japanesifyIsEnabled = JSON.stringify(isEnabled);
}

const getCharacteSelections = () => {
  const chars = JSON.parse(localStorage.getItem('japanesifyCharacteSelections')) 
    || {n: false, a: false, i: true, u: false, o: false, e: false, 
      da: false, ha: false, yo: false}; //default value if not saved to storage. The order is : n, a, i, u, o, e

  return chars;
}

const saveCharacteSelections = (chars) => {
  localStorage.japanesifyCharacteSelections = JSON.stringify(chars); 
}

/* initialise variables */
let alphabet = "hiregana";
let characters = getCharacteSelections(); 
let status = getIsEnabled();

//add event listeners and mark selected checkboxes.
for (const char in characters) {
  document.querySelector(`#${char}`).addEventListener('change', saveOptions);
  document.querySelector(`#${char}`).checked = characters[char];
}

//var toggleButton = document.querySelector('button');
var toggleButton = document.getElementById('toggle');

setToggleButtonStatus(status);

function saveOptions(e) {
  e.preventDefault();

  characters[e.target.id] = e.target.checked;

  saveCharacteSelections(characters);

  updatePage();
}

// Browser tab communication.
function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}



toggleButton.onclick = function(){
  status = !status;

  setToggleButtonStatus(status);
  saveIsEnabled(status);

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
