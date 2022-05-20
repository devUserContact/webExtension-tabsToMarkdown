function listTabs() {
  let tabsArray = [];
  browser.tabs.query({ currentWindow: true }).then((tabs) => {
    for (const tab of tabs) {
      tabsArray.push({
        key: tab.title,
        value: tab.url,
      });
    }
    let tabsMarkdown = [];
    let counter = 1;
    for (var tabObj of tabsArray) {
      tabsMarkdown.push(
        `
          [${tabObj.key}][${counter++}]
        `
      );
    }
    //  console.table(tabsArray)
    console.table(tabsMarkdown);
    function generateTabsMarkdown(tabsMarkdownFull) {
      var data = new Blob([tabsMarkdownFull], {
        type: "text/plain",
      });
    }
  });
}

window.onload = function () {
  const btn = document.getElementById("exeButton");
  btn.onclick = listTabs;
};
browser.commands.onCommand.addListener(function (command) {
  if (command === "convert-tabs-to-markdown") {
    listTabs();
  }
});
