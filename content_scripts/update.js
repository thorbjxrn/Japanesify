
let enabledKana, enabled;

browser.runtime.onMessage.addListener(setData);

function setData(request, sender, sendResponse){
  enabledKana = request.characters;
  enabled = request.enabled;

  console.log("A man in the update.js department told me to tell you: " + enabled);
  for (var i = 0; i < enabledKana.length; i++) {
      dictionary[i][0] = enabledKana[i][1];
      console.log(dictionary[i][0]);
  //console.log(dictionary[0][0]);
  }
  updatePage();
}



function updatePage (){
    if (enabled == true) {
      kanaMap = getSortedMap(); //Refresh the active characters
      activate(); //do the substitution
    }
    else {
      window.location.reload(false); //reset
    }
}
