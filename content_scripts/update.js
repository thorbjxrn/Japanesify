browser.runtime.onMessage.addListener(updateCharacters);

function updateCharacters(request, sender, sendResponse) {

  if (request.enabled == true) {
    kanaMap = getSortedMap(); //Refresh the active characters
    activate(); //do the substitution
  }
  else if (request.enabled == false) {
    window.location.reload(false); //reset
  }
}
