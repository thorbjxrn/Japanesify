/* initialise variables */
let appEnabled = false;

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

/* storage */
/*
let gettingItem = browser.storage.local.get("appStatus");
gettingItem.then(onGot, onError);

console.debug("DEBUGG" + gettingItem);
browser.storage.local.set({
    appStatus:  {enabled:true}
});
*/
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
      browser.storage.local.set({
        key:  {enabled:true}
      });
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
    browser.tabs.sendMessage(tabs[0].id, {enabled: appEnabled});

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

/* Report cookie changes to the console */
/* disabled as it seems to work good.
browser.cookies.onChanged.addListener((changeInfo) => {
  console.log(`Cookie changed:\n
              * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
              * Cause: ${changeInfo.cause}\n
              * Removed: ${changeInfo.removed}`);
});
*/
