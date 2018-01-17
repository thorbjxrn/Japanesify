browser.runtime.onMessage.addListener(updateCharacters);

function updateCharacters(request, sender, sendResponse) {

  if (request.enabled == true) {
    activate();
  }
  else if (request.enabled == false) {
    window.location.reload(false);
  }
/*  if (request.nr) {
    console.debug("There is now " + request.nr + "Kanas active");
    //html.style.backgroundColor = request.color;
    //body.style.backgroundColor = request.color;
  } else if (request.enabled) {
    console.debug("Webextention == active, is now " + request.enabled);
  }*/
}
