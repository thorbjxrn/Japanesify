browser.runtime.onMessage.addListener(updateCharacters);

function updateCharacters(request, sender, sendResponse) {
  var enabledKana = request.characters;

  for (var i = 0; i < enabledKana.length; i++) {
      dictionary[i][0] = enabledKana[i];
      console.log(dictionary[i][0]);
  }
  //console.log(dictionary[0][0]);
  if (request.enabled == true) {
    kanaMap = getSortedMap(); //Refresh the active characters
    activate(); //do the substitution
  }
  else if (request.enabled == false) {
    window.location.reload(false); //reset
  }
}
