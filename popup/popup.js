
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

function updatePage(){
  getActiveTab().then((tabs) => {
    browser.tabs.sendMessage(
      tabs[0].id, 
      {type: "togglePlugin", japanesify: status, characters}
    );
  });
}
