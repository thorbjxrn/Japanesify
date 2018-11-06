/* initialise variables */
let appEnabled = false;
let alphabet = "hiregana";
let characters = [1,0,0,0,0,0];
var status = false;

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

// settings
/*
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
checkboxes.forEach(function(value, key){
  value.onchange = function(e){
    console.debug(key + " triggered");
  }
})

function saveOptions(e) {
  browser.storage.sync.set({
    n: document.querySelector("#n").checked,
    a: document.querySelector("#a").checked,
    i: document.querySelector("#i").checked,
    u: document.querySelector("#u").checked,
    e: document.querySelector("#e").checked,
    o: document.querySelector("#o").checked,
    da: document.querySelector("#da").checked,
    ha: document.querySelector("#ha").checked,
    yo: document.querySelector("#yo").checked
  });
  e.preventDefault();
}

function restoreOptions() {
  var boolean = false;
  var charMap = new Map();
    var gettingItem = browser.storage.sync.get('n');
    gettingItem.then((res) => {
    document.querySelector("#n").checked = res.n;
    //charMap.set('n', true);//res.n);
    getActiveTab().then((tabs) => {
      console.debug("SENDING N")
        browser.tabs.sendMessage(tabs[0].id, {n: true});
    });

    var gettingItem1 = browser.storage.sync.get('a');
    gettingItem1.then((res) => {
      document.querySelector("#a").checked = res.a;
    });

  var gettingItem2 = browser.storage.sync.get('i');
  gettingItem2.then((res) => {
  document.querySelector("#i").checked = res.i;
  });

  var gettingItem3 = browser.storage.sync.get('u');
  gettingItem3.then((res) => {
  document.querySelector("#u").checked = res.u;
  });

  var gettingItem4 = browser.storage.sync.get('e');
  gettingItem4.then((res) => {
  document.querySelector("#e").checked = res.e;
  });

  var gettingItem5 = browser.storage.sync.get('o');
  gettingItem5.then((res) => {
  document.querySelector("#o").checked = res.o;
  });

  var gettingItem6 = browser.storage.sync.get('da');
  gettingItem6.then((res) => {
  document.querySelector("#da").checked = res.da;
  });

  var gettingItem7 = browser.storage.sync.get('ha');
  gettingItem7.then((res) => {
  document.querySelector("#ha").checked = res.ha;
  });

  var gettingItem8 = browser.storage.sync.get('yo');
  gettingItem8.then((res) => {
  document.querySelector("#yo").checked = res.yo;
  });





  });
}

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



toggleButton.onclick = function() {
  updatePage(true);
  status = toggle(status);
  //browser.tabs.sendMessage(tabs[0].id, {enabled: status});
}
// restore settings at load
/*
document.addEventListener('DOMContentLoaded', restoreOptions);

function restoreOptions() {
  console.debug("RESTORE OPTIONS ACTIVATED")
  var storageItem = browser.storage.local.get('appStatus');
  storageItem.then((res) => {
    n.checked = true;
  });
}
*/
// Functions

function updatePage(toggleActive){ // false for update, true for toggle
  var data = browser.storage.local.get("appStatus").enabled;
  console.debug("UPDATE PAGE! Toggle = " + toggleActive.toString() + ". Data: " + data);
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
