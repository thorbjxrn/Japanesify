var activate = true;
var cookieVal = { x : '',
                  y : '' };

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}


document.addEventListener("click",
  function(e) {
    if (e.target.classList.contains("toggleBtn")) {
        console.debug("U CLICKED THE BUTTON! :O");
        if(activate == true){
          browser.tabs.executeScript({file: "../substitute.js"});
          activate = false;
        }
        else{
          activate = true;
          browser.tabs.reload();
        }
        /*browser.tabs.sendMessage(tabs[0].id, {});

        cookieVal.x = "data";
          console.debug("COOKIE DATA: " + cookieVal.x);
        browser.cookies.set({
          url: tabs[0].url,
          name: "kana",
          value: JSON.stringify(cookieVal)
        })
    }
    else if (e.target.classList.contains("website")){
        var chosenPage = "http://" + e.target.textContent;
    */}
  }
);
