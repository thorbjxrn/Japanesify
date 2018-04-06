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

/* storage */

function restoreOptions() {
  var storageItem = browser.storage.managed.get('appStatus');
  storageItem.then((res) => {
    n.checked = res.enabled;
  });

  var gettingItem = browser.storage.sync.get('appStatus');
  gettingItem.then((res) => {
    document.querySelector("#colour").value = res.colour || 'Firefox red';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);

// Browser tab communication.

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}



toggleButton.onclick = function() {
  updatePage(true);
}
// restore settings at load
document.addEventListener('DOMContentLoaded', restoreOptions);

function restoreOptions() {
  console.debug("RESTORE OPTIONS ACTIVATED")
  var storageItem = browser.storage.managed.get('appStatus');
  storageItem.then((res) => {
    n.checked = true;
  });
}

// Functions

function updatePage(toggleActive){ // false for update, true for toggle
  var data = browser.storage.local.get("appStatus").enabled;
  console.debug("UPDATE PAGE! Toggle = " + toggleActive.toString() + ". Data: " + data);
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
