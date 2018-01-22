/* initialise variables */

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
var cookieVal = { nr : '1',
                  enabled : 'true'}; //add hiregana/katakana here.

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

checkboxes.forEach(function(value, key) {
  value.onchange = function(e) {
      console.debug("A");
  }
});

/* reset background */

toggleButton.onclick = function() {
  getActiveTab().then((tabs) => {
    var status = true;

    browser.tabs.sendMessage(tabs[0].id, {enabled: status});

    console.debug("Enabled = " + status);

  });
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
