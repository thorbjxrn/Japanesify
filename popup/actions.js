var active = false;

var sliderInput = document.querySelector('input');
var cookieVal = { x : '1', dictionary : 'null', enabled : 'no' };


function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}


document.addEventListener("click",
  function(e) {
    if (e.target.classList.contains("toggleBtn")) {
        console.debug("U CLICKED THE BUTTON! :O " + sliderInput);
        refresh();
  }
  else if (e.target.classList.contains("website")){
    var chosenPage = "http://" + e.target.textContent;
  }
}
);
//SLIDER HANDLER
sliderInput.onchange = function(e) {
  getActiveTab().then((tabs) => {
    var sliderAt = e.target.value;
    //browser.tabs.sendMessage(tabs[0].id, {activeCharacters: sliderAt});

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
