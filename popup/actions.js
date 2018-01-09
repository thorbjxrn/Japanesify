/* initialise variables */

var sliderInput = document.querySelector('input');
var toggleButton = document.querySelector('button');
var cookieVal = { nr : '1',
                  enabled : 'false'}; //add hiregana/katakana here.

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

  sliderInput.onchange = function(e) {
    getActiveTab().then((tabs) => {
      var sliderAt = e.target.value;
      browser.tabs.sendMessage(tabs[0].id, {nr: sliderAt});

      cookieVal.nr = sliderAt;
      console.debug("Slider at: " + cookieVal.nr);
      browser.cookies.set({
        url: tabs[0].url,
        name: "kanaCookie",
        value: JSON.stringify(cookieVal)
      })
    });
  }

/* reset background */

toggleButton.onclick = function() {
  getActiveTab().then((tabs) => {
    var status;
    if(cookieVal.enabled){
      status = false;
    }
    else{
      status = true;
    }
    browser.tabs.sendMessage(tabs[0].id, {enabled: status});

    cookieVal.enabled = status;
    console.debug("Enabled = " + status);
    browser.cookies.set({
      url: tabs[0].url,
      name: "kanaCookie",
      value: JSON.stringify(cookieVal)
    })

  });
}

/* Report cookie changes to the console */

browser.cookies.onChanged.addListener((changeInfo) => {
  console.log(`Cookie changed:\n
              * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
              * Cause: ${changeInfo.cause}\n
              * Removed: ${changeInfo.removed}`);
});
