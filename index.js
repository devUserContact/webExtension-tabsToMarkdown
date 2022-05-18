function listTabs() {
  browser.tabs.query({ currentWindow: true }).then((tabs) => {
    for (const tab of tabs) {
      console.log(tab.title, tab.url);
    }
  });
}

window.onload = function () {
  const btn = document.getElementById("exeButton");
  btn.onclick = listTabs;
};
