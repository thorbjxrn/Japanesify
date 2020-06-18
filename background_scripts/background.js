
function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
}

// Send message to content scripts in active tab
updatePage = () => {
    japanesify = getIsEnabled();
    characters = getCharacteSelections();

    getActiveTab().then((tabs) => {
        browser.tabs.sendMessage(
            tabs[0].id, 
            {type: "togglePlugin", japanesify, characters}
        );
    });
}

browser.tabs.onUpdated.addListener(updatePage);
browser.tabs.onActivated.addListener(updatePage);
