browser.runtime.onMessage.addListener(updateCharacters);

function updateCharacters(request, sender, sendResponse) {

  if (request.enabled == true) {
    activate();
  }
  else if (request.enabled == false) {
    window.location.reload(false);
  }
}
