var active = false;

var sliderInput = document.querySelector('input');
var toggleBtn = document.querySelector('.toggleBtn');
var webLink = document.querySelector('.website');

var cookieVal = { x : '1', dictionary : 'null', enabled : 'no' };


function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

//WEBSITE LINK
webLink.onclick = function(e) {
  console.debug("$$$!");
}

//TOGGLE BUTTON FUNCTION
toggleBtn.onclick = function(e) {
  console.debug("U CLICKED THE BUTTON! :O " + sliderInput.value + " kanas toggled");
}

//SLIDER HANDLER
console.debug("WTF: " + cookieVal);
sliderInput.value = cookieVal;

sliderInput.onchange = function(e) {
  getActiveTab().then((tabs) => {
    var sliderAt = e.target.value;
    browser.tabs.sendMessage(tabs[0].id, {activeCharacters: sliderAt});

    cookieVal.x = sliderAt;
    console.debug("Slider at: " + cookieVal.x);
    browser.cookies.set({
      url: tabs[0].url,
      name: "kana",
      value: JSON.stringify(cookieVal)
    })
  });
}

//UPDATE THE page
function refresh(){
  if(active == false){
    browser.tabs.executeScript({file: "../kanaMap.js"});
    browser.tabs.executeScript({file: "../substitute.js"});
    console.debug("AND COOKIE = " + cookieVal.x);
    active = true;
  }
  else{
    browser.tabs.reload();
    active = false;
  }
}
