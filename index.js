function listTabs() {
  let tabsArray = [];
  browser.tabs.query({ currentWindow: true }).then((tabs) => {
    for (const tab of tabs) {
      tabsArray.push({
        key: tab.title,
        value: tab.url
      });
    }
    console.table(tabsArray);
    //for (const counter of tabsArrayTitle.length){
    //}
    //    var data = new Blob([tabs.url], {
    //      type: "text/plain",
    //    });
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
