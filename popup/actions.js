/* initialise variables */
let alphabet = "hiregana";
let characters = [['n', 0],['a', 0],['i', 1], ['u', 0], ['o', 0], ['e', 0]]; //The order is : n, a, i, u, o, e
let status = false;


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


//var toggleButton = document.querySelector('button');
var toggleButton = document.getElementById('toggle');

/* storage */
checkboxes.forEach(function(value, key){
  value.onchange = function(e){
    console.debug(key + " toggle");
  }
})

function saveOptions(e) {
  browser.storage.sync.set({
    array: [
      document.querySelector("#n").checked,
      document.querySelector("#a").checked,
      document.querySelector("#i").checked,
      document.querySelector("#u").checked,
      document.querySelector("#e").checked,
      document.querySelector("#o").checked,
      document.querySelector("#da").checked,
      document.querySelector("#ha").checked,
      document.querySelector("#yo").checked,
    ],
    enabled: status
  });
console.log("SAVING OPTIONS");

  e.preventDefault();
}

function restoreOptions() {
  var boolean = false;
  var charMap = new Map();
  var gettingItem = browser.storage.sync.get('array');
  gettingItem.then((res) => {
      document.querySelector("#n").checked = res.array[0];
      document.querySelector("#a").checked = res.array[1];
      document.querySelector("#i").checked = res.array[2];
      document.querySelector("#u").checked = res.array[3];
      document.querySelector("#e").checked = res.array[4];
      document.querySelector("#o").checked = res.array[5];
      document.querySelector("#da").checked = res.array[6];
      document.querySelector("#ha").checked = res.array[7];
      document.querySelector("#yo").checked = res.array[8];
      status = res.enabled;
    });
    console.log("action.js STATUS restored to: " + status);

    if(status == false){
      toggleButton.style.backgroundColor = "#d94a3c";
      toggleButton.innerHTML = "disabled";
    }
    else{
      toggleButton.style.backgroundColor = "#4b7340";
      toggleButton.innerHTML = "enabled";
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
  if(status == true){
    status = false;
    toggleButton.style.backgroundColor = "#d94a3c";
    toggleButton.innerHTML = "disabled";
  }
  else {
    status = true;a
    toggleButton.style.backgroundColor = "#4b7340";
    toggleButton.innerHTML = "enabled";
  }
  console.log("SAVING status AS: " + status);
  browser.storage.sync.set({enabled: true});

  updatePage();
}


// Functions

function updatePage(){

  getActiveTab().then((tabs) => {

    for (var i = 0; i < characters.length; i++) {
      var string = "#" + characters[i][0];
      characters[i][1] = document.querySelector(string).checked;
    }

    //console.debug("Enabled = " + status.toString());
    browser.tabs.sendMessage(tabs[0].id, {enabled: status, characters: characters, alphabet: alphabet});



  });
}
