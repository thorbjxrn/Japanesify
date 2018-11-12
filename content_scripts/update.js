var docBod = document.body.cloneNode(true);
//docBod = document.body;
docBod.id = "oldDoc";

let enabledKana, enabled;

browser.runtime.onMessage.addListener(setData);

function setData(request, sender, sendResponse){
  enabledKana = request.characters;
  enabled = request.enabled;

  for (var i = 0; i < enabledKana.length; i++) {
      dictionary[i][0] = enabledKana[i][1];
      //console.log(dictionary[0][0]);
  }

  updatePage();
}



function updatePage (){
  document.body = docBod.cloneNode(true);

    if (enabled == true) {
      kanaMap = getSortedMap(); //Refresh the active characters
      activate(); //do the substitution
    }
}
