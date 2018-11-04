/* initialise variables */
let appEnabled = false;
let alphabet = "hiregana";
let characters = 1;

var checkboxes = new Map([
  ['n', document.querySelector("input[name='activeSubsN'")],
  ['a', document.querySelector("input[name='activeSubsA'")],
  ['i', document.querySelector("input[name='activeSubsI'")],
  ['u', document.querySelector("input[name='activeSubsU'")],
  ['e', document.querySelector("input[name='activeSubsE'")],
  ['o', document.querySelector("input[name='activeSubsO'")],
  ['da', document.querySelector("input[name='activeSubsDA'")],
  ['ha', document.querySelector("input[name='activeSubsHA'")],
  ['yo', document.querySelector("input[name='activeSubsYO'")]
]);

var toggleButton = document.querySelector('button');
var alsoN = true; //checkboxes.get('n').checked;
console.log("ALSO N : " + alsoN);

/* storage */

let gettingItem = browser.storage.local.get("appStatus");
gettingItem.then(onGot, onError);

console.debug("DEBUGG" + gettingItem);
browser.storage.local.set({
    appStatus:  {enabled:true}
});

function onGot(item) {
  console.log(item);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

// Browser tab communication.

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

// settings

checkboxes.forEach(function(value, key) {
  value.onchange = function(e) {
      console.debug(key);
      if(appEnabled){
        updatePage(false);
      }
  }
});


toggleButton.onclick = function() {
  updatePage(true);
}

// Functions

function updatePage(toggleActive){ // false for update, true for toggle
  console.debug("UPDATE PAGE! Toggle = " + toggleActive.toString());
  getActiveTab().then((tabs) => {
    if(toggleActive){
      appEnabled = toggle(appEnabled);
    }
    browser.tabs.sendMessage(tabs[0].id, {enabled: appEnabled, characters: characters, alphabet: alphabet});

    console.debug("Enabled = " + appEnabled.toString());

  });
}

function toggle(status){
  if(status){
    return false;
  }
  else {
    return true;
  }
}
