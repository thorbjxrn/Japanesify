browser.runtime.onMessage.addListener(updateCharacters);

function updateCharacters(request, sender, sendResponse) {
console.debug("MESSAGE" + request.toString());
  if (request.enabled == true) {
    activate();
  }
  else if (request.enabled == false) {
    window.location.reload(false);
  }
  if(request.n == true){
    console.debug("N = true RECIEVED");
    dictionaryN.set('enabled', true);
  }
  if(request.n == false){
    console.debug("N = false RECIEVED");
    dictionaryN.set('enabled', false);
  }

/*  if (request.nr) {
    console.debug("There is now " + request.nr + "Kanas active");
    //html.style.backgroundColor = request.color;
    //body.style.backgroundColor = request.color;
  } else if (request.enabled) {
    console.debug("Webextention == active, is now " + request.enabled);
  }*/
}
