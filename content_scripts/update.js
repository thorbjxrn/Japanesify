browser.runtime.onMessage.addListener(updateBg);

function updateBg(request, sender, sendResponse) {
  var html = document.querySelector('html');
  var body = document.querySelector('body');

  if (request.nr) {
    console.debug("There is now " + request.nr + "Kanas active");
    //html.style.backgroundColor = request.color;
    //body.style.backgroundColor = request.color;
  } else if (request.enabled) {
    console.debug("Webextention == active, is now " + request.enabled);
  }
}
