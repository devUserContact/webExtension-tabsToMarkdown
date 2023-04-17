chrome.commands.onCommand.addListener((command) => {
    if (command === 'convert-tabs-to-markdown') {
        chrome.tabs.query({ currentWindow: true }, (tabs) => {
            tabs.forEach((tab) => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['index.js'],
                });
            });
        });
    }
});

