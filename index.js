function listTabs() {
  let tabsArray = [];
  let counter = 0;
  browser.tabs.query({ currentWindow: true }).then((tabs) => {
    for (const tab of tabs) {
      counter++
      tabsArray.push({
        key: `[${tab.title}][${counter}]`,
        value: `[${counter}]:[${tab.url}]`,
        id: counter,
      });
    }
    let tabsMarkdown = [];
    console.table(tabsArray);
    //console.table(tabsMarkdown);
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
