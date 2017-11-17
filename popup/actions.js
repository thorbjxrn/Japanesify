document.addEventListener("click", function(e) {
  if (e.target.classList.contains("toggleBtn")) {
      browserAction.enable();
    });
  }
  else if (e.target.classList.contains("website")){
    var chosenPage = "http://" + e.target.textContent;
    browser.tabs.create({
      url: chosenPage;

  }



});
