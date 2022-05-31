export function listTabs() {
  //get tab data from browser and input into dictionary array
  let tabsArray = [];
  let counter = 0;
  browser.tabs.query({ currentWindow: true }).then((tabs) => {
    for (const tab of tabs) {
      counter++;
      tabsArray.push({
        key: `[${tab.title}][${counter}]`,
        value: `[${counter}]:${tab.url}`,
        id: counter,
      });
    }

    // creating the markdown string
    let tabsMarkdown = [];

    let docTitle = document.getElementById("titleInput").value;
    let currentDate = `${
      new Date().getMonth() + 1
    }-${new Date().getDate()}-${new Date().getFullYear()}`;
    if (docTitle === "") {
      docTitle = `tabsToMarkdown_${currentDate}`;
    }
    tabsMarkdown.push(`# ${docTitle}`);
    for (var tabEntry of tabsArray) {
      if (tabEntry.id === tabsArray.length) {
        tabsMarkdown.push(`${tabEntry.key}`);
      } else {
        tabsMarkdown.push(`${tabEntry.key}\n`);
      }
    }
    tabsMarkdown.push("___");
    for (var tabEntry of tabsArray) {
      tabsMarkdown.push(tabEntry.value);
    }
    let tabsMarkdownComplete = tabsMarkdown.join("\n");

    // creating md file and text blob
    let dlLink = document.createElement("a");
    dlLink.download = `${docTitle}.md`;
    let markdownDoc = new Blob([tabsMarkdownComplete], {
      type: "text/plain",
    });
    dlLink.href = URL.createObjectURL(markdownDoc);
    dlLink.click();
  });
}
function setIcon() {
  if (matchMedia("(prefers-color-scheme: dark)").matches) {
    browserAction.setIcon({ path: "/icons/icon-dark48.png" });
  } else {
    browserAction.setIcon({ path: "/icons/icon48.png" });
  }
}
window.onload = function () {
  const btn = document.getElementById("exeButton");
  btn.onclick = listTabs;
  document.addEventListener("DOMContentLoaded", setIcon);
  setIcon();
};
