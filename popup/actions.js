var activate = true;

var sliderInput = document.querySelector('input');
var cookieVal = { x : '', y : '' };

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
    browser.tabs.sendMessage(tabs[0].id, {activeCharacters: sliderAt});

    cookieVal.x = sliderAt;
    browser.cookies.set({
      url: tabs[0].url,
      name: "kana",
      value: JSON.stringify(cookieVal)
    })
  });
}

//UPDATE THE page
function refresh(){
  if(activate == true){
    browser.tabs.executeScript({file: "../substitute.js"});
    activate = false;
  }
  else{
    browser.tabs.reload();
    activate = true;
  }
}
