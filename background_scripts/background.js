/* Retrieve any previously set cookie and send to content script */

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}
/*
function configUpdate() {
  getActiveTab().then((tabs) => {

    var gettingItem = browser.storage.local.get("appStatus");
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


    // get any previously set cookie for the current tab
    var gettingCookies = browser.cookies.get({
      url: tabs[0].url,
      name: "kanaCookie"
    });
    gettingCookies.then((cookie) => {
      if (cookie) {
        var cookieVal = JSON.parse(cookie.value);
        browser.tabs.sendMessage(tabs[0].id, {color: cookieVal.nr});
        browser.tabs.sendMessage(tabs[0].id, {color: cookieVal.enabled});
        console.debug("Cookie exist. Nr = " + cookieVal.nr + ", and enabled = " + cookieVal.enabled);
      }
    });
  });
}

// update when the tab is updated
//browser.tabs.onUpdated.addListener(cookieUpdate);
// update when the tab is activated
browser.tabs.onActivated.addListener(cookieUpdate);
*/
