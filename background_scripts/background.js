
  function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
  }

  function update() {
    let charArray = new Array();

    var status = JSON.parse(localStorage.getItem('enabled'));

    if(status == true){
      charArray = JSON.parse(localStorage.getItem('array'));
      var char2Array = [['n', charArray[0]],['a', charArray[1]],['i', charArray[2]],
        ['u', charArray[3]], ['o', charArray[4]], ['e', charArray[5]],
        ['da', charArray[6]], ['ha', charArray[7]], ['yo', charArray[8]]]; //the format used by actions.js. Might revisit this

        getActiveTab().then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {enabled: true, characters: char2Array});
          }
        );
        }
      //updatePage(); //SND MSG

  }

  // update when the tab is updated
  browser.tabs.onUpdated.addListener(update);

  // update when the tab is activated
  browser.tabs.onActivated.addListener(update);
